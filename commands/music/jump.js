const { SlashCommandBuilder } = require('discord.js');
const { cleanupTrackMessages } = require('../../player.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkQueue } = require('../../utils/playerValidation.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("jump")
  .setDescription("Jump to a specific track in the queue")
  .addIntegerOption(option =>
    option.setName("position")
      .setDescription("Position of the track in queue (1-based)")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.jump;

            const player = client.riffy.players.get(interaction.guildId);
            const position = interaction.options.getInteger('position');
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

            if (position < 1 || position > player.queue.length) {
                return await sendErrorResponse(
                    interaction,
                    t.invalidPosition.title + '\n\n' +
                    t.invalidPosition.message.replace('{max}', player.queue.length) + '\n' +
                    t.invalidPosition.note
                        .replace('{count}', player.queue.length)
                        .replace('{plural}', player.queue.length > 1 ? 's' : '')
                );
            }

            const track = player.queue[position - 1];
            player.queue.remove(0, position - 1);
            
            await cleanupTrackMessages(client, player);
            
            player.stop();

            return await sendSuccessResponse(
                interaction,
                t.success.title + '\n\n' +
                t.success.track
                    .replace('{title}', track.info.title)
                    .replace('{uri}', track.info.uri) + '\n' +
                t.success.position.replace('{position}', position) + '\n\n' +
                t.success.message
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { jump: { errors: {} } } }));
            const t = lang.music?.jump?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'jump',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while jumping to the track.\nPlease try again later.')
            );
        }
    }
};
