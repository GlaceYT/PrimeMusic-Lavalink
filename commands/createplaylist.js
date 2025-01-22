const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { playlistCollection } = require('../mongodb.js');
const musicIcons = require('../UI/icons/musicicons.js');
const config = require('../config.js');

async function createPlaylist(client, interaction, lang) {
    try {
        const playlistName = interaction.options.getString('name');
        const isPrivate = interaction.options.getBoolean('private');
        const userId = interaction.user.id;
        const serverId = interaction.guild.id;
        const serverName = interaction.guild.name;

        const existingPlaylist = await playlistCollection.findOne({ 
            name: playlistName, 
            serverId: serverId,
            ...(isPrivate ? { userId: userId } : {}) 
        });

        if (existingPlaylist) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.createplaylist.embed.playlistExists, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setTimestamp()
                .setDescription(lang.createplaylist.embed.playlistExistsDescription);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        await playlistCollection.insertOne({ 
            name: playlistName, 
            songs: [], 
            isPrivate: isPrivate, 
            userId: userId, 
            serverId: serverId, 
            serverName: serverName 
        });

        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setAuthor({ 
                name: lang.createplaylist.embed.playlistCreated, 
                iconURL: musicIcons.correctIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setTimestamp()
            .setDescription(lang.createplaylist.embed.playlistCreatedDescription.replace("{playlistName}", playlistName).replace("{visibility}", isPrivate ? lang.createplaylist.embed.private : lang.createplaylist.embed.public));

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error creating playlist:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ 
                name: lang.createplaylist.embed.error, 
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setTimestamp()
            .setDescription(lang.createplaylist.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: 'createplaylist',
    description: 'Create a new playlist',
    permissions: '0x0000000000000800',
    options: [
        {
            name: 'name',
            description: 'Enter playlist name',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'private',
            description: 'Set playlist as private (visible only to you)',
            type: ApplicationCommandOptionType.Boolean,
            required: true
        }
    ],
    run: createPlaylist
};