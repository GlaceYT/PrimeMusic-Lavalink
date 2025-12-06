const { SlashCommandBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, SectionBuilder, MessageFlags } = require('discord.js');
const { playlistCollection } = require('../../mongodb.js');
const musicIcons = require('../../UI/icons/musicicons.js');
const { sendErrorResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader.js');

const data = new SlashCommandBuilder()
  .setName("showsongs")
  .setDescription("Show all songs in a playlist")
  .addStringOption(option =>
    option.setName("playlist")
      .setDescription("Enter playlist name")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
            const lang = await getLang(interaction.guildId);

            const playlistName = interaction.options.getString('playlist');
            const userId = interaction.user.id;

            const playlist = await playlistCollection.findOne({ name: playlistName });
            if (!playlist) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.showsongs.notFound.title}\n\n` +
                    `${lang.playlist.showsongs.notFound.message.replace('{name}', playlistName)}\n` +
                    `${lang.playlist.showsongs.notFound.note}`,
                    5000
                );
            }

            if (playlist.isPrivate && playlist.userId !== userId) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.showsongs.accessDenied.title}\n\n` +
                    `${lang.playlist.showsongs.accessDenied.message}\n` +
                    `${lang.playlist.showsongs.accessDenied.note}`,
                    5000
                );
            }

            const chunkSize = 10;
            const songChunks = [];
            for (let i = 0; i < playlist.songs.length; i += chunkSize) {
                songChunks.push(playlist.songs.slice(i, i + chunkSize));
            }

            if (songChunks.length === 0) {
                const emptySection = new SectionBuilder()
                    .addTextDisplayComponents(
                        (textDisplay) => textDisplay.setContent(
                            lang.playlist.showsongs.empty.title.replace('{name}', playlistName) + '\n\n' +
                            lang.playlist.showsongs.empty.message
                        )
                    )
                    .setThumbnailAccessory(
                        (thumbnail) => thumbnail.setURL(musicIcons.playlistIcon)
                    );

                const emptyContainer = new ContainerBuilder()
                    .setAccentColor(parseInt('#00ff00'.replace('#', ''), 16))
                    .addSectionComponents(emptySection);

                const reply = await interaction.editReply({
                    components: [emptyContainer],
                    flags: MessageFlags.IsComponentsV2,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 30000);
                return reply;
            }

            const embedColor = parseInt('#00ff00'.replace('#', ''), 16);
            const components = [];

            for (const [index, chunk] of songChunks.entries()) {
                const songList = chunk
                    .map((song, i) => `${index * chunkSize + i + 1}. ${song.name || song.url}`)
                    .join('\n');

                const songSection = new SectionBuilder()
                    .addTextDisplayComponents(
                        (textDisplay) => textDisplay.setContent(
                            lang.playlist.showsongs.title
                                .replace('{name}', playlistName)
                                .replace('{currentPage}', index + 1)
                                .replace('{totalPages}', songChunks.length) + '\n\n' +
                            songList
                        )
                    )
                    .setThumbnailAccessory(
                        (thumbnail) => thumbnail.setURL(musicIcons.playlistIcon)
                    );

                const songContainer = new ContainerBuilder()
                    .setAccentColor(embedColor)
                    .addSectionComponents(songSection);
                components.push(songContainer);
                
                if (index < songChunks.length - 1) {
                    components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));
                }
            }

            const reply = await interaction.editReply({
                components: components,
                flags: MessageFlags.IsComponentsV2,
                fetchReply: true
            });
            setTimeout(() => reply.delete().catch(() => {}), 30000);
            return reply;

        } catch (error) {
            const lang = await getLang(interaction.guildId);
            return handleCommandError(
                interaction,
                error,
                'showsongs',
                `${lang.playlist.showsongs.errors.title}\n\n` +
                `${lang.playlist.showsongs.errors.message}`
            );
        }
    }
};
