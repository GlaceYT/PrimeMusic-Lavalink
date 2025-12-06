const { ContainerBuilder, MessageFlags } = require('discord.js');
const config = require('../config.js');

function getEmbedColor(color) {
    if (color) {
        return parseInt(color.replace('#', ''), 16);
    }
    return parseInt(config.embedColor?.replace('#', '') || '1db954', 16);
}

async function sendErrorResponse(interaction, message, deleteAfter = 5000) {
    const errorContainer = new ContainerBuilder()
        .setAccentColor(0xff0000)
        .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(message)
        );

    let reply;
    if (interaction.deferred || interaction.replied) {
        reply = await interaction.editReply({
            components: [errorContainer],
            flags: MessageFlags.IsComponentsV2,
            fetchReply: true
        });
    } else {
        reply = await interaction.reply({
            components: [errorContainer],
            flags: MessageFlags.IsComponentsV2,
            ephemeral: true,
            fetchReply: true
        });
    }
    
    if (deleteAfter > 0) {
        setTimeout(() => reply.delete().catch(() => {}), deleteAfter);
    }
    
    return reply;
}

async function sendSuccessResponse(interaction, message, color = null, deleteAfter = 3000) {
    const embedColor = getEmbedColor(color);
    const successContainer = new ContainerBuilder()
        .setAccentColor(embedColor)
        .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(message)
        );

    let reply;
    if (interaction.deferred || interaction.replied) {
        reply = await interaction.editReply({
            components: [successContainer],
            flags: MessageFlags.IsComponentsV2,
            fetchReply: true
        });
    } else {
        reply = await interaction.reply({
            components: [successContainer],
            flags: MessageFlags.IsComponentsV2,
            fetchReply: true
        });
    }
    
    if (deleteAfter > 0) {
        setTimeout(() => reply.delete().catch(() => {}), deleteAfter);
    }
    
    return reply;
}

async function handleCommandError(interaction, error, commandName, customMessage = null) {
    console.error(`Error processing ${commandName} command:`, error);
    
    const { getLang } = require('./languageLoader.js');
    const lang = getLang(interaction.guildId);
    
    const errorMessage = customMessage || 
        `${lang.utils.responseHandler.defaultError.title}\n\n` +
        `${lang.utils.responseHandler.defaultError.message}\n` +
        `${lang.utils.responseHandler.defaultError.note}`;
    
    const errorContainer = new ContainerBuilder()
        .setAccentColor(0xff0000)
        .addTextDisplayComponents(
            (textDisplay) => textDisplay.setContent(errorMessage)
        );

    try {
        if (interaction.deferred || interaction.replied) {
            const reply = await interaction.editReply({
                components: [errorContainer],
                flags: MessageFlags.IsComponentsV2,
                fetchReply: true
            });
            setTimeout(() => reply.delete().catch(() => {}), 5000);
            return reply;
        } else {
            const reply = await interaction.reply({
                components: [errorContainer],
                flags: MessageFlags.IsComponentsV2,
                ephemeral: true,
                fetchReply: true
            });
            setTimeout(() => reply.delete().catch(() => {}), 5000);
            return reply;
        }
    } catch (e) {
        return interaction.followUp({
            content: lang.utils.responseHandler.commandError.replace('{commandName}', commandName),
            ephemeral: true,
        }).catch(() => {});
    }
}

module.exports = {
    getEmbedColor,
    sendErrorResponse,
    sendSuccessResponse,
    handleCommandError
};

