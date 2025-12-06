const { ActivityType } = require('discord.js');

class StatusManager {
    constructor(client) {
        this.client = client;
        this.currentInterval = null;
        this.isPlaying = false;
        this.voiceChannelData = new Map(); 
    }

    getPlayerInfo(guildId) {
        const player = this.client.riffy?.players?.get(guildId);
        if (!player) return null;
        
        return {
            playing: player.playing,
            title: player.current?.info?.title || null
        };
    }

    async updateStatusAndVoice(guildId) {
        try {
            const playerInfo = this.getPlayerInfo(guildId);
            
            if (playerInfo && playerInfo.playing && playerInfo.title) {
                await this.setPlayingStatus(playerInfo.title);
                await this.setVoiceChannelStatus(guildId, playerInfo.title);
            } else {
                await this.setDefaultStatus();
                await this.clearVoiceChannelStatus(guildId);
            }
        } catch (error) {
            console.error('❌ Error updating status and voice channel:', error);
        }
    }

    async setPlayingStatus(trackTitle) {
        this.stopCurrentStatus();
        this.isPlaying = true;
        
        const activity = `🎵 ${trackTitle}`;
     
        await this.client.user.setPresence({
            activities: [{
                name: activity,
                type: ActivityType.Listening
            }],
            status: 'online'
        });
        
        this.currentInterval = setInterval(async () => {
            if (this.isPlaying) {
                await this.client.user.setPresence({
                    activities: [{
                        name: activity,
                        type: ActivityType.Listening
                    }],
                    status: 'online'
                });
            }
        }, 30000);
    }

    async setVoiceChannelStatus(guildId, trackTitle) {
        try {
            const player = this.client.riffy?.players?.get(guildId);
            if (!player || !player.voiceChannel) return;

            const guild = this.client.guilds.cache.get(guildId);
            if (!guild) return;

            const voiceChannel = guild.channels.cache.get(player.voiceChannel);
            if (!voiceChannel) return;
        
            if (!this.voiceChannelData.has(voiceChannel.id)) {
                this.voiceChannelData.set(voiceChannel.id, {
                    originalName: voiceChannel.name,
                    originalTopic: voiceChannel.topic
                });
            }
    
            const botMember = guild.members.me;
            const permissions = voiceChannel.permissionsFor(botMember);
            
            if (!permissions?.has('ManageChannels')) {
                return;
            }

            const statusText = `🎵 ${trackTitle}`;
        
            let success = await this.createVoiceStatusAPI(voiceChannel.id, statusText);
            if (success) return;
            success = await this.createChannelTopic(voiceChannel, trackTitle);
            if (success) return;
            await this.createChannelName(voiceChannel, trackTitle);
        } catch (error) {
            console.error(`❌ Voice channel status creation failed: ${error.message}`);
        }
    }

    async clearVoiceChannelStatus(guildId) {
        try {
            const guild = this.client.guilds.cache.get(guildId);
            if (!guild) return;
       
            const botMember = guild.members.me;
            let voiceChannel = null;
    
            const player = this.client.riffy?.players?.get(guildId);
            if (player && player.voiceChannel) {
                voiceChannel = guild.channels.cache.get(player.voiceChannel);
            }
   
            if (!voiceChannel && botMember.voice.channelId) {
                voiceChannel = guild.channels.cache.get(botMember.voice.channelId);
            }
 
            if (!voiceChannel) {
                for (const channel of guild.channels.cache.values()) {
                    if (channel.type === 2 && this.voiceChannelData.has(channel.id)) {
                        voiceChannel = channel;
                        break;
                    }
                }
            }

            if (!voiceChannel) return;
    
            const permissions = voiceChannel.permissionsFor(botMember);
            if (!permissions?.has('ManageChannels')) {
                return;
            }
        
            let success = await this.deleteVoiceStatusAPI(voiceChannel.id);
            if (success) return;
            success = await this.deleteChannelTopic(voiceChannel);
            if (success) return;
            await this.deleteChannelName(voiceChannel);
        } catch (error) {
            console.error(`❌ Voice channel status clearing failed: ${error.message}`);
        }
    }
   
    async createVoiceStatusAPI(channelId, statusText) {
        try {
            await this.client.rest.put(`/channels/${channelId}/voice-status`, {
                body: { status: statusText }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async deleteVoiceStatusAPI(channelId) {
        try {
            await this.client.rest.put(`/channels/${channelId}/voice-status`, {
                body: { status: null }
            });
            return true;
        } catch (error) {
            try {
                await this.client.rest.delete(`/channels/${channelId}/voice-status`);
                return true;
            } catch (deleteError) {
                return false;
            }
        }
    }

    async createChannelTopic(voiceChannel, trackTitle) {
        try {
            const topicText = `🎵 Now Playing: ${trackTitle}`;
            await voiceChannel.setTopic(topicText);
            return true;
        } catch (error) {
            return false;
        }
    }

    async deleteChannelTopic(voiceChannel) {
        try {
            const originalData = this.voiceChannelData.get(voiceChannel.id);
            const originalTopic = originalData?.originalTopic || null;
            
            await voiceChannel.setTopic(originalTopic);
            return true;
        } catch (error) {
            return false;
        }
    }

    async createChannelName(voiceChannel, trackTitle) {
        try {
            const originalData = this.voiceChannelData.get(voiceChannel.id);
            const baseName = originalData?.originalName || voiceChannel.name.replace(/🎵.*$/, '').trim();
            
            const shortTitle = trackTitle.length > 15 
                ? trackTitle.substring(0, 15) + '...' 
                : trackTitle;
            const newName = `🎵 ${baseName}`;

            if (newName !== voiceChannel.name && newName.length <= 100) {
                await voiceChannel.setName(newName);
            }
            return true;
        } catch (error) {
            return false;
        }
    }
   
    async deleteChannelName(voiceChannel) {
        try {
            const originalData = this.voiceChannelData.get(voiceChannel.id);
            const originalName = originalData?.originalName;
            
            if (originalName && originalName !== voiceChannel.name) {
                await voiceChannel.setName(originalName);
                this.voiceChannelData.delete(voiceChannel.id);
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    async setDefaultStatus() {
        this.stopCurrentStatus();
        this.isPlaying = false;
        
        const config = require('../config');
        const defaultActivity = {
            name: config.activityName || '🎵 Ready for music!',
            type: ActivityType[config.activityType?.toUpperCase()] || ActivityType.Watching
        };
        
        await this.client.user.setPresence({
            activities: [defaultActivity],
            status: 'online'
        });
    }
  
    stopCurrentStatus() {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = null;
        }
    }

    async onTrackStart(guildId) {
        await this.updateStatusAndVoice(guildId);
    }
 
    async onTrackEnd(guildId) {
        setTimeout(async () => {
            await this.updateStatusAndVoice(guildId);
        }, 1000);
    }

    async onPlayerDisconnect(guildId = null) {
        await this.setDefaultStatus();
        
        if (guildId) {
            await this.clearVoiceChannelStatus(guildId);
        } else {
            for (const guild of this.client.guilds.cache.values()) {
                await this.clearVoiceChannelStatus(guild.id);
            }
        }
    }
}

module.exports = StatusManager;

