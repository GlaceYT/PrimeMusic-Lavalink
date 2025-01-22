const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { playlistCollection } = require('../mongodb.js');
const config = require("../config.js");
const musicIcons = require('../UI/icons/musicicons.js');

async function showSongs(client, interaction, lang) {
    try {
        const playlistName = interaction.options.getString('playlist');
        const userId = interaction.user.id;

        const playlist = await playlistCollection.findOne({ name: playlistName });
        if (!playlist) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.showsongs.embed.error, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.showsongs.embed.playlistNotFound);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        if (playlist.isPrivate && playlist.userId !== userId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.showsongs.embed.accessDenied, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.showsongs.embed.noPermission);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const chunkSize = 10;
        const songChunks = [];
        for (let i = 0; i < playlist.songs.length; i += chunkSize) {
            songChunks.push(playlist.songs.slice(i, i + chunkSize));
        }

        if (songChunks.length === 0) {
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setAuthor({ 
                    name: lang.showsongs.embed.songsInPlaylist.replace("{playlistName}", playlistName), 
                    iconURL: musicIcons.playlistIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.showsongs.embed.noSongs);

            await interaction.reply({ embeds: [embed] });
            return;
        }

        for (const [index, chunk] of songChunks.entries()) {
            const description = chunk
                .map((song, i) => `${index * chunkSize + i + 1}. ${song.name || song.url}`)
                .join('\n');

            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setAuthor({ 
                    name: lang.showsongs.embed.songsInPlaylistPage.replace("{playlistName}", playlistName).replace("{currentPage}", index + 1).replace("{totalPages}", songChunks.length), 
                    iconURL: musicIcons.playlistIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(description);

            await interaction.reply({ embeds: [embed], ephemeral: index !== 0 }); 
        }
    } catch (error) {
        console.error('Error showing songs:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ 
                name: lang.showsongs.embed.error, 
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.showsongs.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: 'showsongs',
    description: 'Show all songs in a playlist',
    permissions: '0x0000000000000800',
    options: [
        {
            name: 'playlist',
            description: 'Enter playlist name',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: showSongs
};