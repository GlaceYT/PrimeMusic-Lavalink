const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");
const musicIcons = require('../UI/icons/musicicons.js');

async function shuffle(client, interaction, lang) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player || !player.queue || player.queue.length === 0) {
            const embed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: lang.shuffle.embed.queueEmpty,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.shuffle.embed.queueEmptyDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        // Shuffle the queue
        for (let i = player.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [player.queue[i], player.queue[j]] = [player.queue[j], player.queue[i]];
        }

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setAuthor({
                name: lang.shuffle.embed.queueShuffled,
                iconURL: musicIcons.beats2Icon,
                url: config.SupportServer
            })
            .setDescription(lang.shuffle.embed.queueShuffledDescription)
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error processing shuffle command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({
                name: lang.shuffle.embed.error,
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.shuffle.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "shuffle",
    description: "Shuffle the current song queue",
    permissions: "0x0000000000000800",
    options: [],
    run: shuffle
};