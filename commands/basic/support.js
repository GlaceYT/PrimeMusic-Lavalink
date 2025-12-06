const { SlashCommandBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags } = require('discord.js');
const config = require("../../config.js");
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("support")
  .setDescription("Get support server link and important links");

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            const lang = await getLang(interaction.guildId);
            const t = lang.support;
            
            await interaction.deferReply();

            const supportServerLink = "https://discord.gg/xQF9f9yUEM";
            const githubLink = "https://github.com/GlaceYT";
            const websiteLink = "https://www.glaceyt.com";
            const youtubeLink = "https://www.youtube.com/@GlaceYT";

            const embedColor = parseInt(config.embedColor?.replace('#', '') || 'b300ff', 16);
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

            const linksContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        t.links.title + '\n\n' +
                        t.links.supportServer.title + '\n' +
                        t.links.supportServer.description + '\n' +
                        t.links.supportServer.link.replace('{url}', supportServerLink) + '\n\n' +
                        t.links.github.title + '\n' +
                        t.links.github.description + '\n' +
                        t.links.github.link.replace('{url}', githubLink) + '\n\n' +
                        t.links.youtube.title + '\n' +
                        t.links.youtube.description + '\n' +
                        t.links.youtube.link.replace('{url}', youtubeLink) + '\n\n' +
                        t.links.website.title + '\n' +
                        t.links.website.description + '\n' +
                        t.links.website.link.replace('{url}', websiteLink)
                    )
                );

            components.push(linksContainer);
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

            const buttonRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel(t.buttons.supportServer)
                    .setStyle(ButtonStyle.Link)
                    .setURL(supportServerLink),
                new ButtonBuilder()
                    .setLabel(t.buttons.github)
                    .setStyle(ButtonStyle.Link)
                    .setURL(githubLink),
                new ButtonBuilder()
                    .setLabel(t.buttons.youtube)
                    .setStyle(ButtonStyle.Link)
                    .setURL(youtubeLink)
            );

            return interaction.editReply({
                components: [...components, buttonRow],
                flags: MessageFlags.IsComponentsV2,
            });

        } catch (e) {
            console.error('Error in support command:', e);
            
            const lang = await getLang(interaction.guildId).catch(() => ({ support: { errors: {} } }));
            const t = lang.support?.errors || {};
            
            const errorContainer = new ContainerBuilder()
                .setAccentColor(0xff0000)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(
                        (t.title || '## ❌ Error') + '\n\n' +
                        (t.message || 'An error occurred while fetching support information.\nPlease try again later.')
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
                    content: t.fallback || "❌ An error occurred while fetching support information.",
                    ephemeral: true,
                }).catch(() => {});
            }
        }
    },
};
