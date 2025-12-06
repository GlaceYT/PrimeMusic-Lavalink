const { SlashCommandBuilder } = require('discord.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("filters")
  .setDescription("Control audio filters")
  .addStringOption(option =>
    option.setName("filter")
      .setDescription("Select a filter to apply")
      .setRequired(true)
      .addChoices(
        { name: 'Karaoke', value: 'karaoke' },
        { name: 'Timescale', value: 'timescale' },
        { name: 'Tremolo', value: 'tremolo' },
        { name: 'Vibrato', value: 'vibrato' },
        { name: '3D', value: 'rotation' },
        { name: 'Distortion', value: 'distortion' },
        { name: 'Channel Mix', value: 'channelmix' },
        { name: 'Low Pass', value: 'lowpass' },
        { name: 'Bassboost', value: 'bassboost' },
        { name: 'Nightcore', value: 'nightcore' },
        { name: 'Daycore', value: 'daycore' },
        { name: 'Clear Filters', value: 'clear' }
      )
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.filters;

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

            const selectedFilter = interaction.options.getString('filter');

            if (selectedFilter === 'clear') {
                player.filters.clearFilters();
                
                return await sendSuccessResponse(
                    interaction,
                    t.cleared.title + '\n\n' +
                    t.cleared.message + '\n' +
                    t.cleared.note
                );
            }

            const filterNames = {
                'karaoke': 'Karaoke',
                'timescale': 'Timescale',
                'tremolo': 'Tremolo',
                'vibrato': 'Vibrato',
                'rotation': '3D Rotation',
                'distortion': 'Distortion',
                'channelmix': 'Channel Mix',
                'lowpass': 'Low Pass',
                'bassboost': 'Bassboost',
                'nightcore': 'Nightcore',
                'daycore': 'Daycore'
            };

            switch (selectedFilter) {
                case 'karaoke':
                    player.filters.setKaraoke(true);
                    break;
                case 'timescale':
                    player.filters.setTimescale(true, { speed: 1.2, pitch: 1.2 });
                    break;
                case 'tremolo':
                    player.filters.setTremolo(true, { frequency: 4, depth: 0.75 });
                    break;
                case 'vibrato':
                    player.filters.setVibrato(true, { frequency: 4, depth: 0.75 });
                    break;
                case 'rotation':
                    player.filters.setRotation(true, { rotationHz: 0.2 });
                    break;
                case 'distortion':
                    player.filters.setDistortion(true, { sinScale: 1, cosScale: 1 });
                    break;
                case 'channelmix':
                    player.filters.setChannelMix(true, { leftToLeft: 0.5, leftToRight: 0.5, rightToLeft: 0.5, rightToRight: 0.5 });
                    break;
                case 'lowpass':
                    player.filters.setLowPass(true, { smoothing: 0.5 });
                    break;
                case 'bassboost':
                    player.filters.setBassboost(true, { value: 3 });
                    break;
                case 'nightcore':
                    player.filters.setTimescale(true, { speed: 1.25, pitch: 1.25, rate: 1.0 });
                    break;
                case 'daycore':
                    player.filters.setTimescale(true, { speed: 1.0, pitch: 0.8, rate: 1.0 });
                    break;
                default:
                    return await sendErrorResponse(
                        interaction,
                        t.invalid.title + '\n\n' +
                        t.invalid.message + '\n' +
                        t.invalid.note
                    );
            }

            return await sendSuccessResponse(
                interaction,
                t.success.title + '\n\n' +
                t.success.filter.replace('{filter}', filterNames[selectedFilter]) + '\n\n' +
                t.success.message + '\n' +
                t.success.note
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { filters: { errors: {} } } }));
            const t = lang.music?.filters?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'filters',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while applying the filter.\nPlease try again later.')
            );
        }
    }
};
