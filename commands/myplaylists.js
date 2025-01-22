const { EmbedBuilder } = require('discord.js');
const { playlistCollection } = require('../mongodb.js');
const musicIcons = require('../UI/icons/musicicons.js');
const config = require('../config.js');

async function myPlaylists(client, interaction, lang) {
    try {
        const userId = interaction.user.id;

        const playlists = await playlistCollection.find({ userId: userId }).toArray();

        if (!playlists.length) {
            const noPlaylistsEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.myplaylists.embed.noPlaylistsFound, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.myplaylists.embed.noPlaylistsFoundDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setTimestamp();

            await interaction.reply({ embeds: [noPlaylistsEmbed], ephemeral: true });
            return;
        }

        const chunkSize = 10;
        const chunks = [];
        for (let i = 0; i < playlists.length; i += chunkSize) {
            chunks.push(playlists.slice(i, i + chunkSize));
        }

        const embeds = chunks.map((chunk, index) => {
            const description = chunk
                .map((playlist, idx) => 
                    `**${index * chunkSize + idx + 1}.** **${playlist.name}**\n` +
                    `   - ${lang.myplaylists.embed.visibility}: **${playlist.isPrivate ? lang.myplaylists.embed.private : lang.myplaylists.embed.public}**\n` +
                    `   - ${lang.myplaylists.embed.server}: ${playlist.serverName}\n` +
                    `   - ${lang.myplaylists.embed.songs}: **${playlist.songs.length}**`
                )
                .join('\n\n');

            return new EmbedBuilder()
                .setColor('#00ff00')
                .setAuthor({ 
                    name: lang.myplaylists.embed.yourPlaylistsTitle.replace("{currentPage}", index + 1).replace("{totalPages}", chunks.length), 
                    iconURL: musicIcons.playlistIcon,
                    url: config.SupportServer
                })
                .setDescription(description)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setTimestamp();
        });

        for (const embed of embeds) {
            await interaction.reply({ embeds: [embed] });
        }
    } catch (error) {
        console.error('Error fetching playlists:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ 
                name: lang.myplaylists.embed.error, 
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setTimestamp()
            .setDescription(lang.myplaylists.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: 'myplaylists',
    description: 'List all playlists you have created',
    permissions: '0x0000000000000800',
    run: myPlaylists
};