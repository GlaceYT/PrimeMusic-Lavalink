const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function stop(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ No active player found.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        player.stop();
        player.destroy();

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**⏹️ Playback has been stopped and player destroyed!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error processing stop command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ An error occurred while processing your request.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "stop",
    description: "Stop the current song and destroy the player",
    permissions: "0x0000000000000800",
    options: [],
    run: stop
};
