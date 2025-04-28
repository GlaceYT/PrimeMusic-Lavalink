const { Client, GatewayIntentBits } = require("discord.js");
const { connectToDatabase } = require("./mongodb");
const config = require("./config.js");
const fs = require("fs");
const path = require('path');
const { initializePlayer } = require('./player');
const colors = require('./UI/colors/colors');
require('dotenv').config();
const express = require("express");

async function startBot() {
  try {
    // First: Connect database and wait for it
    await connectToDatabase();
    console.log("✅ MongoDB Connected!");

    // Then: Create client and login
    const client = new Client({
      intents: Object.keys(GatewayIntentBits).map((a) => GatewayIntentBits[a]),
    });

    client.config = config;

    initializePlayer(client); // Riffy setup here (after Mongo ready!)

    client.on("ready", () => {
      console.log(`${colors.cyan}[ SYSTEM ]${colors.reset} ${colors.green}Logged in as ${client.user.tag}${colors.reset}`);
    });

    await client.login(config.TOKEN || process.env.TOKEN); // Login after database is ready

    setupExpressServer(); // Start express only after bot started
  } catch (err) {
    console.error("Startup error:", err);
  }
}

function setupExpressServer() {
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    const imagePath = path.join(__dirname, 'index.html');
    res.sendFile(imagePath);
  });

  app.listen(port, () => {
    console.log(`🌐 Web server online at http://localhost:${port}`);
  });
}

// Start everything
startBot();
