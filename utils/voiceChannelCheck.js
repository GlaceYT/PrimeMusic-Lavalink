const { ContainerBuilder, MessageFlags } = require('discord.js');
const { getLang } = require('./languageLoader.js');

async function checkVoiceChannel(interaction, player) {

    const lang = await getLang(interaction.guildId).catch(() => {
     
        return require('../languages/en.js');
    });
    

    const utils = lang?.utils || {};
    const voiceCheck = utils?.voiceChannelCheck || {
        noVoiceChannel: {
            title: "## ❌ No Voice Channel",
            message: "You need to be in a voice channel to use this command.",
            note: "Please join a voice channel and try again."
        },
        wrongChannel: {
            title: "## 🎵 Join Voice Channel",
            message: "The bot is currently active in **{channelName}**.",
            note: "Please join **{channelName}** to use music commands."
        }
    };
    
    if (!interaction.member.voice.channelId) {
        const errorContainer = new ContainerBuilder()
            .setAccentColor(0xff0000)
            .addTextDisplayComponents(
                (textDisplay) => textDisplay.setContent(
                    `${voiceCheck.noVoiceChannel.title}\n\n` +
                    `${voiceCheck.noVoiceChannel.message}\n` +
                    `${voiceCheck.noVoiceChannel.note}`
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
                    `${voiceCheck.wrongChannel.title}\n\n` +
                    `${voiceCheck.wrongChannel.message.replace('{channelName}', channelName)}\n\n` +
                    `${voiceCheck.wrongChannel.note.replace('{channelName}', channelName)}`
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

