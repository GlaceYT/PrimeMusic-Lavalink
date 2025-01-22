const { EmbedBuilder } = require('discord.js');
const { playlistCollection } = require('../mongodb.js');
const musicIcons = require('../UI/icons/musicicons.js');
const config = require('../config.js');

async function allPlaylists(client, interaction, lang) {
    try {
        const playlists = await playlistCollection.find({ isPrivate: false }).toArray();

        if (!playlists.length) {
            const noPlaylistsEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.allplaylists.embed.noPlaylistsFound, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.allplaylists.embed.noPlaylistsFoundDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setTimestamp();

            await interaction.reply({ embeds: [noPlaylistsEmbed] });
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
                    `   - ${lang.allplaylists.embed.createdBy.replace("{userId}", `<@${playlist.userId}>`)}\n` +
                    `   - ${lang.allplaylists.embed.serverName.replace("{serverName}", playlist.serverName)}\n` +
                    `   - ${lang.allplaylists.embed.songs.replace("{songCount}", playlist.songs.length)}`
                )
                .join('\n\n');

            return new EmbedBuilder()
                .setColor('#00ff00')
                .setAuthor({ 
                    name: lang.allplaylists.embed.publicPlaylistsTitle.replace("{currentPage}", index + 1).replace("{totalPages}", chunks.length), 
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
                name: lang.allplaylists.embed.error, 
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setTimestamp()
            .setDescription(lang.allplaylists.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: 'allplaylists',
    description: 'List all public playlists',
    permissions: '0x0000000000000800',
    run: allPlaylists
};