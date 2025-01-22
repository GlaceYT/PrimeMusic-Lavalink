module.exports = {
    footer: "Desarrollado por SSRR | Prime Music v1.2",
    ping: {
      description: "Comprobar la latencia del bot",
      response: "Comprobando...",
      embed: {
        title: "Latencia del Bot",
        responseTime: "- Tiempo de Respuesta del Bot: **{latency}ms**",
        websocketPing: "- Ping del WebSocket: **{ping}ms**",
        uptime: "- Tiempo de Actividad: **{uptime}**",
        footer: "Desarrollado por SSRR | Prime Music v1.2"
      }
    },
    addsong: {
      embed: {
          playlistNotFound: "Lista de Reproducción No Encontrada",
          playlistNotFoundDescription: "- Lista de reproducción no encontrada.",
          accessDenied: "Acceso Denegado",
          accessDeniedDescription: "- No tienes permiso para añadir canciones a esta lista de reproducción.",
          songAdded: "Canción Añadida",
          songAddedDescription: "- La canción **{songInput}** ha sido añadida a la lista de reproducción **{playlistName}**.",
          error: "Error",
          errorDescription: "- Ocurrió un error al añadir la canción."
      }
    },
    allplaylists: {
      embed: {
          noPlaylistsFound: "No Se Encontraron Listas de Reproducción",
          noPlaylistsFoundDescription: "- No hay listas de reproducción públicas disponibles actualmente.",
          createdBy: "Creado por: {userId}",
          serverName: "Servidor: {serverName}",
          songs: "Canciones: **{songCount}**",
          publicPlaylistsTitle: "Listas de Reproducción Públicas (Página {currentPage}/{totalPages})",
          error: "Error",
          errorDescription: "- Ocurrió un error al obtener las listas de reproducción."
      }
    },
    autoplay: {
      embed: {
          autoplayUpdated: "Reproducción Automática Actualizada",
          autoplayStatus: "- La reproducción automática ha sido **{status}** para este servidor.",
          enabled: "activada",
          disabled: "desactivada",
          error: "Error",
          errorDescription: "- Ocurrió un error al actualizar la reproducción automática."
      },
      commandDescription: "Activar o desactivar la reproducción automática"
    },
    createplaylist: {
      embed: {
          playlistExists: "La Lista de Reproducción Existe",
          playlistExistsDescription: "- Ya existe una lista de reproducción con este nombre.",
          playlistCreated: "Lista de Reproducción Creada",
          playlistCreatedDescription: "- La lista de reproducción **{playlistName}** ha sido creada.\n- Visibilidad: **{visibility}**.",
          private: "Privada",
          public: "Pública",
          error: "Error",
          errorDescription: "- Ocurrió un error al crear la lista de reproducción."
      },
      commandDescriptionName: "Ingrese el nombre de la lista de reproducción",
      commandDescriptionPrivate: "Establecer lista de reproducción como privada (visible solo para ti)"
    },
    deleteplaylist: {
      embed: {
          playlistNotFound: "Lista de Reproducción No Encontrada",
          playlistNotFoundDescription: "- Lista de reproducción no encontrada.",
          accessDenied: "Acceso Denegado",
          accessDeniedDescription: "- No tienes permiso para eliminar esta lista de reproducción.",
          playlistDeleted: "Lista de Reproducción Eliminada",
          playlistDeletedDescription: "- La lista de reproducción **{playlistName}** ha sido eliminada.",
          error: "Error",
          errorDescription: "- Ocurrió un error al eliminar la lista de reproducción."
      },
      commandDescriptionName: "Ingrese el nombre de la lista de reproducción"
    },
    deletesong: {
      embed: {
          playlistNotFound: "Lista de Reproducción No Encontrada",
          playlistNotFoundDescription: "- Lista de reproducción no encontrada.",
          songDeleted: "Canción Eliminada",
          songDeletedDescription: "- La canción **{songName}** ha sido eliminada de la lista de reproducción **{playlistName}**.",
          error: "Error",
          errorDescription: "- Ocurrió un error al eliminar la canción."
      },
      commandDescriptionPlaylist: "Ingrese el nombre de la lista de reproducción",
      commandDescriptionSong: "Ingrese el nombre de la canción"
    },
    filters: {
      embed: {
          error: "Error",
          noPlayer: "- No se encontró un reproductor activo. Por favor reproduce una canción primero.",
          wrongChannel: "- Debes estar en el mismo canal de voz que el bot para usar este comando.",
          filtersCleared: "Todos los filtros han sido eliminados.",
          invalidFilter: "Filtro seleccionado inválido.",
          filterApplied: "El filtro **{filter}** ha sido aplicado.",
          errorProcessing: "- Ocurrió un error al procesar tu solicitud."
      },
      commandDescription: "Selecciona un filtro para aplicar"
    },
    help: {
      embed: {
          title: "📜 Menú de Ayuda de {botName}",
          author: "Ayuda",
          description: `
          **¡Bienvenido a {botName}!**

          > Tu compañero musical definitivo en Discord.
          > A continuación, información detallada sobre el bot:
                  
          **📂 Comandos:** {totalCommands}
          **🌐 Servidores:** {totalServers}
          **👥 Usuarios:** {totalUsers}
          **⏳ Tiempo Activo:** {uptimeString}
          **📡 Ping:** {ping}ms
          `,
          availableCommands: "Comandos Disponibles",
          noDescription: "No hay descripción disponible.",
          noCommands: "No se encontraron comandos.",
          error: "❌ Ocurrió un error al obtener el menú de ayuda."
      },
      commandDescription: "Obtener información sobre el bot"
    },
    myplaylists: {
      embed: {
          noPlaylistsFound: "No Se Encontraron Listas de Reproducción",
          noPlaylistsFoundDescription: "- No has creado ninguna lista de reproducción.",
          yourPlaylistsTitle: "Tus Listas de Reproducción (Página {currentPage}/{totalPages})",
          visibility: "Visibilidad",
          private: "Privada",
          public: "Pública",
          server: "Servidor",
          songs: "Canciones",
          error: "Error",
          errorDescription: "- Ocurrió un error al obtener tus listas de reproducción."
      }
    },
    nowPlaying: {
      embed: {
          error: "Error",
          noSong: "- No hay ninguna canción reproduciéndose actualmente.",
          nowPlaying: "¡Reproduciendo Ahora!",
          errorDescription: "- Ocurrió un error al procesar tu solicitud."
      }
    },
    pause: {
      embed: {
          error: "Error",
          noActivePlayer: "- No se encontró un reproductor activo.",
          paused: "¡Pausado!",
          pausedDescription: "**- ¡La reproducción ha sido pausada!**",
          errorDescription: "- Ocurrió un error al procesar tu solicitud."
      }
    },
    play: {
      embed: {
          error: "Error",
          noVoiceChannel: "- Necesitas estar en un canal de voz para usar este comando.",
          noLavalinkNodes: "- No hay nodos Lavalink disponibles para procesar la solicitud.",
          noResults: "- No se encontraron resultados.",
          requestUpdated: "¡Solicitud Actualizada!",
          successProcessed: "- Tu solicitud ha sido procesada exitosamente.\n- Por favor usa los botones para controlar la reproducción",
          errorProcessing: "- Ocurrió un error al procesar tu solicitud."
      },
      commandDescription: "Ingresa nombre de canción / enlace o lista de reproducción"
    },
    playCustomPlaylist: {
      embed: {
          error: "Error",
          noVoiceChannel: "- Necesitas estar en un canal de voz para usar este comando.",
          playlistNotFound: "- Lista de reproducción no encontrada.",
          accessDenied: "Acceso Denegado",
          noPermission: "- No tienes permiso para reproducir esta lista de reproducción privada.",
          emptyPlaylist: "- La lista de reproducción está vacía.",
          playingPlaylist: "¡Reproduciendo Lista!",
          playlistPlaying: "- La lista de reproducción **{playlistName}** está reproduciendo ahora.\n- Por favor usa los botones para controlar la reproducción",
          errorResolvingSong: "- Error al resolver la canción.",
          errorPlayingPlaylist: "- Ocurrió un error al reproducir la lista."
      },
      commandDescription: "Ingresa el nombre de la lista de reproducción"
    },
    queue: {
      embed: {
          queueEmpty: "Cola Vacía",
          queueEmptyDescription: "- La cola está actualmente vacía. Añade canciones usando el comando `/play`.",
          currentQueue: "Cola Actual",
          noMoreSongs: "- No hay más canciones en la cola.",
          error: "Error",
          errorDescription: "- Ocurrió un error al obtener la cola."
      }
    },
    remove: {
      embed: {
          queueEmpty: "Cola Vacía",
          queueEmptyDescription: "- La cola está actualmente vacía. Añade canciones usando el comando `/play`.",
          invalidPosition: "Error",
          invalidPositionDescription: "- Posición inválida. Ingresa un número entre 1 y {queueLength}.",
          songRemoved: "Canción Eliminada",
          songRemovedDescription: "- Canción eliminada: **{songTitle}** de la cola.",
          error: "Error",
          errorDescription: "- Ocurrió un error al eliminar la canción de la cola."
      }
    },
    resume: {
      embed: {
          noActivePlayer: "Error",
          noActivePlayerDescription: "- No se encontró un reproductor activo.",
          resumed: "¡Reanudado!",
          resumedDescription: "**- ¡La reproducción ha sido reanudada!**",
          error: "Error",
          errorDescription: "- Ocurrió un error al procesar tu solicitud."
      }
    },
    showsongs: {
      embed: {
          error: "Error",
          playlistNotFound: "- Lista de reproducción no encontrada.",
          accessDenied: "Acceso Denegado",
          noPermission: "- No tienes permiso para ver esta lista de reproducción privada.",
          noSongs: "- No hay canciones en esta lista de reproducción.",
          songsInPlaylist: "Canciones en {playlistName}",
          songsInPlaylistPage: "Canciones en {playlistName} (Página {currentPage}/{totalPages})",
          errorDescription: "- Ocurrió un error al mostrar las canciones."
      }
    },
    shuffle: {
      embed: {
          queueEmpty: "Cola Vacía",
          queueEmptyDescription: "- La cola está actualmente vacía. Añade canciones usando el comando `/play`.",
          queueShuffled: "Cola Mezclada",
          queueShuffledDescription: "- La cola ha sido mezclada exitosamente.",
          error: "Error",
          errorDescription: "- Ocurrió un error al mezclar la cola."
      }
    },
    skip: {
      embed: {
          noActivePlayer: "Error",
          noActivePlayerDescription: "- No se encontró un reproductor activo.",
          songSkipped: "¡Canción Saltada!",
          songSkippedDescription: "**- ¡El reproductor reproducirá la siguiente canción!**",
          error: "Error",
          errorDescription: "- Ocurrió un error al procesar tu solicitud."
      }
    },
    stop: {
      embed: {
          noActivePlayer: "Error",
          noActivePlayerDescription: "- No se encontró un reproductor activo.",
          musicHalted: "¡Música Detenida!",
          musicHaltedDescription: "**- ¡La reproducción ha sido detenida y el reproductor destruido!**",
          error: "Error",
          errorDescription: "- Ocurrió un error al procesar tu solicitud."
      }
    },
    support: {
      embed: {
          authorName: "Servidor de Soporte",
          description: "➡️ **Únete a nuestro servidor de Discord para soporte y actualizaciones:**\n- Discord - {supportServerLink}\n\n➡️ **Síguenos en:**\n- GitHub - {githubLink}\n- Replit - {replitLink}\n- YouTube - {youtubeLink}",
          error: "Error",
          errorDescription: "- Ocurrió un error al procesar tu solicitud."
      }
    },
    volume: {
      embed: {
          noActivePlayer: "Error",
          noActivePlayerDescription: "- No se encontró un reproductor activo.",
          volumeUpdated: "¡Volumen Actualizado!",
          volumeUpdatedDescription: "- El volumen ha sido establecido a **{volume}%**",
          error: "Error",
          errorDescription: "Ocurrió un error al establecer el volumen."
      },
      volumeRangeError: "El nivel de volumen debe estar entre 0 y 100."
    },
    errors: {
      noPermission: "No tienes permiso para usar este comando.",
      generalError: "- Error: {error}"
    }
};