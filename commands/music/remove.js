const { SlashCommandBuilder } = require('discord.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkQueue } = require('../../utils/playerValidation.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("remove")
  .setDescription("Remove a song from the queue by its position")
  .addIntegerOption(option =>
    option.setName("position")
      .setDescription("Position of the song to remove from the queue")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.remove;

            const position = interaction.options.getInteger('position');
            const player = client.riffy.players.get(interaction.guildId);
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

            const removedTrack = player.queue[position - 1];
            player.queue.remove(position - 1, 1);

            return await sendSuccessResponse(
                interaction,
                t.success.title + '\n\n' +
                t.success.removed
                    .replace('{title}', removedTrack.info.title)
                    .replace('{uri}', removedTrack.info.uri) + '\n' +
                t.success.position.replace('{position}', position) + '\n\n' +
                t.success.message
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { remove: { errors: {} } } }));
            const t = lang.music?.remove?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'remove',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while removing the song.\nPlease try again later.')
            );
        }
    }
};
