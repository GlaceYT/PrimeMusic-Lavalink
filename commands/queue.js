const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require("../config.js");
const musicIcons = require('../UI/icons/musicicons.js');

async function queue(client, interaction, lang) {
    try {
        const player = client.riffy.players.get(interaction.guildId);
        if (!player || (!player.queue.current && player.queue.length === 0)) {
            const embed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: lang.queue.embed.queueEmpty,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.queue.embed.queueEmptyDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const currentTrack = player.queue.current;
        const queue = player.queue;
        const songsPerPage = 10;
        const totalPages = Math.ceil((queue.length + (currentTrack ? 1 : 0)) / songsPerPage);
        let currentPage = 1;

        function generateQueuePage(page) {
            const start = (page - 1) * songsPerPage;
            const end = page * songsPerPage;

            const queueItems = [];
            if (page === 1 && currentTrack) {
                queueItems.push(`🎵 **Now Playing:** [${currentTrack.info.title}](${currentTrack.info.uri}) - Requested by: ${currentTrack.info.requester}`);
            }

            const paginatedQueue = queue.slice(start - (currentTrack ? 1 : 0), end - (currentTrack ? 1 : 0));
            paginatedQueue.forEach((track, index) => {
                queueItems.push(`**${start + index + 1}.** [${track.info.title}](${track.info.uri}) - Requested by: ${track.info.requester}`);
            });

            return queueItems.join('\n') || lang.queue.embed.noMoreSongs;
        }

        const queueEmbed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setAuthor({
                name: lang.queue.embed.currentQueue,
                iconURL: musicIcons.beatsIcon,
                url: config.SupportServer
            })
            .setDescription(generateQueuePage(currentPage))
            .setFooter({ text: `Page ${currentPage} of ${totalPages} | ${lang.footer}`, iconURL: musicIcons.heartIcon });

        const prevButton = new ButtonBuilder()
            .setCustomId('prev_page')
            .setLabel('⬅ Previous')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(currentPage === 1);

        const nextButton = new ButtonBuilder()
            .setCustomId('next_page')
            .setLabel('Next ➡')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(currentPage === totalPages);

        const row = new ActionRowBuilder().addComponents(prevButton, nextButton);

        const response = await interaction.reply({ embeds: [queueEmbed], components: [row], fetchReply: true });

        const collector = response.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id,
            time: 60000
        });

        collector.on('collect', async (i) => {
            if (i.customId === 'prev_page' && currentPage > 1) {
                currentPage--;
            } else if (i.customId === 'next_page' && currentPage < totalPages) {
                currentPage++;
            }

            const updatedEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: lang.queue.embed.currentQueue,
                    iconURL: musicIcons.beatsIcon,
                    url: config.SupportServer
                })
                .setDescription(generateQueuePage(currentPage))
                .setFooter({ text: `Page ${currentPage} of ${totalPages} | ${lang.footer}`, iconURL: musicIcons.heartIcon });

            prevButton.setDisabled(currentPage === 1);
            nextButton.setDisabled(currentPage === totalPages);

            await i.update({ embeds: [updatedEmbed], components: [row] });
        });

        collector.on('end', async () => {
            await interaction.editReply({ components: [] });
        });

    } catch (error) {
        console.error('Error processing queue command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({
                name: lang.queue.embed.error,
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.queue.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "queue",
    description: "Show the current song queue",
    permissions: "0x0000000000000800",
    options: [],
    run: queue
};
