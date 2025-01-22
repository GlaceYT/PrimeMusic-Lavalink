module.exports = {
    footer: "Developed by SSRR | Prime Music v1.2",
    ping: {
      description: "Check the bot latency",
      response: "Pinging...",
      embed: {
        title: "Bot Latency",
        responseTime: "- Bot Response Time : **{latency}ms**",
        websocketPing: "- WebSocket Ping : **{ping}ms**",
        uptime: "- Uptime : **{uptime}**",
        footer: "Developed by SSRR | Prime Music v1.2"
      }
    },
    addsong: {
      embed: {
          playlistNotFound: "Playlist Not Found",
          playlistNotFoundDescription: "- Playlist not found.",
          accessDenied: "Access Denied",
          accessDeniedDescription: "- You do not have permission to add songs to this playlist.",
          songAdded: "Song Added",
          songAddedDescription: "- Song **{songInput}** has been added to playlist **{playlistName}**.",
          error: "Error",
          errorDescription: "- An error occurred while adding the song."
      }
  },
  allplaylists: {
    embed: {
        noPlaylistsFound: "No Playlists Found",
        noPlaylistsFoundDescription: "- No public playlists are currently available.",
        createdBy: "Created by: {userId}",
        serverName: "Server: {serverName}",
        songs: "Songs: **{songCount}**",
        publicPlaylistsTitle: "Public Playlists (Page {currentPage}/{totalPages})",
        error: "Error",
        errorDescription: "- An error occurred while fetching the playlists."
    }
  },
  autoplay: {
    embed: {
        autoplayUpdated: "Autoplay Updated",
        autoplayStatus: "- Autoplay has been **{status}** for this server.",
        enabled: "enabled",
        disabled: "disabled",
        error: "Error",
        errorDescription: "- An error occurred while updating autoplay."
    },
    commandDescription: "Enable or disable autoplay"
  },
  createplaylist: {
    embed: {
        playlistExists: "Playlist Exists",
        playlistExistsDescription: "- A playlist with this name already exists.",
        playlistCreated: "Playlist Created",
        playlistCreatedDescription: "- Playlist **{playlistName}** has been created.\n- Visibility: **{visibility}**.",
        private: "Private",
        public: "Public",
        error: "Error",
        errorDescription: "- An error occurred while creating the playlist."
    },
    commandDescriptionName: "Enter playlist name",
    commandDescriptionPrivate: "Set playlist as private (visible only to you)"
  },
  deleteplaylist: {
    embed: {
        playlistNotFound: "Playlist Not Found",
        playlistNotFoundDescription: "- Playlist not found.",
        accessDenied: "Access Denied",
        accessDeniedDescription: "- You do not have permission to delete this playlist.",
        playlistDeleted: "Playlist Deleted",
        playlistDeletedDescription: "- Playlist **{playlistName}** has been deleted.",
        error: "Error",
        errorDescription: "- An error occurred while deleting the playlist."
    },
    commandDescriptionName: "Enter playlist name"
  },
  deletesong: {
    embed: {
        playlistNotFound: "Playlist Not Found",
        playlistNotFoundDescription: "- Playlist not found.",
        songDeleted: "Song Deleted",
        songDeletedDescription: "- Song **{songName}** has been deleted from playlist **{playlistName}**.",
        error: "Error",
        errorDescription: "- An error occurred while deleting the song."
    },
    commandDescriptionPlaylist: "Enter playlist name",
    commandDescriptionSong: "Enter song name"
  },
  filters: {
    embed: {
        error: "Error",
        noPlayer: "- No active player found. Please play a song first.",
        wrongChannel: "- You need to be in the same voice channel as the bot to use this command.",
        filtersCleared: "All filters have been cleared.",
        invalidFilter: "Invalid filter selected.",
        filterApplied: "Filter **{filter}** has been applied.",
        errorProcessing: "- An error occurred while processing your request."
    },
    commandDescription: "Select a filter to apply"
  },
  help: {
    embed: {
        title: "📜 {botName} Help Menu",
        author: "Help",
        description: `
        **Welcome to {botName}!**

        > Your ultimate music companion on Discord.
        > Below is detailed information about the bot:
                
        **📂 Commands:** {totalCommands}
        **🌐 Servers:** {totalServers}
        **👥 Users:** {totalUsers}
        **⏳ Uptime:** {uptimeString}
        **📡 Ping:** {ping}ms
        `,
        availableCommands: "Available Commands",
        noDescription: "No description available.",
        noCommands: "No commands found.",
        error: "❌ An error occurred while fetching the help menu."
    },
    commandDescription: "Get information about the bot"
  },
  myplaylists: {
    embed: {
        noPlaylistsFound: "No Playlists Found",
        noPlaylistsFoundDescription: "- You have not created any playlists.",
        yourPlaylistsTitle: "Your Playlists (Page {currentPage}/{totalPages})",
        visibility: "Visibility",
        private: "Private",
        public: "Public",
        server: "Server",
        songs: "Songs",
        error: "Error",
        errorDescription: "- An error occurred while fetching your playlists."
    }
  },
  nowPlaying: {
    embed: {
        error: "Error",
        noSong: "- There is no song currently playing.",
        nowPlaying: "Now Playing!",
        errorDescription: "- An error occurred while processing your request."
    }
  },
  pause: {
    embed: {
        error: "Error",
        noActivePlayer: "- No active player found.",
        paused: "Paused!",
        pausedDescription: "**- Playback has been paused!**",
        errorDescription: "- An error occurred while processing your request."
    }
  },
  play: {
    embed: {
        error: "Error",
        noVoiceChannel: "- You need to be in a voice channel to use this command.",
        noLavalinkNodes: "- No available Lavalink nodes to process the request.",
        noResults: "- No results found.",
        requestUpdated: "Request Updated!",
        successProcessed: "- Your request has been successfully processed.\n- Please use buttons to control playback",
        errorProcessing: "- An error occurred while processing your request."
    },
    commandDescription: "Enter song name / link or playlist"
  },
  playCustomPlaylist: {
    embed: {
        error: "Error",
        noVoiceChannel: "- You need to be in a voice channel to use this command.",
        playlistNotFound: "- Playlist not found.",
        accessDenied: "Access Denied",
        noPermission: "- You do not have permission to play this private playlist.",
        emptyPlaylist: "- The playlist is empty.",
        playingPlaylist: "Playing Playlist!",
        playlistPlaying: "- Playlist **{playlistName}** is now playing.\n- Please use buttons to control playback",
        errorResolvingSong: "- Error resolving song.",
        errorPlayingPlaylist: "- An error occurred while playing the playlist."
    },
    commandDescription: "Enter playlist name"
  },
  queue: {
    embed: {
        queueEmpty: "Queue is Empty",
        queueEmptyDescription: "- The queue is currently empty. Add songs using the `/play` command.",
        currentQueue: "Current Queue",
        noMoreSongs: "- No more songs in the queue.",
        error: "Error",
        errorDescription: "- An error occurred while retrieving the queue."
    }
  },
  remove: {
    embed: {
        queueEmpty: "Queue is Empty",
        queueEmptyDescription: "- The queue is currently empty. Add songs using the `/play` command.",
        invalidPosition: "Error",
        invalidPositionDescription: "- Invalid position. Enter a number between 1 and {queueLength}.",
        songRemoved: "Song Removed",
        songRemovedDescription: "- Removed song: **{songTitle}** from the queue.",
        error: "Error",
        errorDescription: "- An error occurred while removing the song from the queue."
    }
  },
  resume: {
    embed: {
        noActivePlayer: "Error",
        noActivePlayerDescription: "- No active player found.",
        resumed: "Resumed!",
        resumedDescription: "**- Playback has been resumed!**",
        error: "Error",
        errorDescription: "- An error occurred while processing your request."
    }
  },
  showsongs: {
    embed: {
        error: "Error",
        playlistNotFound: "- Playlist not found.",
        accessDenied: "Access Denied",
        noPermission: "- You do not have permission to view this private playlist.",
        noSongs: "- No songs in this playlist.",
        songsInPlaylist: "Songs in {playlistName}",
        songsInPlaylistPage: "Songs in {playlistName} (Page {currentPage}/{totalPages})",
        errorDescription: "- An error occurred while showing the songs."
    }
  },
  shuffle: {
    embed: {
        queueEmpty: "Queue is Empty",
        queueEmptyDescription: "- The queue is currently empty. Add songs using the `/play` command.",
        queueShuffled: "Queue Shuffled",
        queueShuffledDescription: "- The queue has been shuffled successfully.",
        error: "Error",
        errorDescription: "- An error occurred while shuffling the queue."
    }
  },
  skip: {
    embed: {
        noActivePlayer: "Error",
        noActivePlayerDescription: "- No active player found.",
        songSkipped: "Song Skipped!",
        songSkippedDescription: "**- Player will play the next song!**",
        error: "Error",
        errorDescription: "- An error occurred while processing your request."
    }
  },
  stop: {
    embed: {
        noActivePlayer: "Error",
        noActivePlayerDescription: "- No active player found.",
        musicHalted: "Music Halted!",
        musicHaltedDescription: "**- Playback has been stopped and player destroyed!**",
        error: "Error",
        errorDescription: "- An error occurred while processing your request."
    }
  },
  support: {
    embed: {
        authorName: "Support Server",
        description: "➡️ **Join our Discord server for support and updates:**\n- Discord - {supportServerLink}\n\n➡️ **Follow us on:**\n- GitHub - {githubLink}\n- Replit - {replitLink}\n- YouTube - {youtubeLink}",
        error: "Error",
        errorDescription: "- An error occurred while processing your request."
    }
  },
  volume: {
    embed: {
        noActivePlayer: "Error",
        noActivePlayerDescription: "- No active player found.",
        volumeUpdated: "Volume Updated!",
        volumeUpdatedDescription: "- Volume has been set to **{volume}%**",
        error: "Error",
        errorDescription: "An error occurred while setting the volume."
    },
    volumeRangeError: "Volume level must be between 0 and 100."
  },
    errors: {
      noPermission: "You don't have permission to use this command.",
      generalError: "- Error: {error}"
    }
  };

  