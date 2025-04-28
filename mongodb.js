const { MongoClient } = require('mongodb');
const colors = require('./UI/colors/colors');
const config = require("./config.js");
require('dotenv').config();

let client;
let db;
let playlistCollection;
let autoplayCollection;

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
        db = client.db("PrimeMusicSSRR"); // <== MOVE inside here
        playlistCollection = db.collection("SongPlayLists"); // <== MOVE inside here
        autoplayCollection = db.collection("AutoplaySettings"); // <== MOVE inside here

        console.log('\n' + '─'.repeat(40));
        console.log(`${colors.magenta}${colors.bright}🕸️  DATABASE CONNECTION${colors.reset}`);
        console.log('─'.repeat(40));
        console.log('\x1b[36m[ DATABASE ]\x1b[0m', '\x1b[32mConnected to MongoDB ✅\x1b[0m');
    } catch (err) {
        console.warn("\x1b[33m[ WARNING ]\x1b[0m Could not connect to MongoDB. Continuing without database functionality.");
        console.error(err.message);
    }
}

function getPlaylistCollection() {
    if (!playlistCollection) throw new Error("Database not connected yet!");
    return playlistCollection;
}

function getAutoplayCollection() {
    if (!autoplayCollection) throw new Error("Database not connected yet!");
    return autoplayCollection;
}

module.exports = {
    connectToDatabase,
    getPlaylistCollection,
    getAutoplayCollection,
};
