const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function volume(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);
        const volume = interaction.options.getInteger('level');

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ No active player found.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        if (volume < 0 || volume > 100) {
            return interaction.reply({ content: 'Volume level must be between 0 and 100.', ephemeral: true });
        }

        player.setVolume(volume);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription(`🔊 Volume has been set to **${volume}%**`);

        return interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error setting volume:', error);
        await interaction.reply({ content: 'An error occurred while setting the volume.', ephemeral: true });
    }
}

module.exports = {
    name: "volume",
    description: "Set the volume of the current song",
    permissions: "0x0000000000000800",
    options: [{
        name: 'level',
        description: 'Volume level (0-100)',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: volume
};
