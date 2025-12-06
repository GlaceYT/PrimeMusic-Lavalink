const { SlashCommandBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MessageFlags } = require('discord.js');
const config = require('../../config.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Check the bot latency and response time");

function formatUptime(uptime) {
  const seconds = Math.floor((uptime / 1000) % 60);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

module.exports = {
  data: data,
  run: async (client, interaction) => {
    try {
      const lang = await getLang(interaction.guildId);
      const t = lang.ping;
      
      const start = Date.now();
      await interaction.deferReply();

      const end = Date.now();
      const latency = end - start;
      const websocketPing = client.ws.ping;

      const embedColor = parseInt(config.embedColor?.replace('#', '') || '1db954', 16);
      const components = [];

      const headerContainer = new ContainerBuilder()
        .setAccentColor(embedColor)
        .addTextDisplayComponents(
          (textDisplay) => textDisplay.setContent(
            t.header.title + '\n\n' +
            t.header.botName.replace('{botName}', client.user.username) + '\n' +
            t.header.subtitle
          )
        );

      components.push(headerContainer);
      components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

      const connectionSpeed = latency < 200 
        ? t.metrics.connectionSpeed.excellent 
        : latency < 500 
        ? t.metrics.connectionSpeed.good 
        : t.metrics.connectionSpeed.slow;

      const pingContainer = new ContainerBuilder()
        .setAccentColor(embedColor)
        .addTextDisplayComponents(
          (textDisplay) => textDisplay.setContent(
            t.metrics.title + '\n\n' +
            t.metrics.responseTime.replace('{latency}', latency) + '\n' +
            t.metrics.websocketPing.replace('{ping}', websocketPing) + '\n' +
            t.metrics.botUptime.replace('{uptime}', formatUptime(client.uptime)) + '\n\n' +
            connectionSpeed
          )
        );

      components.push(pingContainer);
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

    } catch (e) {
      console.error('Error in ping command:', e);
      
      const lang = await getLang(interaction.guildId).catch(() => ({ ping: { errors: {} } }));
      const t = lang.ping?.errors || {};
      
      const errorContainer = new ContainerBuilder()
        .setAccentColor(0xff0000)
        .addTextDisplayComponents(
          (textDisplay) => textDisplay.setContent(
            (t.title || '## ❌ Error') + '\n\n' +
            (t.message || 'An error occurred while checking latency.\nPlease try again later.')
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
      } catch (replyError) {
        return interaction.followUp({
          content: t.fallback || "❌ An error occurred while checking latency.",
          ephemeral: true,
        }).catch(() => {});
      }
    }
  },
};
