const { SlashCommandBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, SectionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const config = require('../../config.js');
const musicIcons = require('../../UI/icons/musicicons.js');
const { playlistCollection } = require('../../mongodb.js');
const { getLang } = require('../../utils/languageLoader.js');
const { handleCommandError } = require('../../utils/responseHandler.js');

const data = new SlashCommandBuilder()
  .setName("history")
  .setDescription("Show recently played tracks");

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
            const lang = await getLang(interaction.guildId);

            const guildId = interaction.guildId;

            const historyData = await playlistCollection.findOne({ 
                guildId,
                name: '__HISTORY__'
            });

            if (!historyData || !historyData.songs || historyData.songs.length === 0) {
                const errorSection = new SectionBuilder()
                    .addTextDisplayComponents(
                        (textDisplay) => textDisplay.setContent(
                            `${lang.utility.history.noHistory.title}\n\n` +
                            `${lang.utility.history.noHistory.message}\n` +
                            `${lang.utility.history.noHistory.note}`
                        )
                    )
                    .setThumbnailAccessory(
                        (thumbnail) => thumbnail.setURL(musicIcons.alertIcon)
                    );

                const errorContainer = new ContainerBuilder()
                    .setAccentColor(parseInt(config.embedColor?.replace('#', '') || '1db954', 16))
                    .addSectionComponents(errorSection);

                const reply = await interaction.editReply({
                    components: [errorContainer],
                    flags: MessageFlags.IsComponentsV2,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 30000);
                return reply;
            }

            const songs = historyData.songs.slice().reverse();
            const songsPerPage = 10;
            const totalPages = Math.ceil(songs.length / songsPerPage);
            let currentPage = 1;

            const generateHistoryPage = (page) => {
                const start = (page - 1) * songsPerPage;
                const end = page * songsPerPage;
                const paginatedSongs = songs.slice(start, end);

                return paginatedSongs.map((song, index) => {
                    return `**${start + index + 1}.** [${song}](${song})`;
                }).join('\n') || lang.utility.history.noMoreSongs;
            };

            const embedColor = parseInt(config.embedColor?.replace('#', '') || '1db954', 16);
            const components = [];

            const historyTitle = totalPages > 1 
                ? lang.utility.history.titlePaginated.replace('{currentPage}', currentPage).replace('{totalPages}', totalPages)
                : lang.utility.history.title;

            const historySection = new SectionBuilder()
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `${historyTitle}\n\n` +
                        generateHistoryPage(currentPage)
                    )
                )
                .setThumbnailAccessory(
                    (thumbnail) => thumbnail.setURL(musicIcons.playlistIcon)
                );

            const historyContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addSectionComponents(historySection);

            components.push(historyContainer);

            const footerSection = new SectionBuilder()
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        `**Version 1.4** • Prime Music Bot\n` +
                        `Developed by GlaceYT / https://GlaceYT.com`
                    )
                )
                .setThumbnailAccessory(
                    (thumbnail) => thumbnail.setURL(musicIcons.heartIcon)
                );

            const footerContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addSectionComponents(footerSection);
            components.push(footerContainer);

            if (totalPages <= 1) {
                const response = await interaction.editReply({
                    components: components,
                    flags: MessageFlags.IsComponentsV2,
                    fetchReply: true
                });
                setTimeout(() => response.delete().catch(() => {}), 30000);
                return response;
            }

            const prevButton = new ButtonBuilder()
                .setCustomId(`history_prev_${interaction.id}`)
                .setLabel(lang.utility.history.buttons.previous)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(currentPage === 1);

            const nextButton = new ButtonBuilder()
                .setCustomId(`history_next_${interaction.id}`)
                .setLabel(lang.utility.history.buttons.next)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(currentPage === totalPages);

            const row = new ActionRowBuilder().addComponents(prevButton, nextButton);

            const response = await interaction.editReply({ 
                components: [...components, row], 
                flags: MessageFlags.IsComponentsV2,
                fetchReply: true 
            });
            setTimeout(() => response.delete().catch(() => {}), 30000);

            const collector = response.createMessageComponentCollector({
                filter: (i) => i.user.id === interaction.user.id && (i.customId.startsWith('history_prev_') || i.customId.startsWith('history_next_')),
                time: 60000
            });

            collector.on('collect', async (i) => {
                await i.deferUpdate();

                if (i.customId.startsWith('history_prev_') && currentPage > 1) {
                    currentPage--;
                } else if (i.customId.startsWith('history_next_') && currentPage < totalPages) {
                    currentPage++;
                }

                const updatedTitle = lang.utility.history.titlePaginated.replace('{currentPage}', currentPage).replace('{totalPages}', totalPages);

                const updatedSection = new SectionBuilder()
                    .addTextDisplayComponents(
                        (textDisplay) => textDisplay.setContent(
                            `${updatedTitle}\n\n` +
                            generateHistoryPage(currentPage)
                        )
                    )
                    .setThumbnailAccessory(
                        (thumbnail) => thumbnail.setURL(musicIcons.playlistIcon)
                    );

                const updatedContainer = new ContainerBuilder()
                    .setAccentColor(embedColor)
                    .addSectionComponents(updatedSection);

                prevButton.setDisabled(currentPage === 1);
                nextButton.setDisabled(currentPage === totalPages);

                await i.editReply({ 
                    components: [updatedContainer, footerContainer, row],
                    flags: MessageFlags.IsComponentsV2,
                });
            });

            collector.on('end', async () => {
                try {
                    await response.edit({ components: components }).catch(() => {});
                } catch (error) {
                }
            });

        } catch (error) {
            return handleCommandError(
                interaction,
                error,
                'history',
                null
            );
        }
    }
};
