const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { playlistCollection } = require('../mongodb.js');
const config = require('../config.js');
const musicIcons = require('../UI/icons/musicicons.js');

async function deleteSong(client, interaction, lang) {
    try {
        const playlistName = interaction.options.getString('playlist');
        const songName = interaction.options.getString('song');

        const playlist = await playlistCollection.findOne({ name: playlistName });
        if (!playlist) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.deletesong.embed.playlistNotFound, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.deletesong.embed.playlistNotFoundDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        await playlistCollection.updateOne({ name: playlistName }, { $pull: { songs: { name: songName } } });
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setAuthor({ 
                name: lang.deletesong.embed.songDeleted, 
                iconURL: musicIcons.correctIcon,
                url: config.SupportServer
            })
            .setDescription(lang.deletesong.embed.songDeletedDescription.replace("{songName}", songName).replace("{playlistName}", playlistName))
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error deleting song:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ 
                name: lang.deletesong.embed.error, 
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setTimestamp()
            .setDescription(lang.deletesong.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: 'deletesong',
    description: 'Delete a song from a playlist',
    permissions: '0x0000000000000800',
    options: [
        {
            name: 'playlist',
            description: 'Enter playlist name',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'song',
            description: 'Enter song name',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: deleteSong
};