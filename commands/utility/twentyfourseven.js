const { SlashCommandBuilder, ContainerBuilder, MessageFlags } = require('discord.js');
const config = require('../../config.js');
const musicIcons = require('../../UI/icons/musicicons.js');
const { autoplayCollection } = require('../../mongodb.js');
const { getLang } = require('../../utils/languageLoader.js');
const { handleCommandError } = require('../../utils/responseHandler.js');

const data = new SlashCommandBuilder()
  .setName("247")
  .setDescription("Toggle 24/7 mode (keep bot in voice channel)")
  .addBooleanOption(option =>
    option.setName("enable")
      .setDescription("Enable or disable 24/7 mode")
      .setRequired(true)
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
            const lang = await getLang(interaction.guildId);

            if (interaction.guild.ownerId !== interaction.user.id) {
                const errorContainer = new ContainerBuilder()
                    .setAccentColor(0xff0000)
                    .addTextDisplayComponents(
                        (textDisplay) => textDisplay.setContent(
                            `${lang.utility.twentyfourseven.accessDenied.title}\n\n` +
                            `${lang.utility.twentyfourseven.accessDenied.message}`
                        )
                    );

                const reply = await interaction.editReply({
                    components: [errorContainer],
                    flags: MessageFlags.IsComponentsV2,
                });
                setTimeout(() => reply.delete().catch(() => {}), 3000);
                return reply;
            }

            const enable = interaction.options.getBoolean('enable');
            const guildId = interaction.guild.id;

            await autoplayCollection.updateOne(
                { guildId },
                { $set: { twentyfourseven: enable } },
                { upsert: true }
            );

            const embedColor = parseInt((enable ? '#00ff00' : '#ff0000').replace('#', ''), 16);
            const components = [];

            const statusText = enable 
                ? `${lang.utility.twentyfourseven.enabled.title}\n\n${lang.utility.twentyfourseven.enabled.message}\n\n${lang.utility.twentyfourseven.enabled.note}`
                : `${lang.utility.twentyfourseven.disabled.title}\n\n${lang.utility.twentyfourseven.disabled.message}\n\n${lang.utility.twentyfourseven.disabled.note}`;

            const statusContainer = new ContainerBuilder()
                .setAccentColor(embedColor)
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay.setContent(statusText)
                );

            components.push(statusContainer);

            const reply = await interaction.editReply({
                components: components,
                flags: MessageFlags.IsComponentsV2,
                fetchReply: true
            });
            setTimeout(() => reply.delete().catch(() => {}), 3000);
            return reply;

        } catch (error) {
            return handleCommandError(
                interaction,
                error,
                '247',
                null
            );
        }
    }
};
