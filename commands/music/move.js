const { SlashCommandBuilder } = require('discord.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkQueue } = require('../../utils/playerValidation.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("move")
  .setDescription("Move a track to a different position in the queue")
  .addIntegerOption(option =>
    option.setName("from")
      .setDescription("Current position of the track (1-based)")
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName("to")
      .setDescription("New position for the track (1-based)")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.move;

            const player = client.riffy.players.get(interaction.guildId);
            const from = interaction.options.getInteger('from');
            const to = interaction.options.getInteger('to');
            const check = await checkVoiceChannel(interaction, player);
            
            if (!check.allowed) {
                const reply = await interaction.editReply({
                    ...check.response,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            const queueCheck = await checkQueue(player, 
                t.queueEmpty.title + '\n\n' +
                t.queueEmpty.message + '\n' +
                t.queueEmpty.note,
                interaction.guildId
            );
            
            if (!queueCheck.valid) {
                const reply = await interaction.editReply({
                    ...queueCheck.response,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            if (from < 1 || from > player.queue.length || to < 1 || to > player.queue.length) {
                return await sendErrorResponse(
                    interaction,
                    t.invalidPosition.title + '\n\n' +
                    t.invalidPosition.message.replace('{max}', player.queue.length) + '\n' +
                    t.invalidPosition.note
                        .replace('{count}', player.queue.length)
                        .replace('{plural}', player.queue.length > 1 ? 's' : '')
                );
            }

            if (from === to) {
                return await sendErrorResponse(
                    interaction,
                    t.samePosition.title + '\n\n' +
                    t.samePosition.message + '\n' +
                    t.samePosition.note
                );
            }

            const track = player.queue[from - 1];
            const queueArray = [...player.queue];
            
            queueArray.splice(from - 1, 1);
            queueArray.splice(to - 1, 0, track);
            
            player.queue.clear();
            queueArray.forEach(t => player.queue.add(t));

            return await sendSuccessResponse(
                interaction,
                t.success.title + '\n\n' +
                t.success.track
                    .replace('{title}', track.info.title)
                    .replace('{uri}', track.info.uri) + '\n' +
                t.success.from.replace('{from}', from) + '\n' +
                t.success.to.replace('{to}', to) + '\n\n' +
                t.success.message
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { move: { errors: {} } } }));
            const t = lang.music?.move?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'move',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while moving the track.\nPlease try again later.')
            );
        }
    }
};
