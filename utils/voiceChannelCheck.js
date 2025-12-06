const { ContainerBuilder, MessageFlags } = require('discord.js');
const { getLang } = require('./languageLoader.js');

async function checkVoiceChannel(interaction, player) {
    const lang = getLang(interaction.guildId);
    
    if (!interaction.member.voice.channelId) {
        const errorContainer = new ContainerBuilder()
            .setAccentColor(0xff0000)
            .addTextDisplayComponents(
                (textDisplay) => textDisplay.setContent(
                    `${lang.utils.voiceChannelCheck.noVoiceChannel.title}\n\n` +
                    `${lang.utils.voiceChannelCheck.noVoiceChannel.message}\n` +
                    `${lang.utils.voiceChannelCheck.noVoiceChannel.note}`
                )
            );
        return {
            allowed: false,
            response: {
                components: [errorContainer],
                flags: MessageFlags.IsComponentsV2,
                ephemeral: true,
            }
        };
    }

    if (player && player.voiceChannel && interaction.member.voice.channelId !== player.voiceChannel) {
        const botChannel = interaction.guild.channels.cache.get(player.voiceChannel);
        const channelName = botChannel ? botChannel.name : 'the bot\'s voice channel';

        const errorContainer = new ContainerBuilder()
            .setAccentColor(0xff0000)
            .addTextDisplayComponents(
                (textDisplay) => textDisplay.setContent(
                    `${lang.utils.voiceChannelCheck.wrongChannel.title}\n\n` +
                    `${lang.utils.voiceChannelCheck.wrongChannel.message.replace('{channelName}', channelName)}\n\n` +
                    `${lang.utils.voiceChannelCheck.wrongChannel.note.replace('{channelName}', channelName)}`
                )
            );
        return {
            allowed: false,
            response: {
                components: [errorContainer],
                flags: MessageFlags.IsComponentsV2,
                ephemeral: true,
            }
        };
    }
    return { allowed: true };
}

module.exports = { checkVoiceChannel };

