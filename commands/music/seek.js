const { SlashCommandBuilder } = require('discord.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkCurrentTrack } = require('../../utils/playerValidation.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("seek")
  .setDescription("Seek to a specific time in the current track")
  .addStringOption(option =>
    option.setName("time")
      .setDescription("Time to seek to (MM:SS, HH:MM:SS, or seconds)")
      .setRequired(true)
  );

function parseTime(timeString) {
    const parts = timeString.split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0]);
        const seconds = parseInt(parts[1]);
        if (!isNaN(minutes) && !isNaN(seconds)) {
            return (minutes * 60 + seconds) * 1000;
        }
    } else if (parts.length === 3) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parseInt(parts[2]);
        if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
            return (hours * 3600 + minutes * 60 + seconds) * 1000;
        }
    }
    const seconds = parseInt(timeString);
    if (!isNaN(seconds)) {
        return seconds * 1000;
    }
    return null;
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.seek;

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

            const trackCheck = await checkCurrentTrack(player, null, interaction.guildId);
            
            if (!trackCheck.valid) {
                const reply = await interaction.editReply({
                    ...trackCheck.response,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            const timeInput = interaction.options.getString('time');
            const trackLength = player.current.info.length;
            const seekTime = parseTime(timeInput);

            if (seekTime === null || seekTime < 0 || seekTime > trackLength) {
                return await sendErrorResponse(
                    interaction,
                    t.invalidTime.title + '\n\n' +
                    t.invalidTime.message + '\n' +
                    t.invalidTime.formats + '\n\n' +
                    t.invalidTime.trackLength.replace('{length}', formatTime(trackLength))
                );
            }

            player.seek(seekTime);

            return await sendSuccessResponse(
                interaction,
                t.success.title + '\n\n' +
                t.success.time.replace('{time}', formatTime(seekTime)) + '\n' +
                t.success.track
                    .replace('{title}', player.current.info.title)
                    .replace('{uri}', player.current.info.uri) + '\n\n' +
                t.success.message
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { seek: { errors: {} } } }));
            const t = lang.music?.seek?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'seek',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while seeking.\nPlease try again later.')
            );
        }
    }
};
