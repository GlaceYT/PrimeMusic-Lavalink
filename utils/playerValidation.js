const { ContainerBuilder, MessageFlags } = require('discord.js');
const { getLang, getLangSync } = require('./languageLoader.js');

async function checkQueue(player, customMessage = null, guildId = null) {
    if (!player || !player.queue || player.queue.length === 0) {
        const lang = guildId ? await getLang(guildId) : getLangSync();
        const message = customMessage || 
            `${lang.utils?.playerValidation?.queueEmpty?.title || '## ❌ Queue Empty'}\n\n` +
            `${lang.utils?.playerValidation?.queueEmpty?.message || 'The queue is empty. There are no songs available.'}\n` +
            `${lang.utils?.playerValidation?.queueEmpty?.note || 'Add some songs to the queue first using `/play`.'}`;
        
        return {
            valid: false,
            response: {
                components: [
                    new ContainerBuilder()
                        .setAccentColor(0xff0000)
                        .addTextDisplayComponents(
                            (textDisplay) => textDisplay.setContent(message)
                        )
                ],
                flags: MessageFlags.IsComponentsV2,
            }
        };
    }
    
    return { valid: true };
}

async function checkCurrentTrack(player, customMessage = null, guildId = null) {
    if (!player || !player.current) {
        const lang = guildId ? await getLang(guildId) : getLangSync();
        const message = customMessage || 
            `${lang.utils?.playerValidation?.noSongPlaying?.title || '## ❌ No Song Playing'}\n\n` +
            `${lang.utils?.playerValidation?.noSongPlaying?.message || 'No song is currently playing.'}\n` +
            `${lang.utils?.playerValidation?.noSongPlaying?.note || 'Use `/play` to start playing music.'}`;
        
        return {
            valid: false,
            response: {
                components: [
                    new ContainerBuilder()
                        .setAccentColor(0xff0000)
                        .addTextDisplayComponents(
                            (textDisplay) => textDisplay.setContent(message)
                        )
                ],
                flags: MessageFlags.IsComponentsV2,
            }
        };
    }
    
    return { valid: true };
}

async function checkQueueOrTrack(player, customMessage = null, guildId = null) {
    if (!player || (!player.current && (!player.queue || player.queue.length === 0))) {
        const lang = guildId ? await getLang(guildId) : getLangSync();
        const message = customMessage || 
            `${lang.utils?.playerValidation?.noMusicPlaying?.title || '## ❌ No Music Playing'}\n\n` +
            `${lang.utils?.playerValidation?.noMusicPlaying?.message || 'There is no music currently playing and the queue is empty.'}\n` +
            `${lang.utils?.playerValidation?.noMusicPlaying?.note || 'Use `/play` to start playing music.'}`;
        
        return {
            valid: false,
            response: {
                components: [
                    new ContainerBuilder()
                        .setAccentColor(0xff0000)
                        .addTextDisplayComponents(
                            (textDisplay) => textDisplay.setContent(message)
                        )
                ],
                flags: MessageFlags.IsComponentsV2,
            }
        };
    }
    
    return { valid: true };
}

module.exports = {
    checkQueue,
    checkCurrentTrack,
    checkQueueOrTrack
};

