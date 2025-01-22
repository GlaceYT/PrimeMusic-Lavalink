const { MongoClient } = require('mongodb');
const colors = require('./UI/colors/colors');
const config = require("./config.js");
require('dotenv').config();

let client; 

if (config.mongodbUri) {
    const uri = config.mongodbUri;
    client = new MongoClient(uri);
} else {
    console.warn("\x1b[33m[ WARNING ]\x1b[0m MongoDB URI is not defined in the configuration.");
}

async function connectToDatabase() {
    if (!client) {
        console.warn("\x1b[33m[ WARNING ]\x1b[0m Skipping MongoDB connection as URI is not provided.");
        return;
    }

    try {
        await client.connect();
        console.log('\n' + '─'.repeat(40));
        console.log(`${colors.magenta}${colors.bright}🕸️  DATABASE CONNECTION${colors.reset}`);
        console.log('─'.repeat(40));
        console.log('\x1b[36m[ DATABASE ]\x1b[0m', '\x1b[32mConnected to MongoDB ✅\x1b[0m');
    } catch (err) {
        console.warn("\x1b[33m[ WARNING ]\x1b[0m Could not connect to MongoDB. Continuing without database functionality.");
        console.error(err.message); // Optional: log detailed error message
    }
}

const db = client ? client.db("PrimeMusicSSRR") : null;
const playlistCollection = db ? db.collection("SongPlayLists") : null;
const autoplayCollection = db ? db.collection("AutoplaySettings") : null;

module.exports = {
    connectToDatabase,
    playlistCollection,
    autoplayCollection,
};
