const { Riffy, Player } = require("riffy");
const { ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, SectionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, PermissionsBitField, MessageFlags, MediaGalleryBuilder, MediaGalleryItemBuilder } = require("discord.js");
const { requesters } = require("./commands/music/play");
const { EnhancedMusicCard } = require("./utils/musicCard");
const config = require("./config.js");
const musicIcons = require('./UI/icons/musicicons.js');
const colors = require('./UI/colors/colors');
const fs = require("fs").promises;
const path = require("path");
const axios = require('axios');
const { autoplayCollection, playlistCollection } = require('./mongodb.js');
const { initializeLavalinkManager, getLavalinkManager } = require('./lavalink.js');

let getLangSync, getLang;
try {
    const langLoader = require('./utils/languageLoader.js');
    getLangSync = langLoader.getLangSync;
    getLang = langLoader.getLang;
} catch (e) {
    getLangSync = () => ({ console: {} });
    getLang = async () => ({ player: {} });
}
const guildTrackMessages = new Map();
const nowPlayingMessages = new Map();
const progressUpdateIntervals = new Map();
const musicCard = new EnhancedMusicCard();

async function sendMessageWithPermissionsCheck(channel, components, attachment, actionRow1, actionRow2) {
    try {
        const permissions = channel.permissionsFor(channel.guild.members.me);
        if (!permissions.has(PermissionsBitField.Flags.SendMessages) ||
            !permissions.has(PermissionsBitField.Flags.EmbedLinks) ||
            !permissions.has(PermissionsBitField.Flags.AttachFiles) ||
            !permissions.has(PermissionsBitField.Flags.UseExternalEmojis)) {
            const lang = getLangSync();
            console.error(lang.console?.player?.lacksPermissions || "Bot lacks necessary permissions to send messages in this channel.");
            return;
        }

        const messageOptions = {
            components: [...components, actionRow1, actionRow2],
            flags: MessageFlags.IsComponentsV2
        };
        
        if (attachment) {
            messageOptions.files = [attachment];
        }
        
        const message = await channel.send(messageOptions);
        return message;
    } catch (error) {
        const langSync = getLangSync();
        console.error(langSync.console?.player?.errorSendingMessage?.replace('{message}', error.message) || "Error sending message:", error.message);
        const lang = await getLang(channel.guildId).catch(() => ({ console: { player: {} } }));
        const t = lang.console?.player || {};
        const errorContainer = new ContainerBuilder()
            .setAccentColor(0xff0000)
            .addTextDisplayComponents(
                (textDisplay) => textDisplay.setContent(
                    `${t.unableToSendMessage?.title || '## ⚠️ Unable to Send Message'}\n\n` +
                    `${t.unableToSendMessage?.message || 'Unable to send message. Check bot permissions.'}`
                )
            );
        await channel.send({ 
            components: [errorContainer],
            flags: MessageFlags.IsComponentsV2
        }).catch(() => {});
    }
}

async function initializePlayer(client) {
    const nodeManager = await initializeLavalinkManager(client);
    client.riffy = nodeManager.riffy;
    client.lavalinkManager = nodeManager;
    client.nodeManager = nodeManager;

    client.riffy.on("trackException", async (player, error) => {
        const langSync = getLangSync();
        const errorMsg = error?.message || 'Unknown error';
        const isTimeout = errorMsg.includes('timeout') || errorMsg.includes('Read timed out') || errorMsg.includes('SocketTimeoutException');
        
        // Log timeout errors as warnings (they're common on slow connections)
        if (isTimeout) {
            console.warn(`${colors.cyan}[ LAVALINK ]${colors.reset} ${colors.yellow}Track timeout for guild ${player?.guildId || 'unknown'}: ${errorMsg}${colors.reset}`);
        } else {
            console.error(`${colors.cyan}[ LAVALINK ]${colors.reset} ${colors.red}${langSync.console?.player?.trackException?.replace('{guildId}', player?.guildId || 'unknown').replace('{message}', errorMsg) || `Track Exception for guild ${player?.guildId || 'unknown'}: ${errorMsg}`}${colors.reset}`);
        }
        
        const channel = client.channels.cache.get(player?.textChannel);
        if (channel) {
            const lang = await getLang(player.guildId).catch(() => ({ console: { player: {} } }));
            const t = lang.console?.player || {};
            
            // More specific error message for timeouts
            let errorMessage = t.trackError?.message || 'Failed to load the track.';
            if (isTimeout) {
                errorMessage = t.trackError?.timeoutMessage || 'Connection timeout while loading track. This is usually a network issue on the Lavalink server.';
            }
            
            const errorContainer = new ContainerBuilder()
                .setAccentColor(0xff0000)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `${t.trackError?.title || '## ⚠️ Track Error'}\n\n` +
                        `${errorMessage}\n` +
                        `${t.trackError?.skipping || 'Skipping to next song...'}`
                    )
                );
            channel.send({ 
                components: [errorContainer],
                flags: MessageFlags.IsComponentsV2
            }).catch(() => {}).then(msg => {
                if (msg) setTimeout(() => msg.delete().catch(() => {}), 5000);
            });
        }
        if (player && !player.destroyed) {
            try {
                player.stop();
            } catch (stopError) {
                // Ignore errors when stopping
            }
        }
    });

    client.riffy.on("trackStuck", (player, error) => {
        const lang = getLangSync();
        const errorMsg = error?.message || 'Unknown error';
        
        // Don't log connection timeout errors as critical (they're handled elsewhere)
        if (errorMsg.includes('Connect Timeout') || errorMsg.includes('fetch failed') || errorMsg.includes('timeout')) {
            console.warn(`${colors.cyan}[ LAVALINK ]${colors.reset} ${colors.yellow}Track stuck due to connection timeout for guild ${player?.guildId || 'unknown'} - will retry${colors.reset}`);
        } else {
            console.error(`${colors.cyan}[ LAVALINK ]${colors.reset} ${colors.red}${lang.console?.player?.trackStuck?.replace('{guildId}', player?.guildId || 'unknown').replace('{message}', errorMsg) || `Track Stuck for guild ${player?.guildId || 'unknown'}: ${errorMsg}`}${colors.reset}`);
        }
        
        // Only stop if player is valid and not destroyed
        if (player && !player.destroyed) {
            try {
                player.stop();
            } catch (stopError) {
                // Ignore errors when stopping stuck track
            }
        }
    });

    client.riffy.on("trackStart", async (player, track) => {
        if (!track || !track.info) {
            const lang = getLangSync();
            console.error(`[ LAVALINK ] ${lang.console?.player?.trackNull?.replace('{guildId}', player.guildId) || `Track is null or missing info for guild ${player.guildId} - ignoring event`}`);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 200));

        const currentPlayer = client.riffy.players.get(player.guildId);
        if (!currentPlayer || currentPlayer !== player || player.destroyed) {
            const lang = getLangSync();
            console.error(`[ LAVALINK ] ${lang.console?.player?.playerInvalid?.replace('{guildId}', player.guildId) || `Player invalid or destroyed for guild ${player.guildId} - ignoring event`}`);
            return;
        }

        if (client.statusManager && track.info.title) {
            await client.statusManager.onTrackStart(player.guildId).catch(() => {});
        }

        const channel = client.channels.cache.get(player.textChannel);
        if (!channel) {
            const lang = getLangSync();
            console.error(`[ LAVALINK ] ${lang.console?.player?.channelNotFound?.replace('{guildId}', player.guildId) || `Channel not found for guild ${player.guildId}`}`);
            return;
        }

        const guildId = player.guildId;
        const trackUri = track.info.uri;
        const requester = requesters.get(trackUri);
        const lang = await getLang(guildId).catch(() => {
            const langSync = getLangSync();
            console.error(`[ PLAYER ] Failed to load language for guild ${guildId}, using default: ${langSync.console ? 'loaded' : 'failed'}`);
            return langSync;
        });
        const t = lang.console?.player || {};
        
        if (!t.trackInfo && !t.controls) {
            const langSync = getLangSync();
            console.warn(`[ PLAYER ] Language object missing player keys for guild ${guildId}. Using sync fallback.`);
            if (langSync.console?.player) {
                Object.assign(t, langSync.console.player);
            }
        }

        try {
            await playlistCollection.updateOne(
                { guildId, name: '__HISTORY__' },
                { 
                    $push: { 
                        songs: { 
                            $each: [trackUri], 
                            $slice: -100 
                        } 
                    } 
                },
                { upsert: true }
            );
        } catch (error) {
            const lang = getLangSync();
            console.error(lang.console?.player?.errorSavingHistory || "Error saving to history:", error);
        }

        try {
            await cleanupPreviousTrackMessages(channel, guildId);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const embedColor = parseInt('#FF7A00'.replace('#', ''), 16);
            const components = [];
            let attachment = null;

            if (config.generateSongCard !== false) {
                // Extract YouTube ID from track URI for better thumbnail fetching
                let thumbnailURL = track.info.thumbnail || '';
                const trackUri = track.info.uri || '';
                
                // If thumbnail is missing or invalid, try to extract from URI
                if ((!thumbnailURL || !thumbnailURL.startsWith('http')) && trackUri) {
                    // Pass the URI so we can extract YouTube ID from it
                    thumbnailURL = trackUri;
                }
                
                const cardBuffer = await musicCard.generateCard({
                    thumbnailURL: thumbnailURL,
                    trackURI: trackUri, // Pass URI separately for YouTube ID extraction
                    songTitle: track.info.title,
                    songArtist: track.info.author || 'Unknown Artist',
                    trackRequester: requester,
                    isPlaying: true,
                    showVisualizer: config.showVisualizer !== false,
                });

                const cardPath = path.join(__dirname, 'musicard.png');
                await fs.writeFile(cardPath, cardBuffer);

                attachment = new AttachmentBuilder(cardBuffer, { name: 'song-banner.png' });
            }

            const headerSection = new SectionBuilder()
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `${t.trackInfo?.title || '**Title:**'} [${track.info.title}](${track.info.uri})\n` +
                        `${t.trackInfo?.author || '**Author:**'} ${track.info.author || (t.trackInfo?.unknownArtist || 'Unknown Artist')}\n` +
                        `${t.trackInfo?.length || '**Length:**'} ${formatDuration(track.info.length)}\n` +
                        `${t.trackInfo?.requester || '**Requester:**'} ${requester || (t.trackInfo?.unknown || 'Unknown')}\n` +
                        `${t.trackInfo?.source || '**Source:**'} ${track.info.sourceName}` +
                        (config.showProgressBar !== false ? `\n${t.trackInfo?.progress || '**Progress:**'} ${createProgressBar(0, track.info.length)}` : '')
                    )
                )
                .setThumbnailAccessory(
                    (thumbnail) => thumbnail.setURL(musicIcons.playerIcon)
                );
            components.push(new ContainerBuilder()
                .setAccentColor(embedColor)
                .addSectionComponents(headerSection));
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

            const controlsContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `🔁 \`Loop\` • ❌ \`Disable\` • ⏭️ \`Skip\` • 📜 \`Queue\` • 🗑️ \`Clear\`\n` +
                        `⏹️ \`Stop\` • ⏸️ \`Pause\` • ▶️ \`Resume\` • 🔊 \`Vol +\` • 🔉 \`Vol -\``
                    )
                );
            components.push(controlsContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

            if (config.generateSongCard !== false) {
                const mediaGallery = new MediaGalleryBuilder()
                    .addItems(
                        (mediaItem) => mediaItem
                            .setURL('attachment://song-banner.png')
                            .setDescription(`${track.info?.title || 'Unknown Title'} - ${track.info?.author || 'Unknown Artist'}`)
                    );
                components.push(mediaGallery);
            } else if (track.info?.thumbnail && typeof track.info.thumbnail === 'string' && track.info.thumbnail.trim() !== '' && track.info.thumbnail.startsWith('http')) {
                try {
                    const description = `${track.info?.title || 'Unknown Title'} - ${track.info?.author || 'Unknown Artist'}`;
                    const mediaGallery = new MediaGalleryBuilder()
                        .addItems(
                            (mediaItem) => mediaItem
                                .setURL(track.info.thumbnail)
                                .setDescription(description)
                        );
                    components.push(mediaGallery);
                } catch (error) {
                    const langSync = getLangSync();
                    console.warn(langSync.console?.player?.errorMediaGallery || `Failed to create media gallery: ${error.message}`);
                }
            }

            const actionRow1 = createActionRow1(false);
            const actionRow2 = createActionRow2(false);

            const message = await sendMessageWithPermissionsCheck(channel, components, attachment, actionRow1, actionRow2);
            
            if (!message) {
                const langSync = getLangSync();
                console.error(langSync.console?.player?.errorSendingEmbed?.replace('{guildId}', guildId) || `Failed to send embed for track ${track.info.title} in guild ${guildId}`);
                return;
            }
            
            if (!guildTrackMessages.has(guildId)) {
                guildTrackMessages.set(guildId, []);
            }
            guildTrackMessages.get(guildId).push({
                messageId: message.id,
                channelId: channel.id,
                type: 'track'
            });

            nowPlayingMessages.set(guildId, {
                messageId: message.id,
                channelId: channel.id,
                player: player
            });

            const intervalId = startProgressUpdates(client, guildId, message, player, track);
            progressUpdateIntervals.set(guildId, intervalId);

            const collector = setupCollector(client, player, channel, message);

        } catch (error) {
            const langSync = getLangSync();
            console.error(langSync.console?.player?.errorMusicCard?.replace('{message}', error.message) || "Error creating or sending music card:", error.message);
            const lang = await getLang(guildId).catch(() => ({ console: { player: {} } }));
            const t = lang.console?.player || {};
            const errorContainer = new ContainerBuilder()
                .setAccentColor(0xff0000)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `${t.unableToLoadCard?.title || '## ⚠️ Unable to Load Track Card'}\n\n` +
                        `${t.unableToLoadCard?.message || 'Unable to load track card. Continuing playback...'}`
                    )
                );
            await channel.send({ 
                components: [errorContainer],
                flags: MessageFlags.IsComponentsV2
            }).catch(() => {});
        }
    });

    client.riffy.on("trackEnd", async (player) => {
        const guildId = player.guildId;
        
        if (client.statusManager) {
            await client.statusManager.onTrackEnd(guildId).catch(() => {});
        }
        
        const intervalId = progressUpdateIntervals.get(guildId);
        if (intervalId) {
            clearInterval(intervalId);
            progressUpdateIntervals.delete(guildId);
        }
        nowPlayingMessages.delete(guildId);
        
        const channel = client.channels.cache.get(player.textChannel);
        if (channel) {
            const settings = await autoplayCollection.findOne({ guildId }).catch(() => null);
            const hasNextTrack = player.queue.length > 0 || player.loop === "queue" || player.loop === "track" || settings?.autoplay;
            
            if (!hasNextTrack) {
                await cleanupTrackMessages(client, player);
            } else {
                await cleanupPreviousTrackMessages(channel, guildId);
            }
        }
    });

    client.riffy.on("playerDisconnect", async (player) => {
        const guildId = player.guildId;
        
        if (client.statusManager) {
            await client.statusManager.onPlayerDisconnect(guildId).catch(() => {});
        }
        
        const intervalId = progressUpdateIntervals.get(guildId);
        if (intervalId) {
            clearInterval(intervalId);
            progressUpdateIntervals.delete(guildId);
        }
        nowPlayingMessages.delete(guildId);
        await cleanupTrackMessages(client, player);
    });

    client.riffy.on("queueEnd", async (player) => {
        const channel = client.channels.cache.get(player.textChannel);
        const guildId = player.guildId;
    
        try {
            const settings = await autoplayCollection.findOne({ guildId });
            const is24_7 = settings?.twentyfourseven;
    
            if (settings?.autoplay) {
                await cleanupPreviousTrackMessages(channel, guildId);
                
                const nextTrack = await player.autoplay(player);

                if (!nextTrack) {
                    await cleanupTrackMessages(client, player);
                    nowPlayingMessages.delete(guildId);
                    const lang = await getLang(guildId).catch(() => ({ console: { player: {} } }));
                    const t = lang.console?.player || {};
                    if (!is24_7) {
                        player.destroy();
                        const msg = await channel.send(t.queueEnd?.noMoreAutoplay || "⚠️ **No more tracks to autoplay. Disconnecting...**");
                        setTimeout(() => msg.delete().catch(() => {}), 5000);
                    } else {
                        const msg = await channel.send(t.queueEnd?.twentyfoursevenEmpty || "🔄 **24/7 Mode: Bot will stay in voice channel. Queue is empty.**");
                        setTimeout(() => msg.delete().catch(() => {}), 5000);
                    }
                }
            } else {
                await cleanupTrackMessages(client, player);
                nowPlayingMessages.delete(guildId);
                const lang = await getLang(guildId).catch(() => ({ player: {}, console: {} }));
                const t = lang.console?.player || {};
                const langSync = getLangSync();
                console.log(langSync.console?.player?.autoplayDisabled?.replace('{guildId}', guildId) || `Autoplay is disabled for guild: ${guildId}`);
                if (!is24_7) {
                    player.destroy();
                    const msg = await channel.send(t.queueEnd?.queueEndedAutoplayDisabled || "🎶 **Queue has ended. Autoplay is disabled.**");
                    setTimeout(() => msg.delete().catch(() => {}), 5000);
                } else {
                    const msg = await channel.send(t.queueEnd?.twentyfoursevenEmpty || "🔄 **24/7 Mode: Bot will stay in voice channel. Queue is empty.**");
                    setTimeout(() => msg.delete().catch(() => {}), 5000);
                }
            }
        } catch (error) {
            const langSync = getLangSync();
            console.error(langSync.console?.player?.errorQueueEnd || "Error handling queue end:", error);
            await cleanupTrackMessages(client, player);
            nowPlayingMessages.delete(guildId);
            const settings = await autoplayCollection.findOne({ guildId });
            const lang = await getLang(guildId).catch(() => ({ console: { player: {} } }));
            const t = lang.console?.player || {};
            if (!settings?.twentyfourseven) {
                player.destroy();
                const msg = await channel.send(t.queueEnd?.queueEmpty || "👾 **Queue Empty! Disconnecting...**");
                setTimeout(() => msg.delete().catch(() => {}), 5000);
            }
        }
    });
}

async function cleanupPreviousTrackMessages(channel, guildId) {
    const messages = guildTrackMessages.get(guildId) || [];
    
    for (const messageInfo of messages) {
        try {
            const fetchChannel = channel.client.channels.cache.get(messageInfo.channelId);
            if (fetchChannel) {
                const message = await fetchChannel.messages.fetch(messageInfo.messageId).catch(() => null);
                if (message) {
                    await message.delete().catch(() => {});
                }
            }
        } catch (error) {
            const lang = getLangSync();
            console.error(lang.console?.player?.errorCleanupPrevious || "Error cleaning up previous track message:", error);
        }
    }

    guildTrackMessages.set(guildId, []);
}

async function cleanupTrackMessages(client, player) {
    const guildId = player.guildId;
    
    const intervalId = progressUpdateIntervals.get(guildId);
    if (intervalId) {
        clearInterval(intervalId);
        progressUpdateIntervals.delete(guildId);
    }
    
    const messages = guildTrackMessages.get(guildId) || [];
    
    for (const messageInfo of messages) {
        try {
            const channel = client.channels.cache.get(messageInfo.channelId);
            if (channel) {
                const message = await channel.messages.fetch(messageInfo.messageId).catch(() => null);
                if (message) {
                    await message.delete().catch(() => {});
                }
            }
        } catch (error) {
            const lang = getLangSync();
            console.error(lang.console?.player?.errorCleanupTrack || "Error cleaning up track message:", error);
        }
    }

    guildTrackMessages.set(guildId, []);
    nowPlayingMessages.delete(guildId);
}
function formatDuration(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return [
        hours > 0 ? `${hours}h` : null,
        minutes > 0 ? `${minutes}m` : null,
        `${seconds}s`,
    ]
        .filter(Boolean)
        .join(' ');
}
function setupCollector(client, player, channel, message) {
    const filter = i => [
        'loopToggle', 'skipTrack', 'disableLoop', 'showLyrics', 'clearQueue',
        'stopTrack', 'pauseTrack', 'resumeTrack', 'volumeUp', 'volumeDown'
    ].includes(i.customId);

    const collector = message.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async i => {
        await i.deferUpdate();

        const member = i.member;
        const voiceChannel = member.voice.channel;
        const playerChannel = player.voiceChannel;

        if (!voiceChannel || voiceChannel.id !== playerChannel) {
            const lang = await getLang(channel.guildId).catch(() => ({ console: { player: {} } }));
            const t = lang.console?.player || {};
            const vcContainer = new ContainerBuilder()
                .setAccentColor(parseInt(config.embedColor?.replace('#', '') || '1db954', 16))
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `${t.voiceChannelRequired?.title || '## 🔒 Voice Channel Required'}\n\n` +
                        `${t.voiceChannelRequired?.message || 'You need to be in the same voice channel to use the controls!'}`
                    )
                );
            const sentMessage = await channel.send({ 
                components: [vcContainer],
                flags: MessageFlags.IsComponentsV2
            });
            setTimeout(() => sentMessage.delete().catch(console.error), config.embedTimeout * 1000);
            return;
        }

        handleInteraction(client, i, player, channel);
    });

    collector.on('end', () => {
    });

    return collector;
}

async function handleInteraction(client, i, player, channel) {
    const lang = await getLang(channel.guildId).catch(() => ({ console: { player: {} } }));
    const t = lang.console?.player || {};
    
    switch (i.customId) {
        case 'loopToggle':
            toggleLoop(player, channel, t);
            break;
        case 'skipTrack':
            const guildId = player.guildId;
            const intervalId = progressUpdateIntervals.get(guildId);
            if (intervalId) {
                clearInterval(intervalId);
                progressUpdateIntervals.delete(guildId);
            }
            await cleanupTrackMessages(client, player);
            nowPlayingMessages.delete(guildId);
            player.stop();
            await sendEmbed(channel, t.controls?.skip || "⏭️ **Skipping to next song...**");
            break;
        case 'disableLoop':
            disableLoop(player, channel, t);
            break;
        case 'showLyrics':
            showLyrics(channel, player);
            break;
        case 'clearQueue':
            player.queue.clear();
            await sendEmbed(channel, t.controls?.queueCleared || "🗑️ **Queue has been cleared!**");
            break;
        case 'stopTrack':
            const stopGuildId = player.guildId;
            await cleanupTrackMessages(client, player);
            nowPlayingMessages.delete(stopGuildId);
            player.stop();
            player.destroy();
            await sendEmbed(channel, t.controls?.playbackStopped || '⏹️ **Playback has been stopped and player destroyed!**');
            break;
        case 'pauseTrack':
            try {
                if (!player || player.destroyed) {
                    await sendEmbed(channel, t.controls?.playerDestroyed || '❌ **Player is not available!**');
                    return;
                }
                if (player.paused) {
                    await sendEmbed(channel, t.controls?.alreadyPaused || '⏸️ **Playback is already paused!**');
                } else {
                    player.pause(true);
                    await sendEmbed(channel, t.controls?.playbackPaused || '⏸️ **Playback has been paused!**');
                }
            } catch (error) {
                const langSync = getLangSync();
                console.warn(`${colors.cyan}[ PLAYER ]${colors.reset} ${colors.yellow}Pause error: ${error.message}${colors.reset}`);
                await sendEmbed(channel, t.controls?.pauseError || '⚠️ **Failed to pause. Please try again.**');
            }
            break;
        case 'resumeTrack':
            try {
                if (!player || player.destroyed) {
                    await sendEmbed(channel, t.controls?.playerDestroyed || '❌ **Player is not available!**');
                    return;
                }
                if (!player.paused) {
                    await sendEmbed(channel, t.controls?.alreadyResumed || '▶️ **Playback is already resumed!**');
                } else {
                    player.pause(false);
                    await sendEmbed(channel, t.controls?.playbackResumed || '▶️ **Playback has been resumed!**');
                }
            } catch (error) {
                const langSync = getLangSync();
                console.warn(`${colors.cyan}[ PLAYER ]${colors.reset} ${colors.yellow}Resume error: ${error.message}${colors.reset}`);
                await sendEmbed(channel, t.controls?.resumeError || '⚠️ **Failed to resume. Please try again.**');
            }
            break;
        case 'volumeUp':
            adjustVolume(player, channel, 10, t);
            break;
        case 'volumeDown':
            adjustVolume(player, channel, -10, t);
            break;
    }
}

async function sendEmbed(channel, message) {
    const container = new ContainerBuilder()
        .setAccentColor(parseInt(config.embedColor?.replace('#', '') || '1db954', 16))
        .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(message)
        );
    const sentMessage = await channel.send({ 
        components: [container],
        flags: MessageFlags.IsComponentsV2
    });
    setTimeout(() => sentMessage.delete().catch(console.error), config.embedTimeout * 1000);
}

async function adjustVolume(player, channel, amount, t = {}) {
    const newVolume = Math.min(100, Math.max(10, player.volume + amount));
    if (newVolume === player.volume) {
        await sendEmbed(channel, amount > 0 ? (t.controls?.volumeMax || '🔊 **Volume is already at maximum!**') : (t.controls?.volumeMin || '🔉 **Volume is already at minimum!**'));
    } else {
        player.setVolume(newVolume);
        await sendEmbed(channel, (t.controls?.volumeChanged || '🔊 **Volume changed to {volume}%!**').replace('{volume}', newVolume));
    }
}


async function toggleLoop(player, channel, t = {}) {
    player.setLoop(player.loop === "track" ? "queue" : "track");
    await sendEmbed(channel, player.loop === "track" ? (t.controls?.trackLoopActivated || "🔁 **Track loop is activated!**") : (t.controls?.queueLoopActivated || "🔁 **Queue loop is activated!**"));
}

async function disableLoop(player, channel, t = {}) {
    player.setLoop("none");
    await sendEmbed(channel, t.controls?.loopDisabled || "❌ **Loop is disabled!**");
}



async function getLyrics(trackName, artistName, duration) {
    try {
        trackName = trackName
            .replace(/\b(Official|Audio|Video|Lyrics|Theme|Soundtrack|Music|Full Version|HD|4K|Visualizer|Radio Edit|Live|Remix|Mix|Extended|Cover|Parody|Performance|Version|Unplugged|Reupload)\b/gi, "") 
            .replace(/\s*[-_/|]\s*/g, " ") 
            .replace(/\s+/g, " ") 
            .trim();

        artistName = artistName
            .replace(/\b(Topic|VEVO|Records|Label|Productions|Entertainment|Ltd|Inc|Band|DJ|Composer|Performer)\b/gi, "")
            .replace(/ x /gi, " & ") 
            .replace(/\s+/g, " ") 
            .trim();

        if (!trackName || !artistName) {
            return null;
        }

        let response = await axios.get(`https://lrclib.net/api/get`, {
            params: { track_name: trackName, artist_name: artistName, duration },
            timeout: 5000
        });

        if (response.data && (response.data.syncedLyrics || response.data.plainLyrics)) {
            return response.data.syncedLyrics || response.data.plainLyrics;
        }

        response = await axios.get(`https://lrclib.net/api/get`, {
            params: { track_name: trackName, artist_name: artistName },
            timeout: 5000
        });

        if (response.data && (response.data.syncedLyrics || response.data.plainLyrics)) {
            return response.data.syncedLyrics || response.data.plainLyrics;
        }

        return null;
    } catch (error) {
        console.error("Lyrics fetch error:", error.response?.data?.message || error.message);
        return null;
    }
}



async function showLyrics(channel, player) {
            const lang = await getLang(player.guildId).catch(() => ({ console: { player: {} } }));
            const t = lang.console?.player || {};
    
    if (!player || !player.current || !player.current.info) {
        await sendEmbed(channel, t.lyrics?.noSongPlaying || "🚫 **No song is currently playing.**");
        return;
    }

    const track = player.current.info;
    const lyrics = await getLyrics(track.title, track.author, Math.floor(track.length / 1000));

    if (!lyrics) {
        await sendEmbed(channel, t.lyrics?.notFound || "❌ **Lyrics not found!**");
        return;
    }

    
    const lines = lyrics.split('\n').map(line => line.trim()).filter(Boolean);
    const songDuration = Math.floor(track.length / 1000); 

    const embedColor = parseInt(config.embedColor?.replace('#', '') || '1db954', 16);
    const components = [];

    const lyricsContainer = new ContainerBuilder()
        .setAccentColor(embedColor)
        .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(
                `${(t.lyrics?.liveTitle || '## 🎵 Live Lyrics: {title}').replace('{title}', track.title)}\n\n` +
                `${t.lyrics?.syncing || '🔄 Syncing lyrics...'}`
            )
        );
    components.push(lyricsContainer);

    const stopButton = new ButtonBuilder()
        .setCustomId("stopLyrics")
        .setLabel(t.lyrics?.stopButton || "Stop Lyrics")
        .setStyle(ButtonStyle.Danger);

    const fullButton = new ButtonBuilder()
        .setCustomId("fullLyrics")
        .setLabel(t.lyrics?.fullButton || "Full Lyrics")
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(fullButton, stopButton);
    
    const message = await channel.send({ 
        components: [...components, row],
        flags: MessageFlags.IsComponentsV2
    });

    const guildId = player.guildId;
    if (!guildTrackMessages.has(guildId)) {
        guildTrackMessages.set(guildId, []);
    }
    guildTrackMessages.get(guildId).push({
        messageId: message.id,
        channelId: channel.id,
        type: 'lyrics'
    });

        const updateLyrics = async () => {
        const currentTime = Math.floor(player.position / 1000); 
        const totalLines = lines.length;

        const linesPerSecond = totalLines / songDuration; 
        const currentLineIndex = Math.floor(currentTime * linesPerSecond); 

        const start = Math.max(0, currentLineIndex - 3);
        const end = Math.min(totalLines, currentLineIndex + 3);
        const visibleLines = lines.slice(start, end).join('\n');

        const lang = await getLang(player.guildId).catch(() => ({ console: { player: {} } }));
        const t = lang.console?.player || {};
        const updatedContainer = new ContainerBuilder()
            .setAccentColor(embedColor)
            .addTextDisplayComponents(
                (textDisplay) => textDisplay.setContent(
                    `${(t.lyrics?.liveTitle || '## 🎵 Live Lyrics: {title}').replace('{title}', track.title)}\n\n` +
                    visibleLines
                )
            );
        await message.edit({ 
            components: [updatedContainer, row],
            flags: MessageFlags.IsComponentsV2
        });
    };

    const interval = setInterval(updateLyrics, 3000);
    updateLyrics(); 

    const collector = message.createMessageComponentCollector({ time: 300000 });

    collector.on('collect', async i => {
        await i.deferUpdate();
    
        if (i.customId === "stopLyrics") {
            clearInterval(interval);
            await message.delete();
        } else if (i.customId === "fullLyrics") {
            clearInterval(interval);
            const lang = await getLang(player.guildId).catch(() => ({ console: { player: {} } }));
            const t = lang.console?.player || {};
            const fullLyricsContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `${(t.lyrics?.fullTitle || '## 🎵 Full Lyrics: {title}').replace('{title}', track.title)}\n\n` +
                        lines.join('\n')
                    )
                );
    
            const deleteButton = new ButtonBuilder()
                .setCustomId("deleteLyrics")
                .setLabel(t.lyrics?.deleteButton || "Delete")
                .setStyle(ButtonStyle.Danger);
    
            const deleteRow = new ActionRowBuilder().addComponents(deleteButton);
    
            await message.edit({ 
                components: [fullLyricsContainer, deleteRow],
                flags: MessageFlags.IsComponentsV2
            });
        } else if (i.customId === "deleteLyrics") {
            await message.delete();
        }
    });

    collector.on('end', () => {
        clearInterval(interval);
        message.delete().catch(() => {});
    });
}



function createActionRow1(disabled) {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("loopToggle").setEmoji('🔁').setStyle(ButtonStyle.Secondary).setDisabled(disabled),
            new ButtonBuilder().setCustomId("disableLoop").setEmoji('❌').setStyle(ButtonStyle.Secondary).setDisabled(disabled),
            new ButtonBuilder().setCustomId("skipTrack").setEmoji('⏭️').setStyle(ButtonStyle.Secondary).setDisabled(disabled),
            new ButtonBuilder().setCustomId("showLyrics").setEmoji('🎤').setStyle(ButtonStyle.Secondary).setDisabled(disabled),
            new ButtonBuilder().setCustomId("clearQueue").setEmoji('🗑️').setStyle(ButtonStyle.Secondary).setDisabled(disabled)
        );
}

function createActionRow2(disabled) {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("stopTrack").setEmoji('⏹️').setStyle(ButtonStyle.Danger).setDisabled(disabled),
            new ButtonBuilder().setCustomId("pauseTrack").setEmoji('⏸️').setStyle(ButtonStyle.Secondary).setDisabled(disabled),
            new ButtonBuilder().setCustomId("resumeTrack").setEmoji('▶️').setStyle(ButtonStyle.Secondary).setDisabled(disabled),
            new ButtonBuilder().setCustomId("volumeUp").setEmoji('🔊').setStyle(ButtonStyle.Secondary).setDisabled(disabled),
            new ButtonBuilder().setCustomId("volumeDown").setEmoji('🔉').setStyle(ButtonStyle.Secondary).setDisabled(disabled)
        );
}

function createProgressBar(current, total, length = 20) {
    const progress = Math.round((current / total) * length);
    const emptyProgress = length - progress;
    const progressText = '▓'.repeat(progress);
    const emptyProgressText = '░'.repeat(emptyProgress);
    
    const currentTime = formatDuration(current);
    const totalTime = formatDuration(total);
    
    return `\`${currentTime}\` ${progressText}${emptyProgressText} \`${totalTime}\``;
}

async function startProgressUpdates(client, guildId, message, player, track) {
    let updateCount = 0;
    const updateInterval = setInterval(async () => {
        try {
            const currentPlayer = client.riffy.players.get(guildId);
            if (!currentPlayer || currentPlayer !== player) {
                clearInterval(updateInterval);
                progressUpdateIntervals.delete(guildId);
                nowPlayingMessages.delete(guildId);
                return;
            }
            
            const stored = nowPlayingMessages.get(guildId);
            if (!stored || !player || !player.current || player.current.info.uri !== track.info.uri) {
                clearInterval(updateInterval);
                progressUpdateIntervals.delete(guildId);
                nowPlayingMessages.delete(guildId);
                if (stored && stored.messageId && stored.channelId) {
                    try {
                        const channel = client.channels.cache.get(stored.channelId);
                        if (channel) {
                            const msg = await channel.messages.fetch(stored.messageId).catch(() => null);
                            if (msg) {
                                await msg.delete().catch(() => {});
                            }
                        }
                    } catch (error) {
                    }
                }
                return;
            }

            const currentPosition = player.position;
            const totalDuration = track.info.length;
            const progress = Math.min(100, Math.round((currentPosition / totalDuration) * 100));

            const progressBar = createProgressBar(currentPosition, totalDuration);
            const embedColor = parseInt('#FF7A00'.replace('#', ''), 16);
            const components = [];

            const lang = await getLang(guildId).catch(() => ({ console: { player: {} } }));
            const t = lang.console?.player || {};
            const headerSection = new SectionBuilder()
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `${t.trackInfo?.title || '**Title:**'} [${track.info.title}](${track.info.uri})\n` +
                        `${t.trackInfo?.author || '**Author:**'} ${track.info.author || (t.trackInfo?.unknownArtist || 'Unknown Artist')}\n` +
                        `${t.trackInfo?.length || '**Length:**'} ${formatDuration(track.info.length)}\n` +
                        `${t.trackInfo?.requester || '**Requester:**'} ${requesters.get(track.info.uri) || (t.trackInfo?.unknown || 'Unknown')}\n` +
                        `${t.trackInfo?.source || '**Source:**'} ${track.info.sourceName}` +
                        (config.showProgressBar !== false ? `\n${t.trackInfo?.progress || '**Progress:**'} ${progressBar} (${progress}%)` : '')
                    )
                )
                .setThumbnailAccessory(
                    (thumbnail) => thumbnail.setURL(musicIcons.playerIcon)
                );
            components.push(new ContainerBuilder()
                .setAccentColor(embedColor)
                .addSectionComponents(headerSection));
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

            const controlsContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `🔁 \`${t.controlLabels?.loop || 'Loop'}\` • ❌ \`${t.controlLabels?.disable || 'Disable'}\` • ⏭️ \`${t.controlLabels?.skip || 'Skip'}\` • 📜 \`${t.controlLabels?.queue || 'Queue'}\` • 🗑️ \`${t.controlLabels?.clear || 'Clear'}\`\n` +
                        `⏹️ \`${t.controlLabels?.stop || 'Stop'}\` • ⏸️ \`${t.controlLabels?.pause || 'Pause'}\` • ▶️ \`${t.controlLabels?.resume || 'Resume'}\` • 🔊 \`${t.controlLabels?.volUp || 'Vol +'}\` • 🔉 \`${t.controlLabels?.volDown || 'Vol -'}\``
                    )
                );
            components.push(controlsContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

            if (config.generateSongCard !== false) {
                const mediaGallery = new MediaGalleryBuilder()
                    .addItems(
                        (mediaItem) => mediaItem
                            .setURL('attachment://song-banner.png')
                            .setDescription(`${track.info.title} - ${track.info.author || 'Unknown Artist'}`)
                    );
                components.push(mediaGallery);
            } else if (track.info?.thumbnail && typeof track.info.thumbnail === 'string' && track.info.thumbnail.trim() !== '' && track.info.thumbnail.startsWith('http')) {
                const mediaGallery = new MediaGalleryBuilder()
                    .addItems(
                        (mediaItem) => mediaItem
                            .setURL(track.info.thumbnail)
                            .setDescription(`${track.info.title} - ${track.info.author || 'Unknown Artist'}`)
                    );
                components.push(mediaGallery);
            }

            const actionRow1 = createActionRow1(false);
            const actionRow2 = createActionRow2(false);

            const channel = client.channels.cache.get(stored.channelId);
            if (channel) {
                const msg = await channel.messages.fetch(stored.messageId).catch(() => null);
                if (msg) {
                    try {
                        // Only regenerate card on first update or every 6th update (every 90 seconds) to save memory
                        const shouldRegenerateCard = config.generateSongCard !== false && (updateCount === 0 || updateCount % 6 === 0);
                        
                        if (shouldRegenerateCard) {
                            // Extract YouTube ID from track URI for better thumbnail fetching
                            let thumbnailURL = track.info.thumbnail || '';
                            const trackUri = track.info.uri || '';
                            
                            // If thumbnail is missing or invalid, try to extract from URI
                            if ((!thumbnailURL || !thumbnailURL.startsWith('http')) && trackUri) {
                                thumbnailURL = trackUri;
                            }
                            
                            const cardBuffer = await musicCard.generateCard({
                                thumbnailURL: thumbnailURL,
                                trackURI: trackUri, // Pass URI separately for YouTube ID extraction
                                songTitle: track.info.title,
                                songArtist: track.info.author || 'Unknown Artist',
                                trackRequester: requesters.get(track.info.uri) || 'Unknown',
                                isPlaying: true,
                                showVisualizer: config.showVisualizer !== false,
                            });
                            const attachment = new AttachmentBuilder(cardBuffer, { name: 'song-banner.png' });
                            await msg.edit({ 
                                components: [...components, actionRow1, actionRow2], 
                                files: [attachment],
                                flags: MessageFlags.IsComponentsV2
                            });
                        } else {
                            // Just update text without regenerating card to save memory/CPU
                            await msg.edit({ 
                                components: [...components, actionRow1, actionRow2],
                                flags: MessageFlags.IsComponentsV2
                            });
                        }
                        updateCount++;
                    } catch (cardError) {
                        await msg.edit({ 
                            components: [...components, actionRow1, actionRow2],
                            flags: MessageFlags.IsComponentsV2
                        });
                    }
                }
            }
        } catch (error) {
            clearInterval(updateInterval);
            progressUpdateIntervals.delete(guildId);
            nowPlayingMessages.delete(guildId);
        }
    }, 15000); // Increased from 5000ms to 15000ms (15 seconds) to reduce CPU/memory usage
    
    return updateInterval;
}

module.exports = { initializePlayer, cleanupTrackMessages };
