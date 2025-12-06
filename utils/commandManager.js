const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { buildCommandsArrayForGuild } = require('./commandBuilder');
const { getGuildLanguage, getGlobalDefaultLanguage } = require('./languageLoader');
const { getLanguageCollection } = require('../mongodb');
const config = require('../config');

const commandCache = new Map();

async function getCachedCommandsArray(langCode) {
  if (commandCache.has(langCode)) {
    return commandCache.get(langCode);
  }
  
  const commandsArray = await buildCommandsArrayForGuild(null);
  
  if (!commandsArray || commandsArray.length === 0) {
    console.error(`[ COMMANDS ] Failed to build commands array for language: ${langCode}`);
    return [];
  }
  
  commandCache.set(langCode, commandsArray);
  return commandsArray;
}

async function registerGlobalCommands(client) {
  try {
    const rest = new REST({ version: '10' }).setToken(config.TOKEN || process.env.TOKEN);
    
    // Use the simple client.commandsArray that's already built in bot.js
    const commandsArray = client.commandsArray || [];
    
    if (!commandsArray || commandsArray.length === 0) {
      console.error('[ COMMANDS ] No commands to register! Check if commands are loading correctly.');
      return false;
    }
    
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commandsArray }
    );
    
    return true;
  } catch (error) {
    console.error('[ COMMANDS ] Error registering global commands:', error.message);
    if (error.rawError) {
      console.error('[ COMMANDS ] Discord API Error:', JSON.stringify(error.rawError, null, 2));
    }
    return false;
  }
}

async function registerGuildCommands(client, guildId, forceClear = false) {
  try {
    const rest = new REST({ version: '10' }).setToken(config.TOKEN || process.env.TOKEN);
    const langCode = await getGuildLanguage(guildId);
    const defaultLang = getGlobalDefaultLanguage();
    
    if (langCode === defaultLang) {
      if (forceClear) {
        try {
          await rest.put(
            Routes.applicationGuildCommands(client.user.id, guildId),
            { body: [] }
          );
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (clearError) {
        }
      }
      return true;
    }
    
    if (forceClear) {
      try {
        await rest.put(
          Routes.applicationGuildCommands(client.user.id, guildId),
          { body: [] }
        );
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (clearError) {
      }
    }
    
    const commandsArray = await buildCommandsArrayForGuild(guildId);
    
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, guildId),
      { body: commandsArray }
    );
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return true;
  } catch (error) {
    // Suppress "Missing Access" errors (50001) - bot may not have access to guild
    if (error.code === 50001) {
      return false; // Silently fail for missing access
    }
    console.error(`Error registering guild commands for ${guildId}:`, error);
    return false;
  }
}

async function registerAllGuildCommands(client) {
  try {
    const languageCollection = getLanguageCollection();
    if (!languageCollection) return;
    
    const customLanguageGuilds = await languageCollection.find({}).toArray();
    const defaultLang = getGlobalDefaultLanguage();
    
    const guildsToRegister = customLanguageGuilds
      .filter(g => g.language && g.language !== defaultLang)
      .map(g => g.guildId);
    
    if (guildsToRegister.length === 0) return;
    
    console.log(`[ COMMANDS ] Registering commands for ${guildsToRegister.length} guild(s) with custom languages...`);
    
    for (const guildId of guildsToRegister) {
      try {
        await registerGuildCommands(client, guildId);
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        // Suppress "Missing Access" errors (50001) - bot may not have access to guild
        if (error.code !== 50001) {
          console.error(`Error registering commands for guild ${guildId}:`, error.message);
        }
      }
    }
    
    console.log(`[ COMMANDS ] Completed guild command registration.`);
  } catch (error) {
    console.error('Error registering all guild commands:', error);
  }
}

function clearCommandCache(langCode = null) {
  if (langCode) {
    commandCache.delete(langCode);
  } else {
    commandCache.clear();
  }
}

module.exports = {
  registerGlobalCommands,
  registerGuildCommands,
  registerAllGuildCommands,
  getCachedCommandsArray,
  clearCommandCache
};


