const config = require("../config.js");
const { ActivityType } = require("discord.js");
const colors = require('../UI/colors/colors');

module.exports = async (client) => {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");
    const rest = new REST({ version: "10" }).setToken(config.TOKEN || process.env.TOKEN);

    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await client.commands,
            });
            console.log('\n' + '─'.repeat(40));
            console.log(`${colors.magenta}${colors.bright}⚡ COMMAND STATUS${colors.reset}`);
            console.log('─'.repeat(40));
            console.log(`${colors.cyan}[ COMMANDS ]${colors.reset} ${colors.green}Loaded Successfully 🚀${colors.reset}`);
            console.log(`${colors.cyan}[ TIME ]${colors.reset} ${colors.gray}${new Date().toISOString().replace('T', ' ').split('.')[0]}${colors.reset}`);
            console.log(`${colors.cyan}[ USER ]${colors.reset} ${colors.yellow}GlaceYT${colors.reset}`);
        } catch (err) {
            console.log('\n' + '─'.repeat(40));
            console.log(`${colors.magenta}${colors.bright}⚡ COMMAND STATUS${colors.reset}`);
            console.log('─'.repeat(40));
            console.log(`${colors.cyan}[ COMMANDS ]${colors.reset} ${colors.red}Failed To Load ❌${colors.reset}`);
            console.log(`${colors.cyan}[ ERROR ]${colors.reset} ${colors.red}${err.message}${colors.reset}`);
            console.log(`${colors.cyan}[ TIME ]${colors.reset} ${colors.gray}${new Date().toISOString().replace('T', ' ').split('.')[0]}${colors.reset}`);
            console.log(`${colors.cyan}[ USER ]${colors.reset} ${colors.yellow}GlaceYT${colors.reset}`);
        }
    })();

    const activityType = ActivityType[config.activityType.charAt(0).toUpperCase() + config.activityType.slice(1).toLowerCase()];
    if (!activityType) {
        console.error(`Invalid activity type: ${config.activityType}`);
        return;
    }
    
    setInterval(() => client.user.setActivity({ 
        name: config.activityName, 
        type: activityType 
    }), 10000);

    client.errorLog = config.errorLog;
};
