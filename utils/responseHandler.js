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
    
    const { getLang, getLangSync } = require('./languageLoader.js');

    const lang = await getLang(interaction.guildId).catch(() => {
   
        return getLangSync();
    });
    

    const utils = lang?.utils || {};
    const responseHandler = utils?.responseHandler || {
        defaultError: {
            title: "## ❌ Error",
            message: "An error occurred while processing the command.",
            note: "Please try again later."
        },
        commandError: "❌ An error occurred while processing the {commandName} command."
    };
    
    const errorMessage = customMessage || 
        `${responseHandler.defaultError.title}\n\n` +
        `${responseHandler.defaultError.message}\n` +
        `${responseHandler.defaultError.note}`;
    
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
        const errorText = responseHandler.commandError.replace('{commandName}', commandName);
        return interaction.followUp({
            content: errorText,
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

