const { SlashCommandBuilder, ContainerBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const config = require('../../config.js');
const { requesters } = require('./play');
const { sendErrorResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { checkVoiceChannel: checkVC } = require('../../utils/voiceChannelCheck.js');
const { getLavalinkManager } = require('../../lavalink.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search for a song and select from results")
  .addStringOption(option =>
    option.setName("query")
      .setDescription("Search query for the song")
      .setRequired(true)
  );

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

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            const lang = await getLang(interaction.guildId);
            const t = lang.music.search;

            const query = interaction.options.getString('query');

            await interaction.deferReply();

            const nodeManager = getLavalinkManager();
            if (!nodeManager) {
                return sendErrorResponse(
                    interaction,
                    t.lavalinkManagerError.title + '\n\n' +
                    t.lavalinkManagerError.message + '\n' +
                    t.lavalinkManagerError.note,
                    5000
                );
            }
            
            try {
                await nodeManager.ensureNodeAvailable();
            } catch (error) {
                const nodeCount = nodeManager.getNodeCount();
                const totalCount = nodeManager.getTotalNodeCount();
                return sendErrorResponse(
                    interaction,
                    t.noNodes.title + '\n\n' +
                    t.noNodes.message
                        .replace('{connected}', nodeCount)
                        .replace('{total}', totalCount) + '\n' +
                    t.noNodes.note,
                    5000
                );
            }

            const existingPlayer = client.riffy.players.get(interaction.guildId);
            const voiceCheck = await checkVC(interaction, existingPlayer);
            if (!voiceCheck.allowed) {
                const reply = await interaction.editReply(voiceCheck.response);
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            const userVoiceChannel = interaction.member.voice.channelId;
            
            if (existingPlayer && existingPlayer.voiceChannel !== userVoiceChannel) {
                try {
                    const { cleanupTrackMessages } = require('../../player.js');
                    await cleanupTrackMessages(client, existingPlayer);
                    existingPlayer.queue.clear();
                    existingPlayer.stop();
                    await new Promise(resolve => setTimeout(resolve, 300));
                    existingPlayer.destroy();
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    console.error('Error destroying old player:', error);
                    try {
                        if (!existingPlayer.destroyed) {
                            existingPlayer.destroy();
                            await new Promise(resolve => setTimeout(resolve, 500));
                        }
                    } catch (e) {}
                }
            }

            await nodeManager.checkAllNodesHealth().catch(() => {});
            await nodeManager.forceConnectAllNodes().catch(() => {});
            await new Promise(res => setTimeout(res, 400));
            let player;
            let attempts = 0;
            const maxAttempts = 3;
            while (attempts < maxAttempts) {
                await nodeManager.ensureNodeAvailable();
                try {
                    player = client.riffy.createConnection({
                        guildId: interaction.guildId,
                        voiceChannel: userVoiceChannel,
                        textChannel: interaction.channelId,
                        deaf: true
                    });
                    break;
                } catch (err) {
                    attempts++;
                    const msg = err?.message || '';
                    if (attempts < maxAttempts && (msg.includes('No nodes are available') || msg.includes('fetch failed'))) {
                        await nodeManager.reconnectNodesNow?.(5000).catch(() => {});
                        await nodeManager.ensureNodeAvailable();
                        await new Promise(res => setTimeout(res, 700));
                        continue;
                    }
                    if (attempts >= maxAttempts) {
                        await nodeManager.refreshRiffy?.();
                        await nodeManager.ensureNodeAvailable();
                        player = client.riffy.createConnection({
                            guildId: interaction.guildId,
                            voiceChannel: userVoiceChannel,
                            textChannel: interaction.channelId,
                            deaf: true
                        });
                        break;
                    }
                    throw err;
                }
            }

            let resolve;
            try {
                resolve = await client.riffy.resolve({ query, requester: interaction.user.username });
            } catch (err) {
                const msg = err?.message || '';
                if (msg.includes('fetch failed') || msg.includes('No nodes are available') || (err.cause && err.cause.code === 'ECONNREFUSED')) {
                    await nodeManager.reconnectNodesNow?.(5000).catch(() => {});
                    await nodeManager.ensureNodeAvailable();
                    resolve = await client.riffy.resolve({ query, requester: interaction.user.username });
                } else {
                    throw err;
                }
            }

            if (!resolve || typeof resolve !== 'object' || !Array.isArray(resolve.tracks)) {
                return sendErrorResponse(
                    interaction,
                    t.noResults.title + '\n\n' +
                    t.noResults.message + '\n' +
                    t.noResults.note,
                    5000
                );
            }

            if (resolve.loadType === 'playlist') {
                return sendErrorResponse(
                    interaction,
                    t.playlistNotSupported.title + '\n\n' +
                    t.playlistNotSupported.message + '\n' +
                    t.playlistNotSupported.note,
                    5000
                );
            }

            const tracks = resolve.tracks.slice(0, 5);
            
            if (tracks.length === 0) {
                return sendErrorResponse(
                    interaction,
                    t.noResults.title + '\n\n' +
                    t.noResults.message + '\n' +
                    t.noResults.note,
                    5000
                );
            }

            const searchResults = tracks.map((track, index) => {
                return t.results.track
                    .replace('{number}', index + 1)
                    .replace('{title}', track.info.title)
                    .replace('{uri}', track.info.uri)
                    .replace('{author}', track.info.author || 'Unknown')
                    .replace('{duration}', formatDuration(track.info.length));
            }).join('\n\n');

            const embedColor = parseInt(config.embedColor?.replace('#', '') || '1db954', 16);
            const components = [];

            const resultsContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.results.title + '\n\n' +
                        t.results.query.replace('{query}', query) + '\n\n' +
                        searchResults
                    )
                );

            components.push(resultsContainer);

            const buttons = [];
            for (let i = 0; i < tracks.length; i++) {
                buttons.push(
                    new ButtonBuilder()
                        .setCustomId(`search_select_${i}_${interaction.id}`)
                        .setLabel(`${i + 1}`)
                        .setStyle(ButtonStyle.Primary)
                );
            }

            const cancelButton = new ButtonBuilder()
                .setCustomId(`search_cancel_${interaction.id}`)
                .setLabel(t.buttons.cancel)
                .setStyle(ButtonStyle.Danger);

            buttons.push(cancelButton);

            const rows = [];
            for (let i = 0; i < buttons.length; i += 5) {
                rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)));
            }

            const message = await interaction.editReply({ 
                components: [...components, ...rows], 
                flags: MessageFlags.IsComponentsV2,
                fetchReply: true 
            });

            const collector = message.createMessageComponentCollector({
                filter: (i) => i.user.id === interaction.user.id && (i.customId.startsWith('search_select_') || i.customId.startsWith('search_cancel_')) && i.customId.endsWith(`_${interaction.id}`),
                time: 15000
            });

            collector.on('collect', async (i) => {
                await i.deferUpdate();
                
                if (i.customId.startsWith('search_cancel_')) {
                    collector.stop();
                    setTimeout(() => {
                        message.delete().catch(() => {});
                    }, 1000);
                    return;
                }

                const trackIndex = parseInt(i.customId.split('_')[2]);
                if (isNaN(trackIndex) || trackIndex < 0 || trackIndex >= tracks.length) {
                    return;
                }

                const selectedTrack = tracks[trackIndex];
                selectedTrack.info.requester = interaction.user.username;
                player.queue.add(selectedTrack);
                requesters.set(selectedTrack.info.uri, interaction.user.username);

                let connectionAttempts = 0;
                while (!player.connected && connectionAttempts < 20) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    connectionAttempts++;
                }

                if (!player.playing && !player.paused) player.play();

                collector.stop();
                setTimeout(() => {
                    message.delete().catch(() => {});
                }, 500);
            });

            collector.on('end', async () => {
                try {
                    setTimeout(() => {
                        message.delete().catch(() => {});
                    }, 500);
                } catch (error) {
                }
            });

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { search: { errors: {} } } }));
            const t = lang.music?.search?.errors || {};
            
            return handleCommandError(
                interaction,
                error,
                'search',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while searching.\nPlease try again later.')
            );
        }
    }
};
