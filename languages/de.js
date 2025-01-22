module.exports = {
    footer: "Entwickelt von SSRR | Prime Music v1.2",
    ping: {
      description: "Prüfe die Bot-Latenz",
      response: "Ping wird gemessen...",
      embed: {
        title: "Bot-Latenz",
        responseTime: "- Bot-Antwortzeit: **{latency}ms**",
        websocketPing: "- WebSocket-Ping: **{ping}ms**",
        uptime: "- Betriebszeit: **{uptime}**",
        footer: "Entwickelt von SSRR | Prime Music v1.2"
      }
    },
    addsong: {
      embed: {
          playlistNotFound: "Playlist Nicht Gefunden",
          playlistNotFoundDescription: "- Playlist wurde nicht gefunden.",
          accessDenied: "Zugriff Verweigert",
          accessDeniedDescription: "- Sie haben keine Berechtigung, Lieder zu dieser Playlist hinzuzufügen.",
          songAdded: "Lied Hinzugefügt",
          songAddedDescription: "- Das Lied **{songInput}** wurde zur Playlist **{playlistName}** hinzugefügt.",
          error: "Fehler",
          errorDescription: "- Beim Hinzufügen des Liedes ist ein Fehler aufgetreten."
      }
    },
    allplaylists: {
      embed: {
          noPlaylistsFound: "Keine Playlists Gefunden",
          noPlaylistsFoundDescription: "- Derzeit sind keine öffentlichen Playlists verfügbar.",
          createdBy: "Erstellt von: {userId}",
          serverName: "Server: {serverName}",
          songs: "Lieder: **{songCount}**",
          publicPlaylistsTitle: "Öffentliche Playlists (Seite {currentPage}/{totalPages})",
          error: "Fehler",
          errorDescription: "- Beim Abrufen der Playlists ist ein Fehler aufgetreten."
      }
    },
    autoplay: {
      embed: {
          autoplayUpdated: "Automatische Wiedergabe Aktualisiert",
          autoplayStatus: "- Die automatische Wiedergabe wurde für diesen Server **{status}**.",
          enabled: "aktiviert",
          disabled: "deaktiviert",
          error: "Fehler",
          errorDescription: "- Beim Aktualisieren der automatischen Wiedergabe ist ein Fehler aufgetreten."
      },
      commandDescription: "Automatische Wiedergabe aktivieren oder deaktivieren"
    },
    createplaylist: {
      embed: {
          playlistExists: "Playlist Existiert Bereits",
          playlistExistsDescription: "- Eine Playlist mit diesem Namen existiert bereits.",
          playlistCreated: "Playlist Erstellt",
          playlistCreatedDescription: "- Die Playlist **{playlistName}** wurde erstellt.\n- Sichtbarkeit: **{visibility}**.",
          private: "Privat",
          public: "Öffentlich",
          error: "Fehler",
          errorDescription: "- Beim Erstellen der Playlist ist ein Fehler aufgetreten."
      },
      commandDescriptionName: "Geben Sie den Namen der Playlist ein",
      commandDescriptionPrivate: "Playlist als privat festlegen (nur für Sie sichtbar)"
    },
    deleteplaylist: {
      embed: {
          playlistNotFound: "Playlist Nicht Gefunden",
          playlistNotFoundDescription: "- Playlist wurde nicht gefunden.",
          accessDenied: "Zugriff Verweigert",
          accessDeniedDescription: "- Sie haben keine Berechtigung, diese Playlist zu löschen.",
          playlistDeleted: "Playlist Gelöscht",
          playlistDeletedDescription: "- Die Playlist **{playlistName}** wurde gelöscht.",
          error: "Fehler",
          errorDescription: "- Beim Löschen der Playlist ist ein Fehler aufgetreten."
      },
      commandDescriptionName: "Geben Sie den Namen der Playlist ein"
    },
    deletesong: {
      embed: {
          playlistNotFound: "Playlist Nicht Gefunden",
          playlistNotFoundDescription: "- Playlist wurde nicht gefunden.",
          songDeleted: "Lied Gelöscht",
          songDeletedDescription: "- Das Lied **{songName}** wurde aus der Playlist **{playlistName}** gelöscht.",
          error: "Fehler",
          errorDescription: "- Beim Löschen des Liedes ist ein Fehler aufgetreten."
      },
      commandDescriptionPlaylist: "Geben Sie den Namen der Playlist ein",
      commandDescriptionSong: "Geben Sie den Namen des Liedes ein"
    },
    filters: {
      embed: {
          error: "Fehler",
          noPlayer: "- Kein aktiver Player gefunden. Bitte spielen Sie zuerst ein Lied ab.",
          wrongChannel: "- Sie müssen sich im gleichen Sprachkanal wie der Bot befinden, um diesen Befehl zu nutzen.",
          filtersCleared: "Alle Filter wurden entfernt.",
          invalidFilter: "Ungültiger Filter ausgewählt.",
          filterApplied: "Der Filter **{filter}** wurde angewendet.",
          errorProcessing: "- Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten."
      },
      commandDescription: "Wählen Sie einen Filter zum Anwenden"
    },
    help: {
      embed: {
          title: "📜 {botName} Hilfe-Menü",
          author: "Hilfe",
          description: `
          **Willkommen bei {botName}!**

          > Ihr ultimativer Musik-Begleiter auf Discord.
          > Hier sind die detaillierten Informationen zum Bot:
                  
          **📂 Befehle:** {totalCommands}
          **🌐 Server:** {totalServers}
          **👥 Benutzer:** {totalUsers}
          **⏳ Betriebszeit:** {uptimeString}
          **📡 Ping:** {ping}ms
          `,
          availableCommands: "Verfügbare Befehle",
          noDescription: "Keine Beschreibung verfügbar.",
          noCommands: "Keine Befehle gefunden.",
          error: "❌ Beim Abrufen des Hilfe-Menüs ist ein Fehler aufgetreten."
      },
      commandDescription: "Informationen über den Bot erhalten"
    },
    myplaylists: {
      embed: {
          noPlaylistsFound: "Keine Playlists Gefunden",
          noPlaylistsFoundDescription: "- Sie haben noch keine Playlists erstellt.",
          yourPlaylistsTitle: "Ihre Playlists (Seite {currentPage}/{totalPages})",
          visibility: "Sichtbarkeit",
          private: "Privat",
          public: "Öffentlich",
          server: "Server",
          songs: "Lieder",
          error: "Fehler",
          errorDescription: "- Beim Abrufen Ihrer Playlists ist ein Fehler aufgetreten."
      }
    },
    nowPlaying: {
      embed: {
          error: "Fehler",
          noSong: "- Derzeit wird kein Lied abgespielt.",
          nowPlaying: "Aktuell Gespielt!",
          errorDescription: "- Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten."
      }
    },
    pause: {
      embed: {
          error: "Fehler",
          noActivePlayer: "- Kein aktiver Player gefunden.",
          paused: "Pausiert!",
          pausedDescription: "**- Die Wiedergabe wurde pausiert!**",
          errorDescription: "- Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten."
      }
    },
    play: {
      embed: {
          error: "Fehler",
          noVoiceChannel: "- Sie müssen sich in einem Sprachkanal befinden, um diesen Befehl zu nutzen.",
          noLavalinkNodes: "- Keine verfügbaren Lavalink-Nodes zur Verarbeitung der Anfrage.",
          noResults: "- Keine Ergebnisse gefunden.",
          requestUpdated: "Anfrage Aktualisiert!",
          successProcessed: "- Ihre Anfrage wurde erfolgreich verarbeitet.\n- Bitte nutzen Sie die Schaltflächen zur Steuerung der Wiedergabe",
          errorProcessing: "- Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten."
      },
      commandDescription: "Geben Sie den Lied-Namen / Link oder Playlist ein"
    },
    playCustomPlaylist: {
      embed: {
          error: "Fehler",
          noVoiceChannel: "- Sie müssen sich in einem Sprachkanal befinden, um diesen Befehl zu nutzen.",
          playlistNotFound: "- Playlist nicht gefunden.",
          accessDenied: "Zugriff Verweigert",
          noPermission: "- Sie haben keine Berechtigung, diese private Playlist abzuspielen.",
          emptyPlaylist: "- Die Playlist ist leer.",
          playingPlaylist: "Playlist wird Abgespielt!",
          playlistPlaying: "- Die Playlist **{playlistName}** wird jetzt abgespielt.\n- Bitte nutzen Sie die Schaltflächen zur Steuerung der Wiedergabe",
          errorResolvingSong: "- Fehler beim Auflösen des Liedes.",
          errorPlayingPlaylist: "- Beim Abspielen der Playlist ist ein Fehler aufgetreten."
      },
      commandDescription: "Geben Sie den Namen der Playlist ein"
    },
    queue: {
      embed: {
          queueEmpty: "Warteschlange Leer",
          queueEmptyDescription: "- Die Warteschlange ist derzeit leer. Fügen Sie Lieder mit dem `/play`-Befehl hinzu.",
          currentQueue: "Aktuelle Warteschlange",
          noMoreSongs: "- Keine weiteren Lieder in der Warteschlange.",
          error: "Fehler",
          errorDescription: "- Beim Abrufen der Warteschlange ist ein Fehler aufgetreten."
      }
    },
    remove: {
      embed: {
          queueEmpty: "Warteschlange Leer",
          queueEmptyDescription: "- Die Warteschlange ist derzeit leer. Fügen Sie Lieder mit dem `/play`-Befehl hinzu.",
          invalidPosition: "Fehler",
          invalidPositionDescription: "- Ungültige Position. Geben Sie eine Zahl zwischen 1 und {queueLength} ein.",
          songRemoved: "Lied Entfernt",
          songRemovedDescription: "- Lied entfernt: **{songTitle}** aus der Warteschlange.",
          error: "Fehler",
          errorDescription: "- Beim Entfernen des Liedes aus der Warteschlange ist ein Fehler aufgetreten."
      }
    },
    resume: {
      embed: {
          noActivePlayer: "Fehler",
          noActivePlayerDescription: "- Kein aktiver Player gefunden.",
          resumed: "Fortgesetzt!",
          resumedDescription: "**- Die Wiedergabe wurde fortgesetzt!**",
          error: "Fehler",
          errorDescription: "- Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten."
      }
    },
    showsongs: {
      embed: {
          error: "Fehler",
          playlistNotFound: "- Playlist nicht gefunden.",
          accessDenied: "Zugriff Verweigert",
          noPermission: "- Sie haben keine Berechtigung, diese private Playlist anzusehen.",
          noSongs: "- Keine Lieder in dieser Playlist.",
          songsInPlaylist: "Lieder in {playlistName}",
          songsInPlaylistPage: "Lieder in {playlistName} (Seite {currentPage}/{totalPages})",
          errorDescription: "- Beim Anzeigen der Lieder ist ein Fehler aufgetreten."
      }
    },
    shuffle: {
      embed: {
          queueEmpty: "Warteschlange Leer",
          queueEmptyDescription: "- Die Warteschlange ist derzeit leer. Fügen Sie Lieder mit dem `/play`-Befehl hinzu.",
          queueShuffled: "Warteschlange Gemischt",
          queueShuffledDescription: "- Die Warteschlange wurde erfolgreich gemischt.",
          error: "Fehler",
          errorDescription: "- Beim Mischen der Warteschlange ist ein Fehler aufgetreten."
      }
    },
    skip: {
      embed: {
          noActivePlayer: "Fehler",
          noActivePlayerDescription: "- Kein aktiver Player gefunden.",
          songSkipped: "Lied Übersprungen!",
          songSkippedDescription: "**- Der Player wird das nächste Lied abspielen!**",
          error: "Fehler",
          errorDescription: "- Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten."
      }
    },
    stop: {
      embed: {
          noActivePlayer: "Fehler",
          noActivePlayerDescription: "- Kein aktiver Player gefunden.",
          musicHalted: "Musik Gestoppt!",
          musicHaltedDescription: "**- Die Wiedergabe wurde gestoppt und der Player wurde beendet!**",
          error: "Fehler",
          errorDescription: "- Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten."
      }
    },
    support: {
      embed: {
          authorName: "Support-Server",
          description: "➡️ **Treten Sie unserem Discord-Server für Support und Updates bei:**\n- Discord - {supportServerLink}\n\n➡️ **Folgen Sie uns auf:**\n- GitHub - {githubLink}\n- Replit - {replitLink}\n- YouTube - {youtubeLink}",
          error: "Fehler",
          errorDescription: "- Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten."
      }
    },
    volume: {
      embed: {
          noActivePlayer: "Fehler",
          noActivePlayerDescription: "- Kein aktiver Player gefunden.",
          volumeUpdated: "Lautstärke Aktualisiert!",
          volumeUpdatedDescription: "- Die Lautstärke wurde auf **{volume}%** gesetzt",
          error: "Fehler",
          errorDescription: "Bei der Einstellung der Lautstärke ist ein Fehler aufgetreten."
      },
      volumeRangeError: "Die Lautstärke muss zwischen 0 und 100 liegen."
    },
    errors: {
      noPermission: "Sie haben keine Berechtigung, diesen Befehl zu verwenden.",
      generalError: "- Fehler: {error}"
    }
};