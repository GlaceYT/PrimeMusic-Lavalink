const { SlashCommandBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MessageFlags } = require('discord.js');
const config = require('../../config.js');
const os = require('os');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("stats")
  .setDescription("Show bot statistics and server information");

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            const lang = await getLang(interaction.guildId);
            const t = lang.stats;
            
            await interaction.deferReply();

            const player = client.riffy.players.get(interaction.guildId);
            const activePlayers = Array.from(client.riffy.players.values()).filter(p => p.playing || p.paused);
            const totalPlayers = client.riffy.players.size;
            
            const memoryUsage = process.memoryUsage();
            const totalMemory = os.totalmem();
            const freeMemory = os.freemem();
            const usedMemory = totalMemory - freeMemory;

            const embedColor = parseInt(config.embedColor?.replace('#', '') || '1db954', 16);
            const components = [];

            const headerContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.header.title + '\n\n' +
                        t.header.botName.replace('{botName}', client.user.username) + '\n' +
                        t.header.developer
                    )
                );

            components.push(headerContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

            const botInfoContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.botInfo.title + '\n\n' +
                        t.botInfo.servers.replace('{count}', client.guilds.cache.size.toLocaleString()) + '\n' +
                        t.botInfo.users.replace('{count}', client.users.cache.size.toLocaleString()) + '\n' +
                        t.botInfo.channels.replace('{count}', client.channels.cache.size.toLocaleString()) + '\n' +
                        t.botInfo.uptime.replace('{uptime}', formatUptime(client.uptime))
                    )
                );

            components.push(botInfoContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));

            const currentTrack = player?.current 
                ? (player.current.info.title.length > 40 
                    ? player.current.info.title.substring(0, 40) + '...' 
                    : player.current.info.title)
                : 'None';

            const musicStatsContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.musicStats.title + '\n\n' +
                        t.musicStats.activePlayers.replace('{count}', activePlayers.length) + '\n' +
                        t.musicStats.totalPlayers.replace('{count}', totalPlayers) + '\n' +
                        t.musicStats.currentTrack.replace('{track}', currentTrack)
                    )
                );

            components.push(musicStatsContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));

            const systemContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.systemInfo.title + '\n\n' +
                        t.systemInfo.cpu.replace('{cpu}', os.cpus()[0].model.substring(0, 35) + '...') + '\n' +
                        t.systemInfo.platform.replace('{platform}', os.platform()) + '\n' +
                        t.systemInfo.nodejs.replace('{version}', process.version) + '\n' +
                        t.systemInfo.discordjs.replace('{version}', require('discord.js').version)
                    )
                );

            components.push(systemContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));

            const memoryContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.memory.title + '\n\n' +
                        t.memory.memoryUsage + '\n' +
                        t.memory.used.replace('{used}', formatBytes(memoryUsage.heapUsed)) + '\n' +
                        t.memory.total.replace('{total}', formatBytes(memoryUsage.heapTotal)) + '\n\n' +
                        t.memory.systemMemory + '\n' +
                        t.memory.systemUsed.replace('{used}', formatBytes(usedMemory)) + '\n' +
                        t.memory.systemFree.replace('{free}', formatBytes(freeMemory)) + '\n\n' +
                        t.memory.performance + '\n' +
                        t.memory.ping.replace('{ping}', client.ws.ping) + '\n' +
                        t.memory.shards.replace('{count}', client.shard?.count || 1) + '\n' +
                        t.memory.commands.replace('{count}', client.commands.size)
                    )
                );

            components.push(memoryContainer);
            components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

            const footerContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.footer.version + '\n' +
                        t.footer.developer
                    )
                );

            components.push(footerContainer);

            return interaction.editReply({
                components: components,
                flags: MessageFlags.IsComponentsV2,
            });

        } catch (error) {
            console.error('Error processing stats command:', error);
            
            const lang = await getLang(interaction.guildId).catch(() => ({ stats: { errors: {} } }));
            const t = lang.stats?.errors || {};
            
            const errorContainer = new ContainerBuilder()
                .setAccentColor(0xff0000)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        (t.title || '## ❌ Error') + '\n\n' +
                        (t.message || 'An error occurred while retrieving statistics.\nPlease try again later.')
                    )
                );

            try {
                if (interaction.deferred || interaction.replied) {
                    return interaction.editReply({
                        components: [errorContainer],
                        flags: MessageFlags.IsComponentsV2,
                    });
                } else {
                    return interaction.reply({
                        components: [errorContainer],
                        flags: MessageFlags.IsComponentsV2,
                        ephemeral: true,
                    });
                }
            } catch (e) {
                return interaction.followUp({
                    content: t.fallback || "❌ An error occurred while retrieving statistics.",
                    ephemeral: true,
                }).catch(() => {});
            }
        }
    }
};
