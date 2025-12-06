module.exports = {
    meta: {
        name: "Deutsch",
        code: "de"
    },
    help: {
        command: {
            name: "help",
            description: "Informationen über den Bot und seine Befehle erhalten",
            category: {
                name: "category",
                description: "Wähle eine Kategorie zum Anzeigen",
                choices: {
                    main: "🏠 Hauptmenü",
                    music: "🎵 Musikbefehle",
                    playlist: "📋 Playlist-Befehle",
                    basic: "💜 Grundlegende Befehle",
                    utility: "🔧 Hilfsprogramm-Befehle"
                }
            }
        },
        categories: {
            main: {
                name: "Hauptmenü",
                emoji: "🏠",
                description: "Willkommen im Hilfemenü"
            },
            music: {
                name: "Musikbefehle",
                emoji: "🎵",
                description: "Steuerung der Musikwiedergabe und Einstellungen"
            },
            playlist: {
                name: "Playlist-Befehle",
                emoji: "📋",
                description: "Verwalte deine Playlists"
            },
            basic: {
                name: "Grundlegende Befehle",
                emoji: "⚙️",
                description: "Allgemeine Bot-Informationen und Hilfsprogramme"
            },
            utility: {
                name: "Hilfsprogramm-Befehle",
                emoji: "🔧",
                description: "Zusätzliche Hilfsfunktionen"
            }
        },
        mainMenu: {
            header: {
                title: "# 🎵 {botName} Hilfemenü",
                welcome: "**Willkommen bei {botName}!**",
                subtitle: "Dein ultimativer Musikbegleiter auf Discord."
            },
            statistics: {
                title: "## 📊 Statistiken",
                commands: "• **Befehle:** {totalCommands}",
                servers: "• **Server:** {totalServers}",
                users: "• **Benutzer:** {totalUsers}",
                uptime: "• **Betriebszeit:** {uptimeString}",
                ping: "• **Ping:** {ping}ms"
            },
            categories: {
                title: "## 📂 Verfügbare Kategorien",
                music: "{emoji} **{name}** - {count} Befehle",
                playlist: "{emoji} **{name}** - {count} Befehle",
                basic: "{emoji} **{name}** - {count} Befehle",
                utility: "{emoji} **{name}** - {count} Befehle",
                footer: "**Wähle unten eine Kategorie aus, um detaillierte Befehle anzuzeigen.**"
            },
            footer: {
                version: "**Version 1.4** • Prime Musik-Bot",
                developer: "Entwickelt von GlaceYT / https://GlaceYT.com"
            },
            selectMenu: {
                placeholder: "📂 Wähle eine Kategorie zum Anzeigen der Befehle...",
                musicDescription: "{count} Befehle verfügbar",
                playlistDescription: "{count} Befehle verfügbar",
                basicDescription: "{count} Befehle verfügbar",
                utilityDescription: "{count} Befehle verfügbar"
            },
            buttons: {
                supportServer: "Support-Server",
                github: "GitHub"
            }
        },
        categoryPage: {
            noCommands: {
                title: "## ❌ Keine Befehle gefunden",
                message: "In der Kategorie **{categoryName}** sind keine Befehle verfügbar.",
                backToHelp: "Verwende `/help`, um zum Hauptmenü zurückzukehren."
            },
            header: {
                title: "# {emoji} {categoryName}",
                description: "{description}",
                count: "**{count}** Befehl{plural} verfügbar"
            },
            commands: {
                title: "## Befehle",
                titlePaginated: "## Befehle (Seite {currentPage}/{totalPages})",
                item: "**{num}.** `/{commandName}`\\n   {description}",
                noDescription: "Keine Beschreibung verfügbar."
            },
            footer: {
                version: "**Version 1.4** • Prime Musik-Bot",
                developer: "Entwickelt von GlaceYT / https://GlaceYT.com"
            },
            buttons: {
                backToMain: "🏠 Zurück zum Hauptmenü",
                supportServer: "Support-Server",
                github: "GitHub"
            }
        },
        errors: {
            general: "❌ **Beim Abrufen des Hilfemenüs ist ein Fehler aufgetreten.**",
            fallback: "❌ Beim Abrufen des Hilfemenüs ist ein Fehler aufgetreten.",
            fallbackDetails: "**Bot:** {botName}\\n**Befehle:** {totalCommands}\\n**Server:** {totalServers}\\n**Support:** {supportServer}"
        }
    },
    language: {
        command: {
            name: "language",
            description: "Lege die Sprache des Bots für diesen Server fest",
            option: {
                name: "lang",
                description: "Wähle eine Sprache"
            }
        },
        current: {
            title: "🌐 Aktuelle Sprache",
            description: "Die aktuelle Sprache für diesen Server ist: **{language}**",
            global: "Globaler Standard (aus Konfiguration): **{language}**"
        },
        changed: {
            title: "✅ Sprache geändert",
            description: "Die Serversprache wurde auf **{language}** geändert",
            note: "Der Bot wird nun diese Sprache für alle Befehle auf diesem Server verwenden."
        },
        available: {
            title: "📚 Verfügbare Sprachen",
            description: "Wähle eine Sprache aus der Liste unten:",
            list: "**Verfügbare Sprachen:**\\n{list}",
            item: "• **{name}** (`{code}`)"
        },
        errors: {
            notFound: "❌ **Sprache nicht gefunden!**\\nDie Sprache `{code}` existiert nicht.",
            failed: "❌ **Fehler beim Festlegen der Sprache!**\\n{error}",
            noPermission: "❌ **Du hast keine Berechtigung, die Sprache zu ändern!**\\nDu benötigst die Berechtigung `Server verwalten`."
        },
        info: {
            title: "ℹ️ Sprachinformationen",
            description: "**Aktuelle Serversprache:** {serverLang}\\n**Globale Standardsprache:** {globalLang}\\n\\n**Verfügbare Sprachen:** {count}",
            reset: "Um auf den globalen Standard zurückzusetzen, verwende `/language reset`"
        }
    },
    ping: {
        command: {
            name: "ping",
            description: "Überprüfe die Bot-Latenz und Antwortzeit"
        },
        header: {
            title: "# 🏓 Bot-Latenz",
            botName: "**{botName}** - Prime Musik-Bot",
            subtitle: "Überprüfe die Antwortzeit und den Verbindungsstatus des Bots"
        },
        metrics: {
            title: "## ⚡ Leistungsmetriken",
            responseTime: "**Antwortzeit:** {latency}ms",
            websocketPing: "**Websocket-Ping:** {ping}ms",
            botUptime: "**Bot-Betriebszeit:** {uptime}",
            connectionSpeed: {
                excellent: "🟢 Ausgezeichnete Verbindungsgeschwindigkeit",
                good: "🟡 Gute Verbindungsgeschwindigkeit",
                slow: "🔴 Langsame Verbindungsgeschwindigkeit"
            }
        },
        footer: {
            version: "**Version 1.4** • Prime Musik-Bot",
            developer: "Entwickelt von GlaceYT / https://GlaceYT.com"
        },
        errors: {
            title: "## ❌ Fehler",
            message: "Beim Überprüfen der Latenz ist ein Fehler aufgetreten.\\nBitte versuche es später erneut.",
            fallback: "❌ Beim Überprüfen der Latenz ist ein Fehler aufgetreten."
        }
    },
    stats: {
        command: {
            name: "stats",
            description: "Bot-Statistiken und Serverinformationen anzeigen"
        },
        header: {
            title: "# 📊 Bot-Statistiken",
            botName: "**{botName}** - Prime Musik-Bot",
            developer: "Entwickelt von GlaceYT / https://GlaceYT.com"
        },
        botInfo: {
            title: "## 📊 Bot-Informationen",
            servers: "• **Server:** {count}",
            users: "• **Benutzer:** {count}",
            channels: "• **Kanäle:** {count}",
            uptime: "• **Betriebszeit:** {uptime}"
        },
        musicStats: {
            title: "## 🎵 Musikstatistiken",
            activePlayers: "• **Aktive Player:** {count}",
            totalPlayers: "• **Gesamt-Player:** {count}",
            currentTrack: "• **Aktueller Track:** {track}"
        },
        systemInfo: {
            title: "## 💻 Systeminformationen",
            cpu: "• **CPU:** {cpu}",
            platform: "• **Plattform:** {platform}",
            nodejs: "• **Node.js:** {version}",
            discordjs: "• **Discord.js:** {version}"
        },
        memory: {
            title: "## 💾 Speicher & Leistung",
            memoryUsage: "**Speicherverbrauch:**",
            used: "• Verwendet: {used}",
            total: "• Gesamt: {total}",
            systemMemory: "**Systemspeicher:**",
            systemUsed: "• Verwendet: {used}",
            systemFree: "• Frei: {free}",
            performance: "**Leistung:**",
            ping: "• Ping: {ping}ms",
            shards: "• Shards: {count}",
            commands: "• Befehle: {count}"
        },
        footer: {
            version: "**Version 1.4** • Prime Musik-Bot",
            developer: "Entwickelt von GlaceYT / https://GlaceYT.com"
        },
        errors: {
            title: "## ❌ Fehler",
            message: "Beim Abrufen der Statistiken ist ein Fehler aufgetreten.\\nBitte versuche es später erneut.",
            fallback: "❌ Beim Abrufen der Statistiken ist ein Fehler aufgetreten."
        }
    },
    support: {
        command: {
            name: "support",
            description: "Support-Server-Link und wichtige Links erhalten"
        },
        header: {
            title: "# 🆘 Support & Links",
            botName: "**{botName}** - Prime Musik-Bot",
            subtitle: "Erhalte Hilfe, melde Probleme oder verbinde dich mit uns!"
        },
        links: {
            title: "## 🔗 Wichtige Links",
            supportServer: {
                title: "**📢 Support-Server**",
                description: "Tritt unserem Discord-Server bei für Hilfe, Updates und Community!",
                link: "[Hier klicken zum Beitreten]({url})"
            },
            github: {
                title: "**💻 GitHub**",
                description: "Schau dir unseren Code an und trage bei!",
                link: "[GitHub besuchen]({url})"
            },
            youtube: {
                title: "**🎬 YouTube**",
                description: "Schau dir Tutorials und Updates an!",
                link: "[Abonnieren]({url})"
            },
            website: {
                title: "**🌐 Webseite**",
                description: "Besuche unsere offizielle Webseite!",
                link: "[Webseite besuchen]({url})"
            }
        },
        footer: {
            version: "**Version 1.4** • Prime Musik-Bot",
            developer: "Entwickelt von GlaceYT / https://GlaceYT.com"
        },
        buttons: {
            supportServer: "Support-Server",
            github: "GitHub",
            youtube: "YouTube"
        },
        errors: {
            title: "## ❌ Fehler",
            message: "Beim Abrufen der Support-Informationen ist ein Fehler aufgetreten.\\nBitte versuche es später erneut.",
            fallback: "❌ Beim Abrufen der Support-Informationen ist ein Fehler aufgetreten."
        }
    },
    music: {
        autoplay: {
            command: {
                name: "autoplay",
                description: "Automatische Wiedergabe für den Server umschalten"
            },
            enabled: {
                title: "## ✅ Automatische Wiedergabe aktiviert",
                message: "Die automatische Wiedergabe wurde für diesen Server **aktiviert**.",
                note: "🎵 Der Bot wird automatisch ähnliche Songs abspielen, wenn die Warteschlange endet."
            },
            disabled: {
                title: "## ❌ Automatische Wiedergabe deaktiviert",
                message: "Die automatische Wiedergabe wurde für diesen Server **deaktiviert**.",
                note: "⏹️ Der Bot wird die Wiedergabe stoppen, wenn die Warteschlange endet."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Aktualisieren der Autoplay-Einstellungen ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        pause: {
            command: {
                name: "pause",
                description: "Aktuellen Song pausieren"
            },
            success: {
                title: "## ⏸️ Musik pausiert",
                message: "Der aktuelle Track wurde pausiert.",
                note: "Verwende `/resume`, um die Wiedergabe fortzusetzen."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Pausieren der Musik ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        resume: {
            command: {
                name: "resume",
                description: "Aktuellen Song fortsetzen"
            },
            success: {
                title: "## ▶️ Musik fortgesetzt",
                message: "Der aktuelle Track wurde fortgesetzt.",
                note: "Die Musik wird jetzt abgespielt."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Fortsetzen der Musik ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        skip: {
            command: {
                name: "skip",
                description: "Aktuellen Song überspringen"
            },
            success: {
                title: "## ⏭️ Song übersprungen",
                message: "Der aktuelle Track wurde übersprungen.",
                nextSong: "Nächster Song in der Warteschlange wird abgespielt...",
                queueEmpty: "Die Warteschlange ist leer."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Überspringen des Songs ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        stop: {
            command: {
                name: "stop",
                description: "Aktuellen Song stoppen und Player zerstören"
            },
            success: {
                title: "## ⏹️ Musik gestoppt",
                message24_7: "Musik gestoppt. Player bleibt aktiv (24/7-Modus aktiviert).",
                messageNormal: "Die Musik wurde gestoppt und der Player wurde zerstört.",
                note: "Verwende `/play`, um wieder Musik abzuspielen."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Stoppen der Musik ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        volume: {
            command: {
                name: "volume",
                description: "Lautstärke des aktuellen Songs einstellen"
            },
            invalid: {
                title: "## ❌ Ungültige Lautstärke",
                message: "Die Lautstärke muss zwischen **0** und **100** liegen.",
                note: "Bitte gib eine gültige Lautstärke an."
            },
            success: {
                title: "## 🔊 Lautstärke aktualisiert",
                message: "Die Lautstärke wurde auf **{volume}%** eingestellt.",
                muted: "🔇 Stumm",
                low: "🔉 Leise",
                medium: "🔊 Mittel",
                high: "🔊🔊 Laut"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Einstellen der Lautstärke ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        shuffle: {
            command: {
                name: "shuffle",
                description: "Aktuelle Warteschlange mischen"
            },
            queueEmpty: {
                title: "## ❌ Warteschlange leer",
                message: "Die Warteschlange ist leer. Es gibt keine Songs zum Mischen.",
                note: "Füge zuerst Songs zur Warteschlange hinzu mit `/play`."
            },
            success: {
                title: "## 🔀 Warteschlange gemischt",
                message: "Die Warteschlange wurde erfolgreich gemischt!",
                count: "**{count}** Song{plural} wurde{plural} neu angeordnet."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Mischen der Warteschlange ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        np: {
            command: {
                name: "np",
                description: "Zeigt den aktuell abgespielten Song mit einer Fortschrittsanzeige an"
            },
            title: "## 🎵 Jetzt läuft",
            nowPlaying: "**[{title}]({uri})**",
            by: "von **{author}**",
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Abrufen des aktuellen Tracks ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        queue: {
            command: {
                name: "queue",
                description: "Aktuelle Warteschlange anzeigen"
            },
            title: "## 📋 Aktuelle Warteschlange",
            titlePaginated: "## 📋 Aktuelle Warteschlange (Seite {currentPage}/{totalPages})",
            nowPlaying: "🎵 **Jetzt läuft:**",
            track: "[{title}]({uri})",
            requestedBy: "Angefordert von: {requester}",
            trackNumber: "**{number}.**",
            noMoreSongs: "Keine weiteren Songs",
            buttons: {
                previous: "⬅ Zurück",
                next: "Weiter ➡"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Abrufen der Warteschlange ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        remove: {
            command: {
                name: "remove",
                description: "Einen Song aus der Warteschlange anhand seiner Position entfernen"
            },
            queueEmpty: {
                title: "## ❌ Warteschlange leer",
                message: "Die Warteschlange ist leer. Es gibt keine Songs zum Entfernen.",
                note: "Füge zuerst Songs zur Warteschlange hinzu mit `/play`."
            },
            invalidPosition: {
                title: "## ❌ Ungültige Position",
                message: "Die Position muss zwischen **1** und **{max}** liegen.",
                note: "Die Warteschlange hat **{count}** Song{plural}."
            },
            success: {
                title: "## ✅ Song entfernt",
                removed: "**Entfernt:** [{title}]({uri})",
                position: "**Position:** {position}",
                message: "Der Song wurde aus der Warteschlange entfernt."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Entfernen des Songs ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        move: {
            command: {
                name: "move",
                description: "Einen Track an eine andere Position in der Warteschlange verschieben"
            },
            queueEmpty: {
                title: "## ❌ Warteschlange leer",
                message: "Die Warteschlange ist leer. Es gibt keine Songs zum Verschieben.",
                note: "Füge zuerst Songs zur Warteschlange hinzu mit `/play`."
            },
            invalidPosition: {
                title: "## ❌ Ungültige Position",
                message: "Die Position muss zwischen **1** und **{max}** liegen.",
                note: "Die Warteschlange hat **{count}** Song{plural}."
            },
            samePosition: {
                title: "## ❌ Gleiche Position",
                message: "Von- und Zu-Positionen können nicht identisch sein.",
                note: "Bitte gib unterschiedliche Positionen an."
            },
            success: {
                title: "## ✅ Track verschoben",
                track: "**Track:** [{title}]({uri})",
                from: "**Von Position:** {from}",
                to: "**Zu Position:** {to}",
                message: "Der Track wurde erfolgreich verschoben."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Verschieben des Tracks ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        jump: {
            command: {
                name: "jump",
                description: "Zu einem bestimmten Track in der Warteschlange springen"
            },
            queueEmpty: {
                title: "## ❌ Warteschlange leer",
                message: "Die Warteschlange ist leer. Es gibt keine Songs, zu denen gesprungen werden kann.",
                note: "Füge zuerst Songs zur Warteschlange hinzu mit `/play`."
            },
            invalidPosition: {
                title: "## ❌ Ungültige Position",
                message: "Die Position muss zwischen **1** und **{max}** liegen.",
                note: "Die Warteschlange hat **{count}** Song{plural}."
            },
            success: {
                title: "## ⏭️ Zu Track gesprungen",
                track: "**Track:** [{title}]({uri})",
                position: "**Position:** {position}",
                message: "Zum angegebenen Track in der Warteschlange gesprungen."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Springen zum Track ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        seek: {
            command: {
                name: "seek",
                description: "Zu einer bestimmten Zeit im aktuellen Track springen"
            },
            invalidTime: {
                title: "## ❌ Ungültige Zeit",
                message: "Ungültiges Zeitformat. Verwende eines der folgenden:",
                formats: "• **MM:SS** (z.B. 1:30)\\n• **HH:MM:SS** (z.B. 1:05:30)\\n• **Sekunden** (z.B. 90)",
                trackLength: "**Track-Länge:** {length}"
            },
            success: {
                title: "## ⏩ Zur Position gesprungen",
                time: "**Zeit:** {time}",
                track: "**Track:** [{title}]({uri})",
                message: "Der Track wurde zur angegebenen Zeit gesprungen."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Springen ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        trackinfo: {
            command: {
                name: "trackinfo",
                description: "Detaillierte Informationen über den aktuellen Track anzeigen"
            },
            trackInfo: {
                title: "## 🎵 Track-Informationen",
                titleLabel: "**Titel:** [{title}]({uri})",
                artist: "**Künstler:** {artist}",
                duration: "**Dauer:** {duration}",
                source: "**Quelle:** {source}"
            },
            progress: {
                title: "## 📊 Fortschritt",
                current: "**Aktuell:** {current}",
                total: "**Gesamt:** {total}",
                progress: "**Fortschritt:** {progress}%"
            },
            status: {
                title: "## 🎚️ Player-Status",
                volume: "**Lautstärke:** {volume}%",
                loop: "**Schleife:** {loop}",
                status: "**Status:** {status}",
                queue: "**Warteschlange:** {count} Track{plural}"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Abrufen der Track-Informationen ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        voteskip: {
            command: {
                name: "voteskip",
                description: "Für das Überspringen des aktuellen Tracks abstimmen"
            },
            alreadyVoted: {
                title: "## ❌ Bereits abgestimmt",
                message: "Du hast bereits für das Überspringen dieses Tracks abgestimmt.",
                votes: "**Aktuelle Stimmen:** {current}/{required}"
            },
            success: {
                title: "## ✅ Stimme hinzugefügt",
                message: "Deine Stimme wurde hinzugefügt!",
                currentVotes: "**Aktuelle Stimmen:** {current}/{required}",
                required: "**Erforderlich:** {required} Stimmen zum Überspringen",
                moreNeeded: "{count} weitere Stimme{plural} erforderlich."
            },
            skipped: {
                title: "## ⏭️ Track durch Abstimmung übersprungen",
                message: "Der Track wurde übersprungen!",
                votes: "**Stimmen:** {current}/{required}",
                required: "**Erforderlich:** {required} Stimmen"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Verarbeiten der Abstimmung ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        filters: {
            command: {
                name: "filters",
                description: "Audiofilter steuern"
            },
            cleared: {
                title: "## ✅ Filter gelöscht",
                message: "Alle Audiofilter wurden gelöscht.",
                note: "Das Audio ist jetzt wieder normal."
            },
            invalid: {
                title: "## ❌ Ungültiger Filter",
                message: "Der ausgewählte Filter ist ungültig.",
                note: "Bitte wähle einen gültigen Filter aus den Optionen."
            },
            success: {
                title: "## 🎛️ Filter angewendet",
                filter: "**Filter:** {filter}",
                message: "Der Audiofilter wurde erfolgreich angewendet.",
                note: "Verwende `/filters clear`, um alle Filter zu entfernen."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Anwenden des Filters ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        play: {
            command: {
                name: "play",
                description: "Einen Song von einem Namen oder Link abspielen"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalink-Manager-Fehler",
                message: "Der Lavalink-Knoten-Manager ist nicht initialisiert.",
                note: "Bitte kontaktiere den Bot-Administrator."
            },
            noNodes: {
                title: "## ❌ Keine Lavalink-Knoten",
                message: "Derzeit sind keine Lavalink-Knoten verfügbar ({connected}/{total} verbunden).",
                note: "Der Bot versucht, sich erneut zu verbinden. Bitte versuche es in einem Moment erneut."
            },
            spotifyError: {
                title: "## ❌ Spotify-Fehler",
                message: "Fehler beim Abrufen der Spotify-Daten.",
                note: "Bitte überprüfe den Link und versuche es erneut."
            },
            invalidResponse: {
                title: "## ❌ Ungültige Antwort",
                message: "Ungültige Antwort von der Musikquelle.",
                note: "Bitte versuche es erneut oder verwende eine andere Abfrage."
            },
            noResults: {
                title: "## ❌ Keine Ergebnisse",
                message: "Für deine Abfrage wurden keine Ergebnisse gefunden.",
                note: "Versuche einen anderen Suchbegriff oder Link."
            },
            success: {
                titleTrack: "## ✅ Track hinzugefügt",
                titlePlaylist: "## ✅ Playlist hinzugefügt",
                trackAdded: "Der Track wurde zur Warteschlange hinzugefügt.",
                playlistAdded: "**{count}** Tracks wurden zur Warteschlange hinzugefügt.",
                nowPlaying: "🎵 Jetzt läuft...",
                queueReady: "⏸️ Warteschlange bereit"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Verarbeiten der Anfrage ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        search: {
            command: {
                name: "search",
                description: "Nach einem Song suchen und aus den Ergebnissen auswählen"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalink-Manager-Fehler",
                message: "Der Lavalink-Knoten-Manager ist nicht initialisiert.",
                note: "Bitte kontaktiere den Bot-Administrator."
            },
            noNodes: {
                title: "## ❌ Keine Lavalink-Knoten",
                message: "Derzeit sind keine Lavalink-Knoten verfügbar ({connected}/{total} verbunden).",
                note: "Der Bot versucht, sich erneut zu verbinden. Bitte versuche es in einem Moment erneut."
            },
            noResults: {
                title: "## ❌ Keine Ergebnisse",
                message: "Für deine Suchabfrage wurden keine Ergebnisse gefunden.",
                note: "Versuche einen anderen Suchbegriff."
            },
            playlistNotSupported: {
                title: "## ❌ Playlists nicht unterstützt",
                message: "Playlists werden in der Suche nicht unterstützt.",
                note: "Verwende den Befehl `/play` für Playlists."
            },
            results: {
                title: "## 🔍 Suchergebnisse",
                query: "**Abfrage:** {query}",
                track: "**{number}.** [{title}]({uri})\\n   └ {author} • {duration}"
            },
            buttons: {
                cancel: "Abbrechen"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Suchen ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        }
    },
    playlist: {
        createplaylist: {
            command: {
                name: "createplaylist",
                description: "Eine neue Playlist erstellen"
            },
            alreadyExists: {
                title: "## ❌ Playlist existiert bereits",
                message: "Eine Playlist mit dem Namen **\\\"{name}\\\"** existiert bereits.",
                note: "Bitte wähle einen anderen Namen."
            },
            success: {
                title: "## ✅ Playlist erstellt",
                message: "Deine Playlist **\\\"{name}\\\"** wurde erfolgreich erstellt!",
                visibility: "**Sichtbarkeit:** {visibility}",
                server: "**Server:** {server}",
                private: "🔒 Privat",
                public: "🌐 Öffentlich"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Erstellen der Playlist ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        addsong: {
            command: {
                name: "addsong",
                description: "Einen Song zu einer Playlist hinzufügen"
            },
            notFound: {
                title: "## ❌ Playlist nicht gefunden",
                message: "Die Playlist **\\\"{name}\\\"** existiert nicht.",
                note: "Bitte überprüfe den Playlist-Namen und versuche es erneut."
            },
            accessDenied: {
                title: "## 🔒 Zugriff verweigert",
                message: "Du hast keine Berechtigung, diese Playlist zu ändern.",
                note: "Nur der Playlist-Besitzer kann Songs hinzufügen."
            },
            success: {
                title: "## ✅ Song hinzugefügt",
                song: "**Song:** {song}",
                playlist: "**Playlist:** {playlist}",
                message: "Der Song wurde erfolgreich zu deiner Playlist hinzugefügt!"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Hinzufügen des Songs ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        deleteplaylist: {
            command: {
                name: "deleteplaylist",
                description: "Eine Playlist löschen"
            },
            notFound: {
                title: "## ❌ Playlist nicht gefunden",
                message: "Die Playlist **\\\"{name}\\\"** existiert nicht.",
                note: "Bitte überprüfe den Playlist-Namen und versuche es erneut."
            },
            accessDenied: {
                title: "## 🔒 Zugriff verweigert",
                message: "Du hast keine Berechtigung, diese Playlist zu löschen.",
                note: "Nur der Playlist-Besitzer kann sie löschen."
            },
            success: {
                title: "## ✅ Playlist gelöscht",
                message: "Die Playlist **\\\"{name}\\\"** wurde erfolgreich gelöscht."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Löschen der Playlist ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        deletesong: {
            command: {
                name: "deletesong",
                description: "Einen Song aus einer Playlist löschen"
            },
            notFound: {
                title: "## ❌ Playlist nicht gefunden",
                message: "Die Playlist **\\\"{name}\\\"** existiert nicht.",
                note: "Bitte überprüfe den Playlist-Namen und versuche es erneut."
            },
            success: {
                title: "## ✅ Song gelöscht",
                song: "**Song:** {song}",
                playlist: "**Playlist:** {playlist}",
                message: "Der Song wurde erfolgreich aus deiner Playlist entfernt."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Löschen des Songs ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        savequeue: {
            command: {
                name: "savequeue",
                description: "Die aktuelle Warteschlange als Playlist speichern"
            },
            queueEmpty: {
                title: "## ❌ Warteschlange leer",
                message: "Die Warteschlange ist leer. Nichts zu speichern.",
                note: "Füge zuerst Songs zur Warteschlange hinzu!"
            },
            alreadyExists: {
                title: "## ❌ Playlist existiert bereits",
                message: "Eine Playlist mit dem Namen **\\\"{name}\\\"** existiert bereits.",
                note: "Bitte wähle einen anderen Namen."
            },
            success: {
                title: "## ✅ Warteschlange gespeichert!",
                message: "Warteschlange als Playlist **\\\"{name}\\\"** gespeichert",
                tracks: "**Tracks:** {count}"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Speichern der Warteschlange ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        myplaylists: {
            command: {
                name: "myplaylists",
                description: "Alle von dir erstellten Playlists auflisten"
            },
            noPlaylists: {
                title: "## 📋 Keine Playlists gefunden",
                message: "Du hast noch keine Playlists erstellt.",
                note: "Verwende `/createplaylist`, um deine erste Playlist zu erstellen!"
            },
            title: "## 📂 Deine Playlists (Seite {currentPage}/{totalPages})",
            playlistItem: "**{number}.** **{name}**\\n   • Sichtbarkeit: **{visibility}**\\n   • Server: {server}\\n   • Songs: **{count}**",
            visibilityPrivate: "🔒 Privat",
            visibilityPublic: "🌐 Öffentlich",
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Abrufen deiner Playlists ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        allplaylists: {
            command: {
                name: "allplaylists",
                description: "Alle öffentlichen Playlists auflisten"
            },
            noPlaylists: {
                title: "## 📋 Keine öffentlichen Playlists gefunden",
                message: "Es sind keine öffentlichen Playlists verfügbar.",
                note: "Erstelle eine öffentliche Playlist mit `/createplaylist`!"
            },
            title: "## 🌐 Öffentliche Playlists (Seite {currentPage}/{totalPages})",
            playlistItem: "**{number}.** **{name}**\\n   • Erstellt von: {creator}\\n   • Server: {server}\\n   • Songs: **{count}**",
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Abrufen der öffentlichen Playlists ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        showsongs: {
            command: {
                name: "showsongs",
                description: "Alle Songs in einer Playlist anzeigen"
            },
            notFound: {
                title: "## ❌ Playlist nicht gefunden",
                message: "Die Playlist **\\\"{name}\\\"** existiert nicht.",
                note: "Bitte überprüfe den Playlist-Namen und versuche es erneut."
            },
            accessDenied: {
                title: "## 🔒 Zugriff verweigert",
                message: "Du hast keine Berechtigung, diese Playlist anzuzeigen.",
                note: "Diese Playlist ist privat und nur der Besitzer kann sie ansehen."
            },
            empty: {
                title: "## 📋 Songs in \\\"{name}\\\"",
                message: "Diese Playlist ist leer. Füge Songs hinzu mit `/addsong`!"
            },
            title: "## 🎵 Songs in \\\"{name}\\\" (Seite {currentPage}/{totalPages})",
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Anzeigen der Playlist-Songs ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        },
        playcustomplaylist: {
            command: {
                name: "playcustomplaylist",
                description: "Eine benutzerdefinierte Playlist abspielen"
            },
            notFound: {
                title: "## ❌ Playlist nicht gefunden",
                message: "Die Playlist **\\\"{name}\\\"** existiert nicht.",
                note: "Bitte überprüfe den Playlist-Namen und versuche es erneut."
            },
            accessDenied: {
                title: "## 🔒 Zugriff verweigert",
                message: "Du hast keine Berechtigung, diese Playlist abzuspielen.",
                note: "Diese Playlist ist privat und nur der Besitzer kann sie abspielen."
            },
            empty: {
                title: "## ❌ Leere Playlist",
                message: "Die Playlist **\\\"{name}\\\"** ist leer.",
                note: "Füge zuerst Songs zur Playlist hinzu!"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalink-Manager-Fehler",
                message: "Der Lavalink-Knoten-Manager ist nicht initialisiert.",
                note: "Bitte kontaktiere den Bot-Administrator."
            },
            noNodes: {
                title: "## ❌ Keine Lavalink-Knoten",
                message: "Derzeit sind keine Lavalink-Knoten verfügbar ({connected}/{total} verbunden).",
                note: "Der Bot versucht, sich erneut zu verbinden. Bitte versuche es in einem Moment erneut."
            },
            resolveError: {
                title: "## ❌ Fehler beim Auflösen des Songs",
                message: "Fehler beim Auflösen eines oder mehrerer Songs aus der Playlist.",
                note: "Bitte überprüfe die Playlist und versuche es erneut."
            },
            success: {
                title: "## 🎵 Playlist wird abgespielt",
                message: "Playlist **\\\"{name}\\\"** wird jetzt abgespielt",
                songs: "**Songs:** {count}"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Abspielen der Playlist ist ein Fehler aufgetreten.\\nBitte versuche es später erneut."
            }
        }
    },
    utility: {
        twentyfourseven: {
            command: {
                name: "247",
                description: "24/7-Modus umschalten (Bot im Sprachkanal behalten)"
            },
            accessDenied: {
                title: "## ❌ Zugriff verweigert",
                message: "Nur der Server-Besitzer kann den 24/7-Modus umschalten."
            },
            enabled: {
                title: "## ✅ 24/7-Modus aktiviert",
                message: "Der 24/7-Modus wurde für diesen Server **aktiviert**.",
                note: "🔄 Der Bot bleibt im Sprachkanal, auch wenn die Warteschlange leer ist."
            },
            disabled: {
                title: "## ❌ 24/7-Modus deaktiviert",
                message: "Der 24/7-Modus wurde für diesen Server **deaktiviert**.",
                note: "⏹️ Der Bot verlässt den Sprachkanal, wenn die Warteschlange endet."
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Aktualisieren des 24/7-Modus ist ein Fehler aufgetreten.",
                note: "Bitte versuche es später erneut."
            }
        },
        history: {
            command: {
                name: "history",
                description: "Zuletzt gespielte Tracks anzeigen"
            },
            noHistory: {
                title: "## 📜 Kein Verlauf gefunden",
                message: "Für diesen Server wurde kein Wiedergabeverlauf gefunden.",
                note: "Spiele ein paar Songs ab, um deinen Verlauf aufzubauen!"
            },
            title: "## 📜 Wiedergabeverlauf",
            titlePaginated: "## 📜 Wiedergabeverlauf (Seite {currentPage}/{totalPages})",
            noMoreSongs: "- Keine weiteren Songs im Verlauf.",
            buttons: {
                previous: "⬅ Zurück",
                next: "Weiter ➡"
            },
            errors: {
                title: "## ❌ Fehler",
                message: "Beim Abrufen des Verlaufs ist ein Fehler aufgetreten.",
                note: "Bitte versuche es später erneut."
            }
        }
    },
    events: {
        interactionCreate: {
            noGuild: "❌ **Dieser Befehl kann nur auf einem Server verwendet werden.**",
            commandNotFound: "❌ **Befehl nicht gefunden!**",
            noPermission: "❌ **Du hast keine Berechtigung, diesen Befehl zu verwenden.**",
            errorOccurred: "❌ **Ein Fehler ist aufgetreten: {message}**",
            unexpectedError: "❌ **Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.**",
            errorTryAgain: "❌ Ein Fehler ist aufgetreten. Bitte versuche es erneut."
        }
    },
    utils: {
        voiceChannelCheck: {
            noVoiceChannel: {
                title: "## ❌ Kein Sprachkanal",
                message: "Du musst in einem Sprachkanal sein, um diesen Befehl zu verwenden.",
                note: "Bitte tritt einem Sprachkanal bei und versuche es erneut."
            },
            wrongChannel: {
                title: "## 🎵 Sprachkanal beitreten",
                message: "Der Bot ist derzeit in **{channelName}** aktiv.",
                note: "Bitte tritt **{channelName}** bei, um Musikbefehle zu verwenden."
            }
        },
        playerValidation: {
            queueEmpty: {
                title: "## ❌ Warteschlange leer",
                message: "Die Warteschlange ist leer. Keine Songs verfügbar.",
                note: "Füge zuerst Songs zur Warteschlange hinzu mit `/play`."
            },
            noSongPlaying: {
                title: "## ❌ Kein Song wird abgespielt",
                message: "Derzeit wird kein Song abgespielt.",
                note: "Verwende `/play`, um Musik abzuspielen."
            },
            noMusicPlaying: {
                title: "## ❌ Keine Musik wird abgespielt",
                message: "Derzeit wird keine Musik abgespielt und die Warteschlange ist leer.",
                note: "Verwende `/play`, um Musik abzuspielen."
            }
        },
        responseHandler: {
            defaultError: {
                title: "## ❌ Fehler",
                message: "Beim Verarbeiten des Befehls ist ein Fehler aufgetreten.",
                note: "Bitte versuche es später erneut."
            },
            commandError: "❌ Beim Verarbeiten des Befehls {commandName} ist ein Fehler aufgetreten."
        }
    },
    console: {
        bot: {
            clientLogged: "Client angemeldet als {tag}",
            musicSystemReady: "Riffy-Musiksystem bereit 🎵",
            lavalinkError: "Fehler beim Initialisieren des Players: {message}",
            nodeManagerStatus: "Knoten-Manager: {available}/{total} Knoten verfügbar",
            nodeStatus: "Knoten-Status:",
            nodeInfo: "{icon} {name} ({host}:{port}) - {status}{error}",
            commandsLoaded: "Geladene Befehle insgesamt: {count}",
            commandLoadFailed: "Fehler beim Laden: {name} - Daten oder run-Eigenschaft fehlt",
            commandLoadError: "Fehler beim Laden von {name}: {message}",
            tokenVerification: "🔐 TOKEN-ÜBERPRÜFUNG",
            tokenAuthFailed: "Authentifizierung fehlgeschlagen ❌",
            tokenError: "Fehler: Aktiviere Intents oder setze einen neuen Token zurück",
            databaseOnline: "MongoDB Online ✅",
            databaseStatus: "🕸️  DATENBANK-STATUS",
            databaseConnection: "🕸️  DATENBANKVERBINDUNG",
            databaseFailed: "Verbindung fehlgeschlagen ❌",
            databaseError: "Fehler: {message}",
            unhandledRejection: "Unbehandelte Ablehnung:",
            uncaughtException: "Nicht abgefangene Ausnahme:",
            riffyThumbnailError: "[ Riffy ] Thumbnail-Fehler ignoriert: {message}"
        },
        events: {
            rest: {
                commandsRegistered: "{count} Anwendungsbefehle (/) erfolgreich global registriert ✅",
                commandsFailed: "Fehler beim Registrieren der Befehle ❌",
                error: "Fehler: {message}",
                details: "Details: {details}"
            },
            interaction: {
                commandNotFound: "Befehl nicht gefunden: {commandName}",
                errorExecuting: "Fehler beim Ausführen des Befehls {commandName}:",
                errorHelpButton: "Fehler beim Behandeln der Hilfe-Zurück-Schaltfläche:",
                errorHelpSelect: "Fehler beim Behandeln der Hilfe-Kategorieauswahl:",
                unexpectedError: "Unerwarteter Fehler:",
                failedToSendError: "Fehler beim Senden der Fehlermeldung:"
            }
        },
        mongodb: {
            uriNotDefined: "MongoDB-URI ist in der Konfiguration nicht definiert.",
            skippingConnection: "Überspringe MongoDB-Verbindung, da keine URI bereitgestellt wurde.",
            connected: "Verbunden mit MongoDB ✅",
            connectionFailed: "Verbindung zu MongoDB fehlgeschlagen. Fortfahren ohne Datenbankfunktionalität."
        },
        lavalink: {
            nodesConfigured: "Konfigurierte Knoten: {count}",
            riffyInitialized: "Mit {count} Knoten initialisiert",
            nodeKeys: "Knoten-Schlüssel:",
            failedToInitialize: "Fehler beim Initialisieren von Riffy: {message}",
            riffyReinitialized: "Riffy neu initialisiert",
            failedToReinitialize: "Fehler beim Neuinitialisieren von Riffy: {message}",
            nodeConnected: "Verbunden: {name} ({host}:{port}) • {available}/{total} aktiv",
            nodeDisconnected: "Getrennt: {name} ({host}:{port}) • {available}/{total} aktiv",
            retryLimitReported: "Wiederholungslimit von {name} gemeldet; Verbindungsschleife läuft weiter",
            nodeError: "Fehler: {name} ({host}:{port}) • {message}",
            nodeStatus: "{available}/{total} aktiv",
            waitingForConnection: "Warte auf Lavalink-Knotenverbindung...",
            nodeAvailable: "Knoten verfügbar ({count} verbunden)",
            noNodesConnected: "Keine Knoten verbunden ({connected}/{total}) — versuche erneut zu verbinden...",
            nodeStatusReport: "Knoten-Status: {connected}/{total} verbunden"
        },
        player: {
            lacksPermissions: "Dem Bot fehlen die erforderlichen Berechtigungen, um Nachrichten in diesem Kanal zu senden.",
            errorSendingMessage: "Fehler beim Senden der Nachricht: {message}",
            trackException: "Track-Ausnahme für Server {guildId}: {message}",
            trackStuck: "Track steckt fest für Server {guildId}: {message}",
            trackNull: "Track ist null oder fehlt Informationen für Server {guildId} - Ereignis wird ignoriert",
            playerInvalid: "Player ungültig oder zerstört für Server {guildId} - Ereignis wird ignoriert",
            channelNotFound: "Kanal nicht gefunden für Server {guildId}",
            errorSavingHistory: "Fehler beim Speichern im Verlauf:",
            errorMusicCard: "Fehler beim Erstellen oder Senden der Musikkarte: {message}",
            autoplayDisabled: "Automatische Wiedergabe ist für Server deaktiviert: {guildId}",
            errorQueueEnd: "Fehler beim Behandeln des Warteschlangenendes:",
            errorCleanupPrevious: "Fehler beim Bereinigen der vorherigen Track-Nachricht:",
            errorCleanupTrack: "Fehler beim Bereinigen der Track-Nachricht:",
            lyricsFetchError: "❌ Fehler beim Abrufen der Lyrics: {message}",
            unableToSendMessage: {
                title: "## ⚠️ Nachricht kann nicht gesendet werden",
                message: "Nachricht kann nicht gesendet werden. Bot-Berechtigungen überprüfen."
            },
            trackError: {
                title: "## ⚠️ Track-Fehler",
                message: "Track konnte nicht geladen werden.",
                skipping: "Überspringe zum nächsten Song..."
            },
            unableToLoadCard: {
                title: "## ⚠️ Track-Karte kann nicht geladen werden",
                message: "Track-Karte kann nicht geladen werden. Wiedergabe wird fortgesetzt..."
            },
            queueEnd: {
                noMoreAutoplay: "⚠️ **Keine weiteren Tracks zum automatischen Abspielen. Trenne Verbindung...**",
                queueEndedAutoplayDisabled: "🎶 **Warteschlange ist beendet. Automatische Wiedergabe ist deaktiviert.**",
                queueEmpty: "👾 **Warteschlange leer! Trenne Verbindung...**",
                twentyfoursevenEmpty: "🔄 **24/7-Modus: Bot bleibt im Sprachkanal. Warteschlange ist leer.**"
            },
            voiceChannelRequired: {
                title: "## 🔒 Sprachkanal Erforderlich",
                message: "Sie müssen im selben Sprachkanal sein, um die Steuerungen zu verwenden!"
            },
            controls: {
                skip: "⏭️ **Überspringe zum nächsten Song...**",
                queueCleared: "🗑️ **Warteschlange wurde geleert!**",
                playbackStopped: "⏹️ **Wiedergabe wurde gestoppt und Player wurde zerstört!**",
                alreadyPaused: "⏸️ **Wiedergabe ist bereits pausiert!**",
                playbackPaused: "⏸️ **Wiedergabe wurde pausiert!**",
                alreadyResumed: "▶️ **Wiedergabe wurde bereits fortgesetzt!**",
                playbackResumed: "▶️ **Wiedergabe wurde fortgesetzt!**",
                volumeMax: "🔊 **Lautstärke ist bereits auf Maximum!**",
                volumeMin: "🔉 **Lautstärke ist bereits auf Minimum!**",
                volumeChanged: "🔊 **Lautstärke wurde auf {volume}% geändert!**",
                trackLoopActivated: "🔁 **Track-Schleife ist aktiviert!**",
                queueLoopActivated: "🔁 **Warteschlangen-Schleife ist aktiviert!**",
                loopDisabled: "❌ **Schleife ist deaktiviert!**"
            },
            lyrics: {
                noSongPlaying: "🚫 **Es wird derzeit kein Song abgespielt.**",
                notFound: "❌ **Text nicht gefunden!**",
                liveTitle: "## 🎵 Live-Text: {title}",
                syncing: "🔄 Synchronisiere Text...",
                fullTitle: "## 🎵 Vollständiger Text: {title}",
                stopButton: "Text Stoppen",
                fullButton: "Vollständiger Text",
                deleteButton: "Löschen"
            },
            trackInfo: {
                title: "**Titel:**",
                author: "**Künstler:**",
                length: "**Länge:**",
                requester: "**Angefragt von:**",
                source: "**Quelle:**",
                progress: "**Fortschritt:**",
                unknownArtist: "Unbekannter Künstler",
                unknown: "Unbekannt"
            },
            controlLabels: {
                loop: "Schleife",
                disable: "Deaktivieren",
                skip: "Überspringen",
                queue: "Warteschlange",
                clear: "Leeren",
                stop: "Stopp",
                pause: "Pausieren",
                resume: "Fortsetzen",
                volUp: "Lautstärke +",
                volDown: "Lautstärke -"
            }
        }
    }
};
