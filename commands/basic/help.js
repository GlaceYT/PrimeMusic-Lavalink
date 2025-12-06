const { SlashCommandBuilder, SectionBuilder, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, ButtonBuilder, ButtonStyle, MessageFlags, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require("../../config.js");
const fs = require('fs');
const path = require('path');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Get information about the bot and its commands")
  .addStringOption(option =>
    option.setName("category")
      .setDescription("Select a category to view")
      .setRequired(false)
      .addChoices(
        { name: "🏠 Main Menu", value: "main" },
        { name: "🎵 Music Commands", value: "music" },
        { name: "📋 Playlist Commands", value: "playlist" },
        { name: "💜 Basic Commands", value: "basic" },
        { name: "🔧 Utility Commands", value: "utility" }
      )
  );

function getCommandCategory(commandName) {
  const commandsDir = path.resolve(__dirname, '../../commands');
  const categoryFolders = ['basic', 'music', 'playlist', 'utility'];
  
  for (const folder of categoryFolders) {
    const folderPath = path.join(commandsDir, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      if (files.some(file => file.replace('.js', '') === commandName)) {
        return folder;
      }
    }
  }
  
  return 'basic';
}

function groupCommandsByCategory(client) {
  const grouped = {
    music: [],
    playlist: [],
    basic: [],
    utility: []
  };
  
  client.commands.forEach((cmd, name) => {
    const category = getCommandCategory(name);
    if (grouped[category]) {
      grouped[category].push(cmd);
    } else {
      grouped.basic.push(cmd);
    }
  });
  
  return grouped;
}

async function showMainMenu(client, interaction, embedColor, totalCommands, totalServers, totalUsers, uptimeString, ping, botName) {
  const lang = await getLang(interaction.guildId);
  const t = lang.help;
  const components = [];
  const groupedCommands = groupCommandsByCategory(client);

  const headerSection = new SectionBuilder()
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent(
        t.mainMenu.header.title.replace('{botName}', botName) + '\n\n' +
        t.mainMenu.header.welcome.replace('{botName}', botName) + '\n' +
        t.mainMenu.header.subtitle
      )
    )
    .setThumbnailAccessory(
      (thumbnail) => thumbnail.setURL(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
    );

  const headerContainer = new ContainerBuilder()
    .setAccentColor(embedColor)
    .addSectionComponents(headerSection);

  components.push(headerContainer);
  components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

  const statsContainer = new ContainerBuilder()
    .setAccentColor(embedColor)
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent(
        t.mainMenu.statistics.title + '\n\n' +
        t.mainMenu.statistics.commands.replace('{totalCommands}', totalCommands) + '\n' +
        t.mainMenu.statistics.servers.replace('{totalServers}', totalServers) + '\n' +
        t.mainMenu.statistics.users.replace('{totalUsers}', totalUsers.toLocaleString()) + '\n' +
        t.mainMenu.statistics.uptime.replace('{uptimeString}', uptimeString) + '\n' +
        t.mainMenu.statistics.ping.replace('{ping}', ping)
      )
    );

  components.push(statsContainer);
  components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

  const musicCategory = t.categories.music;
  const playlistCategory = t.categories.playlist;
  const basicCategory = t.categories.basic;
  const utilityCategory = t.categories.utility;

  const categoryOverview = new ContainerBuilder()
    .setAccentColor(embedColor)
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent(
        t.mainMenu.categories.title + '\n\n' +
        t.mainMenu.categories.music
          .replace('{emoji}', musicCategory.emoji)
          .replace('{name}', musicCategory.name)
          .replace('{count}', groupedCommands.music.length) + '\n' +
        t.mainMenu.categories.playlist
          .replace('{emoji}', playlistCategory.emoji)
          .replace('{name}', playlistCategory.name)
          .replace('{count}', groupedCommands.playlist.length) + '\n' +
        t.mainMenu.categories.basic
          .replace('{emoji}', basicCategory.emoji)
          .replace('{name}', basicCategory.name)
          .replace('{count}', groupedCommands.basic.length) + '\n' +
        (groupedCommands.utility.length > 0 
          ? t.mainMenu.categories.utility
              .replace('{emoji}', utilityCategory.emoji)
              .replace('{name}', utilityCategory.name)
              .replace('{count}', groupedCommands.utility.length) + '\n'
          : '') +
        '\n' + t.mainMenu.categories.footer
      )
    );

  components.push(categoryOverview);
  components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

  const footerContainer = new ContainerBuilder()
    .setAccentColor(embedColor)
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent(
        t.mainMenu.footer.version + '\n' +
        t.mainMenu.footer.developer
      )
    );

  components.push(footerContainer);

  const categoryMenu = new StringSelectMenuBuilder()
    .setCustomId('help_category_select')
    .setPlaceholder(t.mainMenu.selectMenu.placeholder)
    .addOptions([
      {
        label: musicCategory.name,
        description: t.mainMenu.selectMenu.musicDescription.replace('{count}', groupedCommands.music.length),
        emoji: musicCategory.emoji,
        value: 'music'
      },
      {
        label: playlistCategory.name,
        description: t.mainMenu.selectMenu.playlistDescription.replace('{count}', groupedCommands.playlist.length),
        emoji: playlistCategory.emoji,
        value: 'playlist'
      },
      {
        label: basicCategory.name,
        description: t.mainMenu.selectMenu.basicDescription.replace('{count}', groupedCommands.basic.length),
        emoji: basicCategory.emoji,
        value: 'basic'
      },
      ...(groupedCommands.utility.length > 0 ? [{
        label: utilityCategory.name,
        description: t.mainMenu.selectMenu.utilityDescription.replace('{count}', groupedCommands.utility.length),
        emoji: utilityCategory.emoji,
        value: 'utility'
      }] : [])
    ]);

  const menuRow = new ActionRowBuilder().addComponents(categoryMenu);

  const navRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel(t.mainMenu.buttons.supportServer)
      .setStyle(ButtonStyle.Link)
      .setURL(config.SupportServer),
    new ButtonBuilder()
      .setLabel(t.mainMenu.buttons.github)
      .setStyle(ButtonStyle.Link)
      .setURL('https://github.com/GlaceYT')
  );

  const response = {
    components: [...components, menuRow, navRow],
    flags: MessageFlags.IsComponentsV2,
  };
  
  if (interaction.deferred) {
    return interaction.editReply(response);
  } else {
    return interaction.update(response);
  }
}

async function showCategoryPage(client, interaction, categoryKey, embedColor, botName) {
  const lang = await getLang(interaction.guildId);
  const t = lang.help;
  const components = [];
  const groupedCommands = groupCommandsByCategory(client);
  const category = t.categories[categoryKey] || t.categories.basic;
  const commands = groupedCommands[categoryKey] || [];

  if (commands.length === 0) {
    const errorContainer = new ContainerBuilder()
      .setAccentColor(0xff3860)
      .addTextDisplayComponents(
        (textDisplay) => textDisplay.setContent(
          t.categoryPage.noCommands.title + '\n\n' +
          t.categoryPage.noCommands.message.replace('{categoryName}', category.name) + '\n' +
          t.categoryPage.noCommands.backToHelp
        )
      );

    components.push(errorContainer);
  } else {
    const categoryHeaderSection = new SectionBuilder()
      .addTextDisplayComponents(
        (textDisplay) => textDisplay.setContent(
          t.categoryPage.header.title
            .replace('{emoji}', category.emoji)
            .replace('{categoryName}', category.name) + '\n\n' +
          category.description + '\n\n' +
          t.categoryPage.header.count
            .replace('{count}', commands.length)
            .replace('{plural}', commands.length > 1 ? 's' : '')
        )
      )
      .setThumbnailAccessory(
        (thumbnail) => thumbnail.setURL(client.user.displayAvatarURL({ dynamic: true, size: 128 }))
      );

    const categoryHeaderContainer = new ContainerBuilder()
      .setAccentColor(embedColor)
      .addSectionComponents(categoryHeaderSection);

    components.push(categoryHeaderContainer);
    components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

    const commandsPerPage = 8;
    const totalPages = Math.ceil(commands.length / commandsPerPage);

    for (let page = 0; page < totalPages; page++) {
      const startIdx = page * commandsPerPage;
      const endIdx = Math.min(startIdx + commandsPerPage, commands.length);
      const pageCommands = commands.slice(startIdx, endIdx);

      const commandList = pageCommands
        .map((cmd, idx) => {
          const num = startIdx + idx + 1;
          return t.categoryPage.commands.item
            .replace('{num}', num)
            .replace('{commandName}', cmd.data.name)
            .replace('{description}', cmd.data.description || t.categoryPage.commands.noDescription);
        })
        .join('\n\n');

      const pageContainer = new ContainerBuilder()
        .setAccentColor(embedColor)
        .addTextDisplayComponents(
          (textDisplay) => textDisplay.setContent(
            totalPages > 1 
              ? t.categoryPage.commands.titlePaginated
                  .replace('{currentPage}', page + 1)
                  .replace('{totalPages}', totalPages) + '\n\n' + commandList
              : t.categoryPage.commands.title + '\n\n' + commandList
          )
        );

      components.push(pageContainer);

      if (page < totalPages - 1) {
        components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));
      }
    }

    components.push(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

    const footerContainer = new ContainerBuilder()
      .setAccentColor(embedColor)
      .addTextDisplayComponents(
        (textDisplay) => textDisplay.setContent(
          t.categoryPage.footer.version + '\n' +
          t.categoryPage.footer.developer
        )
      );

    components.push(footerContainer);
  }

  const backButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('help_back_main')
      .setLabel(t.categoryPage.buttons.backToMain)
      .setStyle(ButtonStyle.Secondary)
  );

  const navRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel(t.categoryPage.buttons.supportServer)
      .setStyle(ButtonStyle.Link)
      .setURL(config.SupportServer),
    new ButtonBuilder()
      .setLabel(t.categoryPage.buttons.github)
      .setStyle(ButtonStyle.Link)
      .setURL('https://github.com/GlaceYT')
  );

  const response = {
    components: [...components, backButton, navRow],
    flags: MessageFlags.IsComponentsV2,
  };
  
  if (interaction.deferred) {
    return interaction.editReply(response);
  } else {
    return interaction.update(response);
  }
}

module.exports = {
  data: data,
  helpers: {
    showMainMenu,
    showCategoryPage,
    groupCommandsByCategory
  },
  run: async (client, interaction) => {
    try {
      await interaction.deferReply();
      
      const lang = await getLang(interaction.guildId);
      const t = lang.help;
      const botName = client.user.username;
      const selectedCategory = interaction.options.getString('category') || 'main';

      const totalCommands = client.commands.size;
      const totalServers = client.guilds.cache.size;
      const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

      const uptime = process.uptime();
      const days = Math.floor(uptime / (3600 * 24));
      const hours = Math.floor((uptime % (3600 * 24)) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      const ping = client.ws.ping;

      const embedColor = parseInt(config.embedColor?.replace('#', '') || '1db954', 16);

      if (selectedCategory === 'main') {
        return showMainMenu(client, interaction, embedColor, totalCommands, totalServers, totalUsers, uptimeString, ping, botName);
      } else {
        return showCategoryPage(client, interaction, selectedCategory, embedColor, botName);
      }
    } catch (e) {
      console.error('Error in help command:', e);
      
      try {
        const lang = await getLang(interaction.guildId);
        const t = lang.help?.errors || {};
        
        return interaction.editReply({
          content: (t.fallbackDetails || t.general || "❌ **An error occurred while fetching the help menu.**")
            .replace('{botName}', client.user.username)
            .replace('{totalCommands}', client.commands.size)
            .replace('{totalServers}', client.guilds.cache.size)
            .replace('{supportServer}', config.SupportServer),
        });
      } catch (fallbackError) {
        const lang = await getLang(interaction.guildId).catch(() => ({ help: { errors: {} } }));
        const t = lang.help?.errors || {};
        
        return interaction.editReply({
          content: t.fallback || "❌ An error occurred while fetching the help menu.",
        });
      }
    }
  },
};
