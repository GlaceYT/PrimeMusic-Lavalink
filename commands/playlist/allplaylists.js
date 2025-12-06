const { SlashCommandBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, SectionBuilder, MessageFlags } = require('discord.js');
const { playlistCollection } = require('../../mongodb.js');
const musicIcons = require('../../UI/icons/musicicons.js');
const { sendErrorResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader.js');

const data = new SlashCommandBuilder()
  .setName("allplaylists")
  .setDescription("List all public playlists");

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
            const lang = await getLang(interaction.guildId);

            const playlists = await playlistCollection.find({ isPrivate: false }).toArray();

            if (!playlists.length) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.allplaylists.noPlaylists.title}\n\n` +
                    `${lang.playlist.allplaylists.noPlaylists.message}\n` +
                    `${lang.playlist.allplaylists.noPlaylists.note}`,
                    5000
                );
            }

            const chunkSize = 10;
            const chunks = [];
            for (let i = 0; i < playlists.length; i += chunkSize) {
                chunks.push(playlists.slice(i, i + chunkSize));
            }

            const embedColor = parseInt('#00ff00'.replace('#', ''), 16);
            const components = [];

            for (const [index, chunk] of chunks.entries()) {
                const playlistList = chunk
                    .map((playlist, idx) => 
                        lang.playlist.allplaylists.playlistItem
                            .replace('{number}', index * chunkSize + idx + 1)
                            .replace('{name}', playlist.name)
                            .replace('{creator}', `<@${playlist.userId}>`)
                            .replace('{server}', playlist.serverName)
                            .replace('{count}', playlist.songs.length)
                    )
                    .join('\n\n');

                const playlistSection = new SectionBuilder()
                    .addTextDisplayComponents(
                        (textDisplay) => textDisplay.setContent(
                            lang.playlist.allplaylists.title
                                .replace('{currentPage}', index + 1)
                                .replace('{totalPages}', chunks.length) + '\n\n' +
                            playlistList
                        )
                    )
                    .setThumbnailAccessory(
                        (thumbnail) => thumbnail.setURL(musicIcons.playlistIcon)
                    );

                const playlistContainer = new ContainerBuilder()
                    .setAccentColor(embedColor)
                    .addSectionComponents(playlistSection);
                components.push(playlistContainer);
                
                if (index < chunks.length - 1) {
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
                'allplaylists',
                `${lang.playlist.allplaylists.errors.title}\n\n` +
                `${lang.playlist.allplaylists.errors.message}`
            );
        }
    }
};
