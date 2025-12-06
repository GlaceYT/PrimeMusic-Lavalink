const { SlashCommandBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MessageFlags } = require('discord.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkCurrentTrack } = require('../../utils/playerValidation.js');
const { getEmbedColor, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("trackinfo")
  .setDescription("Show detailed information about the current track");

function formatDuration(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return [
        hours > 0 ? `${hours}h` : null,
        minutes > 0 ? `${minutes}m` : null,
        `${seconds}s`,
    ]
        .filter(Boolean)
        .join(' ');
}

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.trackinfo;

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

            const track = player.current.info;
            const position = player.position;
            const duration = track.length;
            const progress = Math.round((position / duration) * 100);

            const embedColor = getEmbedColor();
            const components = [];

            const trackInfoContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.trackInfo.title + '\n\n' +
                        t.trackInfo.titleLabel
                            .replace('{title}', track.title)
                            .replace('{uri}', track.uri) + '\n' +
                        t.trackInfo.artist.replace('{artist}', track.author || 'Unknown') + '\n' +
                        t.trackInfo.duration.replace('{duration}', formatDuration(duration)) + '\n' +
                        t.trackInfo.source.replace('{source}', track.sourceName || 'Unknown')
                    )
                );

            components.push(trackInfoContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));

            const progressContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.progress.title + '\n\n' +
                        t.progress.current.replace('{current}', formatDuration(position)) + '\n' +
                        t.progress.total.replace('{total}', formatDuration(duration)) + '\n' +
                        t.progress.progress.replace('{progress}', progress)
                    )
                );

            components.push(progressContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));

            const loopText = player.loop === 'none' ? 'Off' : player.loop === 'track' ? 'Track' : 'Queue';
            const statusText = player.paused ? '⏸️ Paused' : '▶️ Playing';

            const statusContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.status.title + '\n\n' +
                        t.status.volume.replace('{volume}', player.volume) + '\n' +
                        t.status.loop.replace('{loop}', loopText) + '\n' +
                        t.status.status.replace('{status}', statusText) + '\n' +
                        t.status.queue
                            .replace('{count}', player.queue.length)
                            .replace('{plural}', player.queue.length !== 1 ? 's' : '')
                    )
                );

            components.push(statusContainer);

            const reply = await interaction.editReply({
                components: components,
                flags: MessageFlags.IsComponentsV2,
                fetchReply: true
            });
            setTimeout(() => reply.delete().catch(() => {}), 3000);
            return reply;

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { trackinfo: { errors: {} } } }));
            const t = lang.music?.trackinfo?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'trackinfo',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while retrieving track information.\nPlease try again later.')
            );
        }
    }
};
