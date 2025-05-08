module.exports = {
  TOKEN: "",
  language: "cn",
  ownerID: ["1004206704994566164", ""], 
  mongodbUri : "mongodb+srv://andy:Zgy20041019@cluster0.e4tq97t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  spotifyClientId : "",
  spotifyClientSecret : "",
  setupFilePath: './commands/setup.json',
  commandsDir: './commands',  
  embedColor: "#1db954",
  activityName: "YouTube Music", 
  activityType: "LISTENING",  // Available activity types : LISTENING , PLAYING
  SupportServer: "https://discord.gg/xQF9f9yUEM",
  embedTimeout: 5, 
  errorLog: "", 
  nodes: [
    {
      name: "GlaceYT",
      password: "glaceyt",
      host: "193.226.78.187",
      port: 3543,
      secure: false
    }
  ],
  lavalink: {
      name: "GlaceYT",
      password: "glaceyt",
      host: "193.226.78.187",
      port:  3543,
      secure: false
    }
};
