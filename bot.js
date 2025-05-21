const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.js");
const fs = require("fs");
const path = require('path');
const ejs = require('ejs');
const { initializePlayer } = require('./player');
const { connectToDatabase } = require('./mongodb');
const colors = require('./UI/colors/colors');
require('dotenv').config();

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((a) => {
        return GatewayIntentBits[a];
    }),
});

client.config = config;
initializePlayer(client);

client.on("ready", () => {
    console.log(`${colors.cyan}[ SYSTEM ]${colors.reset} ${colors.green}Client logged as ${colors.yellow}${client.user.tag}${colors.reset}`);
    console.log(`${colors.cyan}[ MUSIC ]${colors.reset} ${colors.green}Riffy Music System Ready 🎵${colors.reset}`);
    console.log(`${colors.cyan}[ TIME ]${colors.reset} ${colors.gray}${new Date().toISOString().replace('T', ' ').split('.')[0]}${colors.reset}`);
    client.riffy.init(client.user.id);
});
client.config = config;

fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0]; 
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});


client.commands = [];
fs.readdir(config.commandsDir, (err, files) => {
  if (err) throw err;
  files.forEach(async (f) => {
    try {
      if (f.endsWith(".js")) {
        let props = require(`${config.commandsDir}/${f}`);
        client.commands.push({
          name: props.name,
          description: props.description,
          options: props.options,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
});


client.on("raw", (d) => {
    const { GatewayDispatchEvents } = require("discord.js");
    if (![GatewayDispatchEvents.VoiceStateUpdate, GatewayDispatchEvents.VoiceServerUpdate].includes(d.t)) return;
    client.riffy.updateVoiceState(d);
});

client.login(config.TOKEN || process.env.TOKEN).catch((e) => {
  console.log('\n' + '─'.repeat(40));
  console.log(`${colors.magenta}${colors.bright}🔐 TOKEN VERIFICATION${colors.reset}`);
  console.log('─'.repeat(40));
  console.log(`${colors.cyan}[ TOKEN ]${colors.reset} ${colors.red}Authentication Failed ❌${colors.reset}`);
  console.log(`${colors.gray}Error: Turn On Intents or Reset New Token${colors.reset}`);
});
connectToDatabase().then(() => {
  console.log('\n' + '─'.repeat(40));
  console.log(`${colors.magenta}${colors.bright}🕸️  DATABASE STATUS${colors.reset}`);
  console.log('─'.repeat(40));
  console.log(`${colors.cyan}[ DATABASE ]${colors.reset} ${colors.green}MongoDB Online ✅${colors.reset}`);
}).catch((err) => {
  console.log('\n' + '─'.repeat(40));
  console.log(`${colors.magenta}${colors.bright}🕸️  DATABASE STATUS${colors.reset}`);
  console.log('─'.repeat(40));
  console.log(`${colors.cyan}[ DATABASE ]${colors.reset} ${colors.red}Connection Failed ❌${colors.reset}`);
  console.log(`${colors.gray}Error: ${err.message}${colors.reset}`);
});

const express = require("express");
const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const imagePath = path.join(__dirname, 'index.html');
    res.sendFile(imagePath);
});

app.get('/setup', (req, res) => {
    // Sample data for the dashboard.
    // In a real implementation, this would come from client.riffy or other bot systems.
    const dashboardData = {
        currentSong: 'Example Song Title - Artist',
        queueLength: 5,
        botStatus: 'Online and Playing'
    };
    res.render('setup', dashboardData);
});

app.post('/configure-channel', (req, res) => {
    const { url, songName } = req.body;

    if (!url || !songName) {
        // In a real app, you'd render the setup page again with an error message
        return res.status(400).send('URL and Song Name are required.');
    }

    // For now, just log the received data.
    // Later, this will be expanded to save to config or database.
    console.log(`${colors.cyan}[ SETUP ]${colors.reset} Received URL: ${url}, Song Name: ${songName}`);

    // Redirect back to the setup page, perhaps with a success query parameter
    // For simplicity, just redirecting back.
    // In a full application, you might want to add a success message.
    res.redirect('/setup');
});

app.listen(port, () => {
    console.log('\n' + '─'.repeat(40));
    console.log(`${colors.magenta}${colors.bright}🌐 SERVER STATUS${colors.reset}`);
    console.log('─'.repeat(40));
    console.log(`${colors.cyan}[ SERVER ]${colors.reset} ${colors.green}Online ✅${colors.reset}`);
    console.log(`${colors.cyan}[ PORT ]${colors.reset} ${colors.yellow}http://localhost:${port}${colors.reset}`);
    console.log(`${colors.cyan}[ TIME ]${colors.reset} ${colors.gray}${new Date().toISOString().replace('T', ' ').split('.')[0]}${colors.reset}`);
    console.log(`${colors.cyan}[ USER ]${colors.reset} ${colors.yellow}GlaceYT${colors.reset}`);
});
