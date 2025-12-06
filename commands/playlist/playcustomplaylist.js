const { SlashCommandBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, SectionBuilder, MessageFlags } = require('discord.js');
const { playlistCollection } = require('../../mongodb.js');
const config = require("../../config.js");
const musicIcons = require('../../UI/icons/musicicons.js');
const { sendErrorResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { checkVoiceChannel: checkVC } = require('../../utils/voiceChannelCheck.js');
const { getLavalinkManager } = require('../../lavalink.js');
const { getLang } = require('../../utils/languageLoader.js');

const data = new SlashCommandBuilder()
  .setName("playcustomplaylist")
  .setDescription("Play a custom playlist")
  .addStringOption(option =>
    option.setName("name")
      .setDescription("Enter playlist name")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
            const lang = await getLang(interaction.guildId);

            const playlistName = interaction.options.getString('name');
            const userId = interaction.user.id;

            const existingPlayer = client.riffy.players.get(interaction.guildId);
            const voiceCheck = await checkVC(interaction, existingPlayer);
            if (!voiceCheck.allowed) {
                const reply = await interaction.editReply(voiceCheck.response);
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            const playlist = await playlistCollection.findOne({ name: playlistName });
            if (!playlist) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.playcustomplaylist.notFound.title}\n\n` +
                    `${lang.playlist.playcustomplaylist.notFound.message.replace('{name}', playlistName)}\n` +
                    `${lang.playlist.playcustomplaylist.notFound.note}`,
                    5000
                );
            }

            if (playlist.isPrivate && playlist.userId !== userId) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.playcustomplaylist.accessDenied.title}\n\n` +
                    `${lang.playlist.playcustomplaylist.accessDenied.message}\n` +
                    `${lang.playlist.playcustomplaylist.accessDenied.note}`,
                    5000
                );
            }

            if (!playlist.songs.length) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.playcustomplaylist.empty.title}\n\n` +
                    `${lang.playlist.playcustomplaylist.empty.message.replace('{name}', playlistName)}\n` +
                    `${lang.playlist.playcustomplaylist.empty.note}`,
                    5000
                );
            }

            const nodeManager = getLavalinkManager();
            if (!nodeManager) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.playcustomplaylist.lavalinkManagerError.title}\n\n` +
                    `${lang.playlist.playcustomplaylist.lavalinkManagerError.message}\n` +
                    `${lang.playlist.playcustomplaylist.lavalinkManagerError.note}`,
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
                    `${lang.playlist.playcustomplaylist.noNodes.title}\n\n` +
                    `${lang.playlist.playcustomplaylist.noNodes.message.replace('{connected}', nodeCount).replace('{total}', totalCount)}\n` +
                    `${lang.playlist.playcustomplaylist.noNodes.note}`,
                    5000
                );
            }

            const userVoiceChannel = interaction.member.voice.channelId;
            
            if (existingPlayer && existingPlayer.voiceChannel !== userVoiceChannel) {
                try {
                    const { cleanupTrackMessages } = require('../../player.js');
                    await cleanupTrackMessages(client, existingPlayer);
                    existingPlayer.queue.clear();
                    existingPlayer.stop();
                    // Small delay before destroy to let any pending events finish
                    await new Promise(resolve => setTimeout(resolve, 300));
                    existingPlayer.destroy();
                    // Wait after destroy to let Riffy clean up completely
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

            for (const song of playlist.songs) {
                const query = song.url ? song.url : song.name;
                let resolve;
                try {
                    resolve = await client.riffy.resolve({ query: query, requester: interaction.user.username });
                } catch (err) {
                    const msg = err?.message || '';
                    if (msg.includes('fetch failed') || msg.includes('No nodes are available') || (err.cause && err.cause.code === 'ECONNREFUSED')) {
                        await nodeManager.reconnectNodesNow?.(5000).catch(() => {});
                        await nodeManager.ensureNodeAvailable();
                        resolve = await client.riffy.resolve({ query: query, requester: interaction.user.username });
                    } else {
                        throw err;
                    }
                }
                if (!resolve || typeof resolve !== 'object') {
                    throw new TypeError('Resolve response is not an object');
                }

                const { loadType, tracks } = resolve;
                if (loadType === 'track' || loadType === 'search') {
                    const track = tracks.shift();
                    track.info.requester = interaction.user.username;
                    player.queue.add(track);
                } else {
                    return sendErrorResponse(
                        interaction,
                        `${lang.playlist.playcustomplaylist.resolveError.title}\n\n` +
                        `${lang.playlist.playcustomplaylist.resolveError.message}\n` +
                        `${lang.playlist.playcustomplaylist.resolveError.note}`,
                        5000
                    );
                }
            }

            let connectionAttempts = 0;
            while (!player.connected && connectionAttempts < 20) {
                await new Promise(resolve => setTimeout(resolve, 100));
                connectionAttempts++;
            }

            if (!player.playing && !player.paused) player.play();

            const embedColor = parseInt(config.embedColor?.replace('#', '') || '1db954', 16);
            const components = [];

            const headerSection = new SectionBuilder()
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `${lang.playlist.playcustomplaylist.success.title}\n\n` +
                        `${lang.playlist.playcustomplaylist.success.message.replace('{name}', playlistName)}\n\n` +
                        `${lang.playlist.playcustomplaylist.success.songs.replace('{count}', playlist.songs.length)}`
                    )
                )
                .setThumbnailAccessory(
                    (thumbnail) => thumbnail.setURL(musicIcons.beats2Icon)
                );

            const headerContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addSectionComponents(headerSection);
            components.push(headerContainer);

            const reply = await interaction.editReply({
                components: components,
                flags: MessageFlags.IsComponentsV2,
                fetchReply: true
            });
            setTimeout(() => reply.delete().catch(() => {}), 3000);
            return reply;

        } catch (error) {
            const lang = await getLang(interaction.guildId);
            return handleCommandError(
                interaction,
                error,
                'playcustomplaylist',
                `${lang.playlist.playcustomplaylist.errors.title}\n\n` +
                `${lang.playlist.playcustomplaylist.errors.message}`
            );
        }
    }
};
