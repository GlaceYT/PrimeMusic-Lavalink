const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { loadLanguageFile, getGuildLanguage, getGlobalDefaultLanguage } = require('./languageLoader');
const config = require('../config');

const commandBuilders = new Map();

function getCommandDataFromLang(lang, commandName, category = null) {
  try {
    if (category === 'music' && lang.music && lang.music[commandName] && lang.music[commandName].command) {
      return lang.music[commandName].command;
    }
    if (category === 'playlist' && lang.playlist && lang.playlist[commandName] && lang.playlist[commandName].command) {
      return lang.playlist[commandName].command;
    }
    if (category === 'utility' && lang.utility && lang.utility[commandName] && lang.utility[commandName].command) {
      return lang.utility[commandName].command;
    }
    if (category === 'basic' && lang[commandName] && lang[commandName].command) {
      return lang[commandName].command;
    }
    if (lang.help && lang.help.command) {
      return lang.help.command;
    }
  } catch (error) {
    console.error(`Error getting command data for ${commandName}:`, error);
  }
  return null;
}

function buildCommandWithLanguage(commandModule, lang, filePath = '') {
  const commandName = commandModule.data.name;
  
  if (commandName === 'language') {
    return commandModule.data.toJSON();
  }
  
  let category = null;
  
  if (filePath.includes('/music/') || filePath.includes('\\music\\')) category = 'music';
  else if (filePath.includes('/playlist/') || filePath.includes('\\playlist\\')) category = 'playlist';
  else if (filePath.includes('/utility/') || filePath.includes('\\utility\\')) category = 'utility';
  else if (filePath.includes('/basic/') || filePath.includes('\\basic\\')) category = 'basic';
  
  const langData = getCommandDataFromLang(lang, commandName, category);
  
  if (!langData) {
    return commandModule.data.toJSON();
  }
  
  const builder = new SlashCommandBuilder()
    .setName(commandName)
    .setDescription(langData.description || commandModule.data.description);
  
  const originalData = commandModule.data.toJSON();
  
  if (originalData.options && Array.isArray(originalData.options)) {
    for (const option of originalData.options) {
      if (option.type === 3) {
        builder.addStringOption(opt => {
          opt.setName(option.name)
             .setDescription(option.description)
             .setRequired(option.required || false);
          
          if (option.autocomplete) {
            opt.setAutocomplete(true);
          }
          
          if (option.choices && Array.isArray(option.choices) && option.choices.length > 0) {
            for (const choice of option.choices) {
              opt.addChoices({ name: choice.name, value: choice.value });
            }
          }
          
          return opt;
        });
      } else if (option.type === 5) {
        builder.addBooleanOption(opt => {
          opt.setName(option.name)
             .setDescription(option.description)
             .setRequired(option.required || false);
          return opt;
        });
      } else if (option.type === 4) {
        builder.addIntegerOption(opt => {
          opt.setName(option.name)
             .setDescription(option.description)
             .setRequired(option.required || false);
          if (option.min_value !== undefined) opt.setMinValue(option.min_value);
          if (option.max_value !== undefined) opt.setMaxValue(option.max_value);
          return opt;
        });
      }
    }
  }
  
  return builder.toJSON();
}

const commandModulesCache = new Map();

function loadCommandModulesOnce() {
  if (commandModulesCache.size > 0) return commandModulesCache;
  
  const commandsDir = path.resolve(__dirname, '../commands');
  
  const loadCommandsFromDir = (dir, category = '') => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        loadCommandsFromDir(fullPath, item.name);
      } else if (item.isFile() && item.name.endsWith('.js')) {
        try {
          const absolutePath = path.resolve(fullPath);
          const command = require(absolutePath);
          
          if (command.data && command.run) {
            commandModulesCache.set(command.data.name, { module: command, path: absolutePath, category });
          }
        } catch (error) {
          console.error(`Error loading command ${item.name}:`, error);
        }
      }
    }
  };
  
  const categoryFolders = ['basic', 'music', 'playlist', 'utility'];
  for (const folder of categoryFolders) {
    const folderPath = path.join(commandsDir, folder);
    if (fs.existsSync(folderPath)) {
      loadCommandsFromDir(folderPath, folder);
    }
  }
  
  return commandModulesCache;
}

async function buildCommandsArrayForGuild(guildId = null) {
  try {
    const langCode = guildId ? await getGuildLanguage(guildId) : getGlobalDefaultLanguage();
    const lang = loadLanguageFile(langCode);
    
    if (!lang) {
      console.error(`[ COMMANDS ] Failed to load language file for code: ${langCode}`);
      return [];
    }
    
    const commandModules = loadCommandModulesOnce();
    
    if (commandModules.size === 0) {
      console.error('[ COMMANDS ] No command modules found! Check if commands directory exists.');
      return [];
    }
    
    const commandsArray = [];
    
    for (const [commandName, { module: command, path: filePath, category }] of commandModules) {
      try {
        if (!command || !command.data) {
          console.warn(`[ COMMANDS ] Skipping ${commandName}: missing data property`);
          continue;
        }
        
        const commandData = buildCommandWithLanguage(command, lang, filePath);
        if (commandData) {
          commandsArray.push(commandData);
        } else {
          console.warn(`[ COMMANDS ] Failed to build command data for: ${commandName}`);
        }
      } catch (error) {
        console.error(`[ COMMANDS ] Error building command ${commandName}:`, error.message);
      }
    }
    
    return commandsArray;
  } catch (error) {
    console.error('[ COMMANDS ] Error in buildCommandsArrayForGuild:', error.message);
    return [];
  }
}

module.exports = {
  buildCommandsArrayForGuild,
  buildCommandWithLanguage,
  loadCommandModulesOnce
};

