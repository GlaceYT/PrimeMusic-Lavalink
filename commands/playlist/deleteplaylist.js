const { SlashCommandBuilder } = require('discord.js');
const { playlistCollection } = require('../../mongodb.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader.js');

const data = new SlashCommandBuilder()
  .setName("deleteplaylist")
  .setDescription("Delete a playlist")
  .addStringOption(option =>
    option.setName("name")
      .setDescription("Enter playlist name")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
            const lang = await getLang(interaction.guildId);

            const playlistName = interaction.options.getString('name');
            const userId = interaction.user.id;

            const playlist = await playlistCollection.findOne({ name: playlistName });
            if (!playlist) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.deleteplaylist.notFound.title}\n\n` +
                    `${lang.playlist.deleteplaylist.notFound.message.replace('{name}', playlistName)}\n` +
                    `${lang.playlist.deleteplaylist.notFound.note}`,
                    5000
                );
            }

            if (playlist.userId !== userId) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.deleteplaylist.accessDenied.title}\n\n` +
                    `${lang.playlist.deleteplaylist.accessDenied.message}\n` +
                    `${lang.playlist.deleteplaylist.accessDenied.note}`,
                    5000
                );
            }

            const result = await playlistCollection.deleteOne({ name: playlistName, userId: userId });
            if (result.deletedCount === 0) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.deleteplaylist.notFound.title}\n\n` +
                    `${lang.playlist.deleteplaylist.notFound.message.replace('{name}', playlistName)}\n` +
                    `${lang.playlist.deleteplaylist.notFound.note}`,
                    5000
                );
            }

            return sendSuccessResponse(
                interaction,
                `${lang.playlist.deleteplaylist.success.title}\n\n` +
                `${lang.playlist.deleteplaylist.success.message.replace('{name}', playlistName)}`,
                '#00ff00',
                3000
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId);
            return handleCommandError(
                interaction,
                error,
                'deleteplaylist',
                `${lang.playlist.deleteplaylist.errors.title}\n\n` +
                `${lang.playlist.deleteplaylist.errors.message}`
            );
        }
    }
};
