const { SlashCommandBuilder } = require('discord.js');
const { cleanupTrackMessages } = require('../../player.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkCurrentTrack } = require('../../utils/playerValidation.js');
const { sendErrorResponse, sendSuccessResponse, handleCommandError } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("voteskip")
  .setDescription("Vote to skip the current track");

const voteSkipMap = new Map();

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();

            const lang = await getLang(interaction.guildId);
            const t = lang.music.voteskip;

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

            const voiceChannel = interaction.member.voice.channel;
            const membersInChannel = voiceChannel.members.filter(m => !m.user.bot).size;
            const requiredVotes = Math.ceil(membersInChannel / 2);

            if (!voteSkipMap.has(interaction.guildId)) {
                voteSkipMap.set(interaction.guildId, {
                    voters: new Set(),
                    requiredVotes: requiredVotes,
                    trackUri: player.current.info.uri
                });
            }

            const voteData = voteSkipMap.get(interaction.guildId);

            if (voteData.trackUri !== player.current.info.uri) {
                voteSkipMap.set(interaction.guildId, {
                    voters: new Set(),
                    requiredVotes: requiredVotes,
                    trackUri: player.current.info.uri
                });
                voteData.voters = new Set();
                voteData.requiredVotes = requiredVotes;
                voteData.trackUri = player.current.info.uri;
            }

            if (voteData.voters.has(interaction.user.id)) {
                return await sendErrorResponse(
                    interaction,
                    t.alreadyVoted.title + '\n\n' +
                    t.alreadyVoted.message + '\n' +
                    t.alreadyVoted.votes
                        .replace('{current}', voteData.voters.size)
                        .replace('{required}', requiredVotes)
                );
            }

            voteData.voters.add(interaction.user.id);
            const currentVotes = voteData.voters.size;

            if (currentVotes >= requiredVotes) {
                await cleanupTrackMessages(client, player);
                
                player.stop();
                voteSkipMap.delete(interaction.guildId);

                return await sendSuccessResponse(
                    interaction,
                    t.skipped.title + '\n\n' +
                    t.skipped.message + '\n\n' +
                    t.skipped.votes
                        .replace('{current}', currentVotes)
                        .replace('{required}', requiredVotes) + '\n' +
                    t.skipped.required.replace('{required}', requiredVotes)
                );
            } else {
                return await sendSuccessResponse(
                    interaction,
                    t.success.title + '\n\n' +
                    t.success.message + '\n\n' +
                    t.success.currentVotes
                        .replace('{current}', currentVotes)
                        .replace('{required}', requiredVotes) + '\n' +
                    t.success.required.replace('{required}', requiredVotes) + '\n\n' +
                    t.success.moreNeeded
                        .replace('{count}', requiredVotes - currentVotes)
                        .replace('{plural}', requiredVotes - currentVotes > 1 ? 's' : '')
                );
            }

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { voteskip: { errors: {} } } }));
            const t = lang.music?.voteskip?.errors || {};
            
            return await handleCommandError(
                interaction,
                error,
                'voteskip',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while processing the vote.\nPlease try again later.')
            );
        }
    }
};
