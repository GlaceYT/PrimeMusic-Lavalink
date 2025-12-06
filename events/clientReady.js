const config = require("../config.js");
const { ActivityType } = require("discord.js");
const colors = require('../UI/colors/colors');
const { getLangSync } = require('../utils/languageLoader.js');
const StatusManager = require('../utils/statusManager.js');

module.exports = async (client) => {
    try {
        const lang = getLangSync();
        const { REST } = require('@discordjs/rest');
        const { Routes } = require('discord-api-types/v10');
        const rest = new REST({ version: '10' }).setToken(config.TOKEN || process.env.TOKEN);
        
        const commandsArray = client.commandsArray || [];
        
        if (commandsArray.length === 0) {
            console.error(`${colors.cyan}[ REST ]${colors.reset} ${colors.red}No commands to register!${colors.reset}`);
            return;
        }
        
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commandsArray }
            );
            
            console.log(`${colors.cyan}[ REST ]${colors.reset} ${colors.green}${lang.console?.events?.rest?.commandsRegistered?.replace('{count}', commandsArray.length) || `Successfully registered ${commandsArray.length} application (/) commands globally ✅`}${colors.reset}`);
        } catch (error) {
            console.error(`${colors.cyan}[ REST ]${colors.reset} ${colors.red}${lang.console?.events?.rest?.commandsFailed || 'Failed to register commands ❌'}${colors.reset}`);
            console.error(`${colors.gray}${lang.console?.events?.rest?.error?.replace('{message}', error.message) || `Error: ${error.message}`}${colors.reset}`);
            if (error.rawError) {
                console.error(`${colors.gray}${lang.console?.events?.rest?.details?.replace('{details}', JSON.stringify(error.rawError, null, 2)) || `Details: ${JSON.stringify(error.rawError, null, 2)}`}${colors.reset}`);
            }
        }
        

       
    } catch (error) {
        const lang = getLangSync();
        console.error(`${colors.cyan}[ REST ]${colors.reset} ${colors.red}${lang.console?.events?.rest?.commandsFailed || 'Failed to register commands ❌'}${colors.reset}`);
        console.error(`${colors.gray}${lang.console?.events?.rest?.error?.replace('{message}', error.message) || `Error: ${error.message}`}${colors.reset}`);
        if (error.rawError) {
            console.error(`${colors.gray}${lang.console?.events?.rest?.details?.replace('{details}', JSON.stringify(error.rawError, null, 2)) || `Details: ${JSON.stringify(error.rawError, null, 2)}`}${colors.reset}`);
        }
    }

    client.statusManager = new StatusManager(client);
    await client.statusManager.setDefaultStatus();

    client.errorLog = config.errorLog;
};

