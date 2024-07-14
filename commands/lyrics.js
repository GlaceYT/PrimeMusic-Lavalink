const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const fetch = require('node-fetch');
const config = require("../config.js");

async function lyrics(client, interaction) {
    try {
        await interaction.deferReply();

        const player = client.riffy.players.get(interaction.guildId);
        const value = interaction.options.getString('search');

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ No active player found.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }
        
        const currentSong = player.current.info;
        const titles = currentSong.title.replace(/\(Official (Video|Audio|Music Video)\)/gi, "").trim();
        const authors = currentSong.author.replace(/- Topic$/gi, "").trim();

        const lyricEmbed = new EmbedBuilder().setColor(config.embedColor);

        let lyricSong = null;
        let lyricUrl = null;
        let lyricThumbnail = null;
        let lyricAuthor = null;
        let lyricTitle = null;

        try {
            if (value) {
                await fetch(`https://weeb-api.vercel.app/genius?query=${encodeURIComponent(value)}`)
                    .then((res) => res.json())
                    .then(async (data) => {
                        if (data && data.length > 0) {
                            const url = data[0].url;
                            const thumbnail = data[0].image;
                            const author = data[0].artist;
                            const title = data[0].title;

                            await fetch(`https://weeb-api.vercel.app/lyrics?url=${url}`)
                                .then((res) => res.json())
                                .then((lyrics) => {
                                    lyricSong = lyrics;
                                });

                            lyricUrl = url;
                            lyricThumbnail = thumbnail;
                            lyricAuthor = author;
                            lyricTitle = title;
                        }
                    });
            } else {
                await fetch(`https://weeb-api.vercel.app/genius?query=${encodeURIComponent(titles + ' ' + authors)}`)
                    .then((res) => res.json())
                    .then(async (data) => {
                        if (data && data.length > 0) {
                            const url = data[0].url;
                            const thumbnail = data[0].image;
                            const author = data[0].artist;
                            const title = data[0].title;

                            await fetch(`https://weeb-api.vercel.app/lyrics?url=${url}`)
                                .then((res) => res.json())
                                .then((lyrics) => {
                                    lyricSong = lyrics;
                                });

                            lyricUrl = url;
                            lyricThumbnail = thumbnail;
                            lyricAuthor = author;
                            lyricTitle = title;
                        }
                    });
            }
        } catch (err) {
            lyricEmbed.setDescription(`❌ No lyrics were found!`);
            return interaction.editReply({ embeds: [lyricEmbed], ephemeral: true });
        }

        if (!lyricSong) {
            lyricEmbed.setDescription(`❌ No lyrics were found!`);
            return interaction.editReply({ embeds: [lyricEmbed], ephemeral: true });
        }

        const lyricsArray = lyricSong.match(/[\s\S]{1,2000}/g);
        let currentPage = 0;

        const generateEmbed = (page) => {
            return new EmbedBuilder()
                .setTitle(`${lyricTitle} by ${lyricAuthor} Lyrics`)
                .setDescription(lyricsArray[page])
                .setColor(config.embedColor)
                .setThumbnail(lyricThumbnail)
                .setFooter({ text: `Page ${page + 1} of ${lyricsArray.length} | Requested by ${interaction.user.tag}` })
                .setTimestamp();
        };

        const createActionRow = (currentPage, totalPages) => {
            return new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('prev')
                        .setLabel('Previous')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("◀️")
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Next')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("▶️")
                        .setDisabled(currentPage === totalPages - 1)
                );
        };

        const message = await interaction.editReply({
            embeds: [generateEmbed(currentPage)],
            components: [createActionRow(currentPage, lyricsArray.length)]
        });

        const filter = (i) => i.customId === 'prev' || i.customId === 'next';
        const collector = message.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 300000 });

        collector.on('collect', async (i) => {
            if (i.customId === 'prev' && currentPage > 0) {
                currentPage--;
            } else if (i.customId === 'next' && currentPage < lyricsArray.length - 1) {
                currentPage++;
            }

            await i.update({
                embeds: [generateEmbed(currentPage)],
                components: [createActionRow(currentPage, lyricsArray.length)]
            });
        });

        collector.on('end', async () => {
            await message.edit({ components: [createActionRow(currentPage, lyricsArray.length).setComponents(
                new ButtonBuilder()
                    .setCustomId('prev')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("◀️")
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("▶️")
                    .setDisabled(true)
            )] });
        });

    } catch (error) {
        console.error('Error fetching lyrics:', error);
        await interaction.editReply({ content: 'An error occurred while fetching the lyrics.', ephemeral: true });
    }
}

module.exports = {
    name: "lyrics",
    description: "Displays the lyrics of the current song",
    permissions: "0x0000000000000800",
    options: [{
        name: 'search',
        description: 'Search query for lyrics',
        type: ApplicationCommandOptionType.String,
        required: false
    }],
    run: lyrics
};
