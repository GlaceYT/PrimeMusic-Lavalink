const { SlashCommandBuilder } = require('discord.js');
const { cleanupTrackMessages } = require('../../player.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Skip the current song");

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.skip;

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

            await cleanupTrackMessages(client, player);
            
            player.stop();

            return await sendSuccessResponse(
                interaction,
                t.success.title + '\n\n' +
                t.success.message + '\n' +
                (player.queue.length > 0 ? t.success.nextSong : t.success.queueEmpty)
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { skip: { errors: {} } } }));
            const t = lang.music?.skip?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'skip',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while skipping the song.\nPlease try again later.')
            );
        }
    }
};
