const { ContainerBuilder, MessageFlags } = require('discord.js');
const { getLang, getLangSync } = require('./languageLoader.js');

async function checkQueue(player, customMessage = null, guildId = null) {
    if (!player || !player.queue || player.queue.length === 0) {
        let lang;
        try {
            lang = guildId ? await getLang(guildId) : getLangSync();
        } catch (error) {
            lang = getLangSync();
        }
        
      
        const utils = lang?.utils || {};
        const validation = utils?.playerValidation || {
            queueEmpty: {
                title: '## ❌ Queue Empty',
                message: 'The queue is empty. There are no songs available.',
                note: 'Add some songs to the queue first using `/play`.'
            }
        };
        
        const message = customMessage || 
            `${validation.queueEmpty?.title || '## ❌ Queue Empty'}\n\n` +
            `${validation.queueEmpty?.message || 'The queue is empty. There are no songs available.'}\n` +
            `${validation.queueEmpty?.note || 'Add some songs to the queue first using `/play`.'}`;
        
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
        let lang;
        try {
            lang = guildId ? await getLang(guildId) : getLangSync();
        } catch (error) {
            lang = getLangSync(); // Fallback to sync version
        }
       
        const utils = lang?.utils || {};
        const validation = utils?.playerValidation || {
            noSongPlaying: {
                title: '## ❌ No Song Playing',
                message: 'No song is currently playing.',
                note: 'Use `/play` to start playing music.'
            }
        };
        
        const message = customMessage || 
            `${validation.noSongPlaying?.title || '## ❌ No Song Playing'}\n\n` +
            `${validation.noSongPlaying?.message || 'No song is currently playing.'}\n` +
            `${validation.noSongPlaying?.note || 'Use `/play` to start playing music.'}`;
        
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
        let lang;
        try {
            lang = guildId ? await getLang(guildId) : getLangSync();
        } catch (error) {
            lang = getLangSync(); 
        }
        
        
        const utils = lang?.utils || {};
        const validation = utils?.playerValidation || {
            noMusicPlaying: {
                title: '## ❌ No Music Playing',
                message: 'There is no music currently playing and the queue is empty.',
                note: 'Use `/play` to start playing music.'
            }
        };
        
        const message = customMessage || 
            `${validation.noMusicPlaying?.title || '## ❌ No Music Playing'}\n\n` +
            `${validation.noMusicPlaying?.message || 'There is no music currently playing and the queue is empty.'}\n` +
            `${validation.noMusicPlaying?.note || 'Use `/play` to start playing music.'}`;
        
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

