const { SlashCommandBuilder } = require('discord.js');
const { playlistCollection } = require('../../mongodb.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader.js');

const data = new SlashCommandBuilder()
  .setName("deletesong")
  .setDescription("Delete a song from a playlist")
  .addStringOption(option =>
    option.setName("playlist")
      .setDescription("Enter playlist name")
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName("song")
      .setDescription("Enter song name")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
            const lang = await getLang(interaction.guildId);

            const playlistName = interaction.options.getString('playlist');
            const songName = interaction.options.getString('song');

            const playlist = await playlistCollection.findOne({ name: playlistName });
            if (!playlist) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.deletesong.notFound.title}\n\n` +
                    `${lang.playlist.deletesong.notFound.message.replace('{name}', playlistName)}\n` +
                    `${lang.playlist.deletesong.notFound.note}`,
                    5000
                );
            }

            await playlistCollection.updateOne({ name: playlistName }, { $pull: { songs: { name: songName } } });
            
            return sendSuccessResponse(
                interaction,
                `${lang.playlist.deletesong.success.title}\n\n` +
                `${lang.playlist.deletesong.success.song.replace('{song}', songName)}\n` +
                `${lang.playlist.deletesong.success.playlist.replace('{playlist}', playlistName)}\n\n` +
                `${lang.playlist.deletesong.success.message}`,
                '#00ff00',
                3000
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId);
            return handleCommandError(
                interaction,
                error,
                'deletesong',
                `${lang.playlist.deletesong.errors.title}\n\n` +
                `${lang.playlist.deletesong.errors.message}`
            );
        }
    }
};
