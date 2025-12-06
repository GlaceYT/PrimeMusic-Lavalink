const { SlashCommandBuilder } = require('discord.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkQueue } = require('../../utils/playerValidation.js');
const { sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("shuffle")
  .setDescription("Shuffle the current song queue");

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.shuffle;

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

            for (let i = player.queue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [player.queue[i], player.queue[j]] = [player.queue[j], player.queue[i]];
            }

            return await sendSuccessResponse(
                interaction,
                t.success.title + '\n\n' +
                t.success.message + '\n\n' +
                t.success.count
                    .replace('{count}', player.queue.length)
                    .replace('{plural}', player.queue.length > 1 ? 's' : '')
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { shuffle: { errors: {} } } }));
            const t = lang.music?.shuffle?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'shuffle',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while shuffling the queue.\nPlease try again later.')
            );
        }
    }
};
