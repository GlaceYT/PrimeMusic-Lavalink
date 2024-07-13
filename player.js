const { Riffy } = require("riffy");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { queueNames, requesters } = require("./commands/play");
const { mewcard } = require("mewcard");
const config = require("./config.js");

function initializePlayer(client) {
    const nodes = [
        {
            host: "37.114.42.191",
            port: 6767,
            password: "danteisnttaken",
            reconnectTimeout: 5000,
            reconnectTries: Infinity,
            secure: false
        },
    ];

    client.riffy = new Riffy(client, nodes, {
        send: (payload) => {
            const guildId = payload.d.guild_id;
            if (!guildId) return;

            const guild = client.guilds.cache.get(guildId);
            if (guild) guild.shard.send(payload);
        },
        defaultSearchPlatform: "ytmsearch",
        restVersion: "v3"
    });

    client.riffy.on("nodeConnect", node => {
        console.log(`Node "${node.name}" connected.`);
    });

    client.riffy.on("nodeError", (node, error) => {
        console.error(`Node "${node.name}" encountered an error: ${error.message}.`);
    });

    client.riffy.on("trackStart", async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        const trackUri = track.info.uri;
        const requester = requesters.get(trackUri);
        const streamProvider = track.info.sourceName.charAt(0).toUpperCase() + track.info.sourceName.slice(1);

        const card = new mewcard()
            .setName(track.info.title)
            .setAuthor(track.info.author)
            .setTheme(config.musicardTheme)
            .setBrightness(50)
            .setThumbnail(track.info.thumbnail)
            .setRequester(`${requester}`);

        const buffer = await card.build();
        const attachment = new AttachmentBuilder(buffer, { name: `musicard.png` });

        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Now Playing',
                iconURL: config.MusicIcon
            })
            .setDescription('🎶 **Controls:**\n 🔁 `Loop`, ❌ `Disable`, ⏭️ `Skip`, 📜 `Queue`, 🗑️ `Clear`\n ⏹️ `Stop`, ⏸️ `Pause`, ▶️ `Resume`, 🔊 `Vol Up`, 🔉 `Vol Down`')
            .setImage('attachment://musicard.png')
            .setColor(config.embedColor);

        const loopButton = new ButtonBuilder()
            .setCustomId("loopToggle")
            .setEmoji('🔁')
            .setStyle(ButtonStyle.Secondary);

        const disableLoopButton = new ButtonBuilder()
            .setCustomId("disableLoop")
            .setEmoji('❌')
            .setStyle(ButtonStyle.Secondary);

        const skipButton = new ButtonBuilder()
            .setCustomId("skipTrack")
            .setEmoji('⏭️')
            .setStyle(ButtonStyle.Secondary);

        const showQueueButton = new ButtonBuilder()
            .setCustomId("showQueue")
            .setEmoji('📜')
            .setStyle(ButtonStyle.Secondary);

        const clearQueueButton = new ButtonBuilder()
            .setCustomId("clearQueue")
            .setEmoji('🗑️')
            .setStyle(ButtonStyle.Secondary);

        const stopButton = new ButtonBuilder()
            .setCustomId("stopTrack")
            .setEmoji('⏹️')
            .setStyle(ButtonStyle.Danger);

        const pauseButton = new ButtonBuilder()
            .setCustomId("pauseTrack")
            .setEmoji('⏸️')
            .setStyle(ButtonStyle.Secondary);

        const resumeButton = new ButtonBuilder()
            .setCustomId("resumeTrack")
            .setEmoji('▶️')
            .setStyle(ButtonStyle.Secondary);

        const volumeUpButton = new ButtonBuilder()
            .setCustomId("volumeUp")
            .setEmoji('🔊')
            .setStyle(ButtonStyle.Secondary);

        const volumeDownButton = new ButtonBuilder()
            .setCustomId("volumeDown")
            .setEmoji('🔉')
            .setStyle(ButtonStyle.Secondary);

        const actionRow1 = new ActionRowBuilder()
            .addComponents(loopButton, disableLoopButton, skipButton, showQueueButton, clearQueueButton);

        const actionRow2 = new ActionRowBuilder()
            .addComponents(stopButton, pauseButton, resumeButton, volumeUpButton, volumeDownButton);

        const message = await channel.send({ embeds: [embed], files: [attachment], components: [actionRow1, actionRow2] });

        const filter = i => [
            'loopToggle', 'skipTrack', 'disableLoop', 'showQueue', 'clearQueue',
            'stopTrack', 'pauseTrack', 'resumeTrack', 'volumeUp', 'volumeDown'
        ].includes(i.customId);

        const collector = message.createMessageComponentCollector({ filter, time: 180000 });

        setTimeout(() => {
            const disabledRow1 = new ActionRowBuilder()
                .addComponents(
                    loopButton.setDisabled(true),
                    disableLoopButton.setDisabled(true),
                    skipButton.setDisabled(true),
                    showQueueButton.setDisabled(true),
                    clearQueueButton.setDisabled(true)
                );

            const disabledRow2 = new ActionRowBuilder()
                .addComponents(
                    stopButton.setDisabled(true),
                    pauseButton.setDisabled(true),
                    resumeButton.setDisabled(true),
                    volumeUpButton.setDisabled(true),
                    volumeDownButton.setDisabled(true)
                );

            message.edit({ components: [disabledRow1, disabledRow2] })
                .catch(console.error);
        }, 180000);

        collector.on('collect', async i => {
            await i.deferUpdate();
            if (i.customId === 'loopToggle') {
                toggleLoop(player, channel);
            } else if (i.customId === 'skipTrack') {
                player.stop();
                const skipEmbed = new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setTitle("⏭️ **Player will play the next song!**")
                    .setTimestamp();

                await channel.send({ embeds: [skipEmbed] });
            } else if (i.customId === 'disableLoop') {
                disableLoop(player, channel);
            } else if (i.customId === 'showQueue') {
                const queueMessage = queueNames.length > 0 ?
                    `🎵 **Now Playing:**\n${formatTrack(queueNames[0])}\n\n📜 **Queue:**\n${queueNames.slice(1).map((song, index) => `${index + 1}. ${formatTrack(song)}`).join('\n')}` :
                    "The queue is empty.";
                const queueEmbed = new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setTitle("📜 **Current Queue**")
                    .setDescription(queueMessage);

                await channel.send({ embeds: [queueEmbed] });
            } else if (i.customId === 'clearQueue') {
                clearQueue(player);
                const clearQueueEmbed = new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setTitle("🗑️ **Queue has been cleared!**")
                    .setTimestamp();

                await channel.send({ embeds: [clearQueueEmbed] });
            } else if (i.customId === 'stopTrack') {
                player.stop();
                player.destroy();
                const stopEmbed = new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setDescription('⏹️ **Playback has been stopped and player destroyed!**');

                await channel.send({ embeds: [stopEmbed] });
            } else if (i.customId === 'pauseTrack') {
                player.pause(true);
                const pauseEmbed = new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setDescription('⏸️ **Playback has been paused!**');

                await channel.send({ embeds: [pauseEmbed] });
            } else if (i.customId === 'resumeTrack') {
                player.pause(false);
                const resumeEmbed = new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setDescription('▶️ **Playback has been resumed!**');

                await channel.send({ embeds: [resumeEmbed] });
            } else if (i.customId === 'volumeUp') {
                if (player.volume < 100) {
                    const oldVolume = player.volume;
                    player.setVolume(Math.min(player.volume + 10, 100));
                    const volumeUpEmbed = new EmbedBuilder()
                        .setColor(config.embedColor)
                        .setDescription(`🔊 **Volume increased by ${player.volume - oldVolume}% to ${player.volume}!**`);

                    await channel.send({ embeds: [volumeUpEmbed] });
                } else {
                    const maxVolumeEmbed = new EmbedBuilder()
                        .setColor(config.embedColor)
                        .setDescription('🔊 **Volume is already at maximum!**');

                    await channel.send({ embeds: [maxVolumeEmbed] });
                }
            } else if (i.customId === 'volumeDown') {
                if (player.volume > 10) {
                    const oldVolume = player.volume;
                    player.setVolume(Math.max(player.volume - 10, 10));
                    const volumeDownEmbed = new EmbedBuilder()
                        .setColor(config.embedColor)
                        .setDescription(`🔉 **Volume decreased by ${oldVolume - player.volume}% to ${player.volume}!**`);

                    await channel.send({ embeds: [volumeDownEmbed] });
                } else {
                    const minVolumeEmbed = new EmbedBuilder()
                        .setColor(config.embedColor)
                        .setDescription('🔉 **Volume is already at minimum!**');

                    await channel.send({ embeds: [minVolumeEmbed] });
                }
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    });

    client.riffy.on("queueEnd", async (player) => {
        const channel = client.channels.cache.get(player.textChannel);
        const autoplay = false;

        if (autoplay) {
            player.autoplay(player);
        } else {
            player.destroy();
            const queueEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setDescription('**Queue Songs ended! Disconnecting Bot!**');

            await channel.send({ embeds: [queueEmbed] });
        }
    });

    function toggleLoop(player, channel) {
        if (player.loop === "track") {
            player.setLoop("queue");
            const loopEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle("🔁 **Queue loop is activated!**");
            channel.send({ embeds: [loopEmbed] });
        } else {
            player.setLoop("track");
            const loopEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle("🔁 **Track loop is activated!**");
            channel.send({ embeds: [loopEmbed] });
        }
    }

    function disableLoop(player, channel) {
        player.setLoop("none");
        const loopEmbed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle("❌ **Loop is disabled!**");
        channel.send({ embeds: [loopEmbed] });
    }

    function setLoop(player, loopType) {
        if (loopType === "track") {
            player.setLoop("track");
        } else if (loopType === "queue") {
            player.setLoop("queue");
        } else {
            player.setLoop("none");
        }
    }

    function clearQueue(player) {
        player.queue.clear();
        queueNames.length = 0;
    }
    
    function formatTrack(track) {
        const match = track.match(/\[(.*?) - (.*?)\]\((.*?)\)/);
        if (match) {
            const [, title, author, uri] = match;
            return `[${title} - ${author}](${uri})`;
        }
        return track; 
    }

    module.exports = { initializePlayer, setLoop, clearQueue ,formatTrack };
}

module.exports = { initializePlayer };