const { SlashCommandBuilder, ContainerBuilder, MessageFlags } = require('discord.js');
const { setGuildLanguage, getGuildLanguage, getAvailableLanguages, getGlobalDefaultLanguage } = require('../../utils/languageLoader');
const config = require('../../config');

const data = new SlashCommandBuilder()
  .setName("language")
  .setDescription("Set the bot's language for this server")
  .addStringOption(option =>
    option.setName("lang")
      .setDescription("Select a language")
      .setRequired(false)
      .setAutocomplete(true)
  )
  .addStringOption(option =>
    option.setName("action")
      .setDescription("Action to perform")
      .setRequired(false)
      .addChoices(
        { name: "View Current", value: "view" },
        { name: "List Available", value: "list" },
        { name: "Reset to Default", value: "reset" }
      )
  );

module.exports = {
  data: data,
  run: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const embedColor = parseInt(config.embedColor?.replace('#', '') || '1db954', 16);

      if (interaction.guild.ownerId !== interaction.user.id) {
        const errorContainer = new ContainerBuilder()
          .setAccentColor(0xff3860)
          .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent("❌ **You don't have permission to change the language!**\nOnly the server owner can change the bot's language.")
          );

        await interaction.editReply({
          components: [errorContainer],
          flags: MessageFlags.IsComponentsV2
        });

        setTimeout(() => {
          interaction.deleteReply().catch(() => {});
        }, 5000);

        return;
      }

      const action = interaction.options.getString('action');
      const langCode = interaction.options.getString('lang');

      if (action === 'view' || (!action && !langCode)) {
        const currentLang = await getGuildLanguage(interaction.guildId);
        const globalLang = getGlobalDefaultLanguage();
        const availableLangs = getAvailableLanguages();
        
        const currentLangData = availableLangs.find(l => l.code === currentLang);
        const globalLangData = availableLangs.find(l => l.code === globalLang);
        
        const currentLangName = currentLangData?.name || currentLang.toUpperCase();
        const globalLangName = globalLangData?.name || globalLang.toUpperCase();

        const infoContainer = new ContainerBuilder()
          .setAccentColor(embedColor)
          .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(
              `## ℹ️ Language Information\n\n` +
              `**Current Server Language:** ${currentLangName} (${currentLang})\n` +
              `**Global Default Language:** ${globalLangName} (${globalLang})\n\n` +
              `**Available Languages:** ${availableLangs.length}\n\n` +
              `To reset to global default, use \`/language action:reset\``
            )
          );

        await interaction.editReply({
          components: [infoContainer],
          flags: MessageFlags.IsComponentsV2
        });

        setTimeout(() => {
          interaction.deleteReply().catch(() => {});
        }, 10000);

        return;
      }

      if (action === 'list') {
        const availableLangs = getAvailableLanguages();
        
        const langList = availableLangs
          .map(lang => `• **${lang.name}** (\`${lang.code}\`)`)
          .join('\n');

        const listContainer = new ContainerBuilder()
          .setAccentColor(embedColor)
          .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(
              `## 📚 Available Languages\n\n` +
              `Select a language from the list below:\n\n` +
              `**Available Languages:**\n${langList}`
            )
          );

        await interaction.editReply({
          components: [listContainer],
          flags: MessageFlags.IsComponentsV2
        });

        setTimeout(() => {
          interaction.deleteReply().catch(() => {});
        }, 15000);

        return;
      }

      if (action === 'reset') {
        const globalLang = getGlobalDefaultLanguage();
        const result = await setGuildLanguage(interaction.guildId, globalLang);
        
        if (!result.success) {
          const errorContainer = new ContainerBuilder()
            .setAccentColor(0xff3860)
            .addTextDisplayComponents(
              (textDisplay) => textDisplay.setContent(
                `❌ **Failed to set language!**\n${result.error || 'Unknown error'}`
              )
            );

          await interaction.editReply({
            components: [errorContainer],
            flags: MessageFlags.IsComponentsV2
          });

          setTimeout(() => {
            interaction.deleteReply().catch(() => {});
          }, 5000);

          return;
        }

        const availableLangs = getAvailableLanguages();
        const langData = availableLangs.find(l => l.code === globalLang);
        const langName = langData?.name || globalLang.toUpperCase();

        const successContainer = new ContainerBuilder()
          .setAccentColor(embedColor)
          .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(
              `## ✅ Language Changed\n\n` +
              `Server language has been changed to: **${langName}**\n\n` +
              `The bot will now use this language for all command responses in this server.\n\n` +
              `**Note:** Command descriptions will remain in the default language, but all responses will be in **${langName}**.`
            )
          );

        await interaction.editReply({
          components: [successContainer],
          flags: MessageFlags.IsComponentsV2
        });

        setTimeout(() => {
          interaction.deleteReply().catch(() => {});
        }, 10000);

        return;
      }

      if (langCode) {
        const availableLangs = getAvailableLanguages();
        const langExists = availableLangs.some(l => l.code === langCode);

        if (!langExists) {
          const errorContainer = new ContainerBuilder()
            .setAccentColor(0xff3860)
            .addTextDisplayComponents(
              (textDisplay) => textDisplay.setContent(
                `❌ **Language not found!**\nThe language \`${langCode}\` does not exist.`
              )
            );

          await interaction.editReply({
            components: [errorContainer],
            flags: MessageFlags.IsComponentsV2
          });

          setTimeout(() => {
            interaction.deleteReply().catch(() => {});
          }, 5000);

          return;
        }

        const result = await setGuildLanguage(interaction.guildId, langCode);

        if (!result.success) {
          const errorContainer = new ContainerBuilder()
            .setAccentColor(0xff3860)
            .addTextDisplayComponents(
              (textDisplay) => textDisplay.setContent(
                `❌ **Failed to set language!**\n${result.error || 'Unknown error'}`
              )
            );

          await interaction.editReply({
            components: [errorContainer],
            flags: MessageFlags.IsComponentsV2
          });

          setTimeout(() => {
            interaction.deleteReply().catch(() => {});
          }, 5000);

          return;
        }

        const langData = availableLangs.find(l => l.code === langCode);
        const langName = langData?.name || langCode.toUpperCase();

        const successContainer = new ContainerBuilder()
          .setAccentColor(embedColor)
          .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(
              `## ✅ Language Changed\n\n` +
              `Server language has been changed to: **${langName}**\n\n` +
              `The bot will now use this language for all command responses in this server.\n\n` +
              `**Note:** Command descriptions will remain in the default language, but all responses will be in **${langName}**.`
            )
          );

        await interaction.editReply({
          components: [successContainer],
          flags: MessageFlags.IsComponentsV2
        });

        setTimeout(() => {
          interaction.deleteReply().catch(() => {});
        }, 10000);
      }
    } catch (error) {
      console.error('Error in language command:', error);
      
      try {
        const errorContainer = new ContainerBuilder()
          .setAccentColor(0xff3860)
          .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(
              `❌ **An error occurred: ${error.message}**`
            )
          );

        await interaction.editReply({
          components: [errorContainer],
          flags: MessageFlags.IsComponentsV2
        });

        setTimeout(() => {
          interaction.deleteReply().catch(() => {});
        }, 5000);
      } catch (fallbackError) {
        await interaction.editReply({
          content: `❌ An error occurred: ${error.message}`
        });
      }
    }
  },
  autocomplete: async (interaction) => {
    const availableLangs = getAvailableLanguages();
    const focusedValue = interaction.options.getFocused().toLowerCase();

    const filtered = availableLangs
      .filter(lang => 
        lang.code.toLowerCase().includes(focusedValue) || 
        lang.name.toLowerCase().includes(focusedValue)
      )
      .slice(0, 25)
      .map(lang => ({
        name: `${lang.name} (${lang.code})`,
        value: lang.code
      }));

    await interaction.respond(filtered);
  }
};


