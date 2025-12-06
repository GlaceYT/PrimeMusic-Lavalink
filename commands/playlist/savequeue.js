const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.js');
const { playlistCollection } = require('../../mongodb.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader.js');

const data = new SlashCommandBuilder()
  .setName("savequeue")
  .setDescription("Save the current queue as a playlist")
  .addStringOption(option =>
    option.setName("name")
      .setDescription("Name for the playlist")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
            const lang = await getLang(interaction.guildId);

            const player = client.riffy.players.get(interaction.guildId);
            const playlistName = interaction.options.getString('name');

            if (!player || player.queue.length === 0) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.savequeue.queueEmpty.title}\n\n` +
                    `${lang.playlist.savequeue.queueEmpty.message}\n` +
                    `${lang.playlist.savequeue.queueEmpty.note}`,
                    5000
                );
            }

            const guildId = interaction.guildId;
            const userId = interaction.user.id;

            const existingPlaylist = await playlistCollection.findOne({
                guildId,
                userId,
                name: playlistName
            });

            if (existingPlaylist) {
                return sendErrorResponse(
                    interaction,
                    `${lang.playlist.savequeue.alreadyExists.title}\n\n` +
                    `${lang.playlist.savequeue.alreadyExists.message.replace('{name}', playlistName)}\n` +
                    `${lang.playlist.savequeue.alreadyExists.note}`,
                    5000
                );
            }

            const songs = [];
            if (player.current) {
                songs.push(player.current.info.uri);
            }
            player.queue.forEach(track => {
                songs.push(track.info.uri);
            });

            await playlistCollection.insertOne({
                guildId,
                userId,
                name: playlistName,
                songs: songs,
                visibility: 'private',
                createdAt: new Date()
            });

            return sendSuccessResponse(
                interaction,
                `${lang.playlist.savequeue.success.title}\n\n` +
                `${lang.playlist.savequeue.success.message.replace('{name}', playlistName)}\n\n` +
                `${lang.playlist.savequeue.success.tracks.replace('{count}', songs.length)}`,
                config.embedColor,
                3000
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId);
            return handleCommandError(
                interaction,
                error,
                'savequeue',
                `${lang.playlist.savequeue.errors.title}\n\n` +
                `${lang.playlist.savequeue.errors.message}`
            );
        }
    }
};
