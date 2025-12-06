const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require('../config');
const { getLanguageCollection } = require('../mongodb');

async function clearAllGuildCommands(client) {
  try {
    const rest = new REST({ version: '10' }).setToken(config.TOKEN || process.env.TOKEN);
    const languageCollection = getLanguageCollection();
    
    const guildIds = new Set();
    
    if (languageCollection) {
      const dbGuilds = await languageCollection.find({}).toArray();
      dbGuilds.forEach(g => {
        if (g.guildId) guildIds.add(g.guildId);
      });
    }
    
    if (client.guilds && client.guilds.cache) {
      client.guilds.cache.forEach(guild => {
        guildIds.add(guild.id);
      });
    }
    
    const guildArray = Array.from(guildIds);
    console.log(`[ CLEANER ] Clearing commands from ${guildArray.length} guild(s)...`);
    
    for (const guildId of guildArray) {
      try {
        await rest.put(
          Routes.applicationGuildCommands(client.user.id, guildId),
          { body: [] }
        );
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        if (!error.message.includes('Unknown Guild') && !error.message.includes('404')) {
          console.warn(`[ CLEANER ] Error clearing guild ${guildId}: ${error.message}`);
        }
      }
    }
    
    console.log(`[ CLEANER ] Cleared commands from ${guildArray.length} guild(s)`);
  } catch (error) {
    console.error('[ CLEANER ] Error clearing all guild commands:', error);
  }
}

async function clearGlobalCommands(client) {
  try {
    const rest = new REST({ version: '10' }).setToken(config.TOKEN || process.env.TOKEN);
    
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: [] }
    );
    
    console.log('[ CLEANER ] Cleared all global commands');
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error('[ CLEANER ] Error clearing global commands:', error);
  }
}

async function megaCleanup(client) {
  console.log('[ CLEANER ] Starting MEGA CLEANUP...');
  
  try {
    await clearAllGuildCommands(client);
    await new Promise(resolve => setTimeout(resolve, 500));
    await clearGlobalCommands(client);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('[ CLEANER ] MEGA CLEANUP completed!');
    return true;
  } catch (error) {
    console.error('[ CLEANER ] MEGA CLEANUP failed:', error);
    return false;
  }
}

module.exports = {
  clearAllGuildCommands,
  clearGlobalCommands,
  megaCleanup
};

