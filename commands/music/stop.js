const { SlashCommandBuilder } = require('discord.js');
const { autoplayCollection } = require('../../mongodb.js');
const { cleanupTrackMessages } = require('../../player.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Stop the current song and destroy the player");

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.stop;

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

            const settings = await autoplayCollection.findOne({ guildId: interaction.guildId });
            const is24_7 = settings?.twentyfourseven;

            await cleanupTrackMessages(client, player);

            player.queue.clear();
            
            player.stop();
            
            if (!is24_7) {
                player.destroy();
            }

            return await sendSuccessResponse(
                interaction,
                t.success.title + '\n\n' +
                (is24_7 ? t.success.message24_7 : t.success.messageNormal) + '\n' +
                t.success.note
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { stop: { errors: {} } } }));
            const t = lang.music?.stop?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'stop',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while stopping the music.\nPlease try again later.')
            );
        }
    }
};
