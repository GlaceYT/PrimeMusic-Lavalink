const { SlashCommandBuilder, ContainerBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkQueueOrTrack } = require('../../utils/playerValidation.js');
const { getEmbedColor, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("queue")
  .setDescription("Show the current song queue");

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.queue;

            const player = client.riffy.players.get(interaction.guildId);
            const check = await checkVoiceChannel(interaction, player);
            
            if (!check.allowed) {
                const reply = await interaction.editReply({
                    ...check.response,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            const queueCheck = await checkQueueOrTrack(player, null, interaction.guildId);
            
            if (!queueCheck.valid) {
                const reply = await interaction.editReply({
                    ...queueCheck.response,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            const currentTrack = player.current;
            const queue = player.queue;
            const songsPerPage = 10;
            const totalPages = Math.ceil(queue.length / songsPerPage) || 1;
            let currentPage = 1;

            function generateQueuePage(page) {
                const queueItems = [];
                
                if (page === 1 && currentTrack) {
                    queueItems.push(
                        t.nowPlaying + '\n' +
                        t.track
                            .replace('{title}', currentTrack.info.title)
                            .replace('{uri}', currentTrack.info.uri) + '\n' +
                        t.requestedBy.replace('{requester}', currentTrack.info.requester || 'Unknown')
                    );
                }

                const queueStartIndex = (page - 1) * songsPerPage;
                const queueEndIndex = Math.min(queueStartIndex + songsPerPage, queue.length);
                const paginatedQueue = queue.slice(queueStartIndex, queueEndIndex);
                
                paginatedQueue.forEach((track, index) => {
                    const position = queueStartIndex + index + 1;
                    queueItems.push(
                        t.trackNumber.replace('{number}', position) + ' ' +
                        t.track
                            .replace('{title}', track.info.title)
                            .replace('{uri}', track.info.uri) + '\n   ' +
                        t.requestedBy.replace('{requester}', track.info.requester || 'Unknown')
                    );
                });

                return queueItems.join('\n\n') || t.noMoreSongs;
            }

            const embedColor = getEmbedColor();
            const components = [];

            const queueContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        (totalPages > 1 
                            ? t.titlePaginated
                                .replace('{currentPage}', currentPage)
                                .replace('{totalPages}', totalPages)
                            : t.title) + '\n\n' +
                        generateQueuePage(currentPage)
                    )
                );

            components.push(queueContainer);

            const prevButton = new ButtonBuilder()
                .setCustomId(`queue_prev_${interaction.id}`)
                .setLabel(t.buttons.previous)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(currentPage === 1);

            const nextButton = new ButtonBuilder()
                .setCustomId(`queue_next_${interaction.id}`)
                .setLabel(t.buttons.next)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(currentPage === totalPages);

            const row = new ActionRowBuilder().addComponents(prevButton, nextButton);

            const response = await interaction.editReply({ 
                components: [...components, row], 
                flags: MessageFlags.IsComponentsV2,
                fetchReply: true 
            });
            setTimeout(() => response.delete().catch(() => {}), 30000);

            if (totalPages > 1) {
                const collector = response.createMessageComponentCollector({
                    filter: (i) => i.user.id === interaction.user.id && (i.customId.startsWith('queue_prev_') || i.customId.startsWith('queue_next_')),
                    time: 60000
                });

                collector.on('collect', async (i) => {
                    if (i.customId.startsWith('queue_prev_') && currentPage > 1) {
                        currentPage--;
                    } else if (i.customId.startsWith('queue_next_') && currentPage < totalPages) {
                        currentPage++;
                    }

                    const updatedContainer = new ContainerBuilder()
                        .setAccentColor(embedColor)
                        .addTextDisplayComponents(
                            (textDisplay) => textDisplay.setContent(
                                t.titlePaginated
                                    .replace('{currentPage}', currentPage)
                                    .replace('{totalPages}', totalPages) + '\n\n' +
                                generateQueuePage(currentPage)
                            )
                        );

                    prevButton.setDisabled(currentPage === 1);
                    nextButton.setDisabled(currentPage === totalPages);

                    await i.update({ 
                        components: [updatedContainer, row],
                        flags: MessageFlags.IsComponentsV2,
                    });
                });

                collector.on('end', async () => {
                    try {
                        await response.edit({ components: components }).catch(() => {});
                    } catch (error) {
                    }
                });
            }

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { queue: { errors: {} } } }));
            const t = lang.music?.queue?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'queue',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while fetching the queue.\nPlease try again later.')
            );
        }
    }
};
