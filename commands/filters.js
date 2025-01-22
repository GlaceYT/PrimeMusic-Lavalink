const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const config = require("../config.js");
const musicIcons = require('../UI/icons/musicicons.js');

async function filters(client, interaction, lang) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({
                    name: lang.filters.embed.error,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.filters.embed.noPlayer);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        if (!interaction.member.voice.channelId || interaction.member.voice.channelId !== player.voiceChannel) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({
                    name: lang.filters.embed.error,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.filters.embed.wrongChannel);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const selectedFilter = interaction.options.getString('filter');

        if (selectedFilter === 'clear') {
            player.filters.clearFilters();
            await interaction.reply({ content: lang.filters.embed.filtersCleared, ephemeral: true });
            return;
        }

        switch (selectedFilter) {
            case 'karaoke':
                player.filters.setKaraoke(true);
                break;
            case 'timescale':
                player.filters.setTimescale(true, { speed: 1.2, pitch: 1.2 });
                break;
            case 'tremolo':
                player.filters.setTremolo(true, { frequency: 4, depth: 0.75 });
                break;
            case 'vibrato':
                player.filters.setVibrato(true, { frequency: 4, depth: 0.75 });
                break;
            case 'rotation':
                player.filters.setRotation(true, { rotationHz: 0.2 });
                break;
            case 'distortion':
                player.filters.setDistortion(true, { sinScale: 1, cosScale: 1 });
                break;
            case 'channelmix':
                player.filters.setChannelMix(true, { leftToLeft: 0.5, leftToRight: 0.5, rightToLeft: 0.5, rightToRight: 0.5 });
                break;
            case 'lowpass':
                player.filters.setLowPass(true, { smoothing: 0.5 });
                break;
            case 'bassboost':
                player.filters.setBassboost(true, { value: 3 });
                break;
            default:
                await interaction.reply({ content: lang.filters.embed.invalidFilter, ephemeral: true });
                return;
        }

        await interaction.reply({ content: lang.filters.embed.filterApplied.replace("{filter}", selectedFilter), ephemeral: true });

    } catch (error) {
        console.error('Error processing filters command:', error);

        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({
                name: lang.filters.embed.error,
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.filters.embed.errorProcessing);

        if (interaction.replied || interaction.deferred) {
            await interaction.editReply({ embeds: [errorEmbed] });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}

module.exports = {
    name: "filters",
    description: "Control audio filters with buttons",
    permissions: "0x0000000000000800",
    options: [
        {
            name: 'filter',
            description: 'Select a filter to apply',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Karaoke', value: 'karaoke' },
                { name: 'Timescale', value: 'timescale' },
                { name: 'Tremolo', value: 'tremolo' },
                { name: 'Vibrato', value: 'vibrato' },
                { name: '3D', value: 'rotation' },
                { name: 'Distortion', value: 'distortion' },
                { name: 'Channel Mix', value: 'channelmix' },
                { name: 'Low Pass', value: 'lowpass' },
                { name: 'Bassboost', value: 'bassboost' },
                { name: 'Clear Filters', value: 'clear' }
            ]
        }
    ],
    run: filters
};