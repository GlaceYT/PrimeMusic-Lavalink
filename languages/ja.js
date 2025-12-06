module.exports = {
    meta: {
        name: "日本語",
        code: "ja"
    },
    help: {
        command: {
            name: "help",
            description: "ボットとそのコマンドに関する情報を取得",
            category: {
                name: "category",
                description: "表示するカテゴリを選択",
                choices: {
                    main: "🏠 メインメニュー",
                    music: "🎵 音楽コマンド",
                    playlist: "📋 プレイリストコマンド",
                    basic: "💜 基本コマンド",
                    utility: "🔧 ユーティリティコマンド"
                }
            }
        },
        categories: {
            main: {
                name: "メインメニュー",
                emoji: "🏠",
                description: "ヘルプメニューへようこそ"
            },
            music: {
                name: "音楽コマンド",
                emoji: "🎵",
                description: "音楽の再生と設定を制御"
            },
            playlist: {
                name: "プレイリストコマンド",
                emoji: "📋",
                description: "プレイリストを管理"
            },
            basic: {
                name: "基本コマンド",
                emoji: "⚙️",
                description: "一般的なボット情報とユーティリティ"
            },
            utility: {
                name: "ユーティリティコマンド",
                emoji: "🔧",
                description: "追加のユーティリティ機能"
            }
        },
        mainMenu: {
            header: {
                title: "# 🎵 {botName} ヘルプメニュー",
                welcome: "**{botName}へようこそ！**",
                subtitle: "Discordでの究極の音楽パートナー。"
            },
            statistics: {
                title: "## 📊 統計",
                commands: "• **コマンド:** {totalCommands}",
                servers: "• **サーバー:** {totalServers}",
                users: "• **ユーザー:** {totalUsers}",
                uptime: "• **稼働時間:** {uptimeString}",
                ping: "• **Ping:** {ping}ms"
            },
            categories: {
                title: "## 📂 利用可能なカテゴリ",
                music: "{emoji} **{name}** - {count} コマンド",
                playlist: "{emoji} **{name}** - {count} コマンド",
                basic: "{emoji} **{name}** - {count} コマンド",
                utility: "{emoji} **{name}** - {count} コマンド",
                footer: "**詳細なコマンドを表示するには、以下のカテゴリを選択してください。**"
            },
            footer: {
                version: "**バージョン 1.4** • プライムミュージックボット",
                developer: "GlaceYT / https://GlaceYT.com によって開発"
            },
            selectMenu: {
                placeholder: "📂 コマンドを表示するカテゴリを選択...",
                musicDescription: "{count} コマンド利用可能",
                playlistDescription: "{count} コマンド利用可能",
                basicDescription: "{count} コマンド利用可能",
                utilityDescription: "{count} コマンド利用可能"
            },
            buttons: {
                supportServer: "サポートサーバー",
                github: "GitHub"
            }
        },
        categoryPage: {
            noCommands: {
                title: "## ❌ コマンドが見つかりません",
                message: "**{categoryName}** カテゴリにコマンドがありません。",
                backToHelp: "`/help` を使用してメインメニューに戻ります。"
            },
            header: {
                title: "# {emoji} {categoryName}",
                description: "{description}",
                count: "**{count}** コマンド{plural}が利用可能"
            },
            commands: {
                title: "## コマンド",
                titlePaginated: "## コマンド (ページ {currentPage}/{totalPages})",
                item: "**{num}.** `/{commandName}`\n   {description}",
                noDescription: "説明がありません。"
            },
            footer: {
                version: "**バージョン 1.4** • プライムミュージックボット",
                developer: "GlaceYT / https://GlaceYT.com によって開発"
            },
            buttons: {
                backToMain: "🏠 メインメニューに戻る",
                supportServer: "サポートサーバー",
                github: "GitHub"
            }
        },
        errors: {
            general: "❌ **ヘルプメニューの取得中にエラーが発生しました。**",
            fallback: "❌ ヘルプメニューの取得中にエラーが発生しました。",
            fallbackDetails: "**ボット:** {botName}\n**コマンド:** {totalCommands}\n**サーバー:** {totalServers}\n**サポート:** {supportServer}"
        }
    },
    language: {
        command: {
            name: "language",
            description: "このサーバーのボットの言語を設定",
            option: {
                name: "lang",
                description: "言語を選択"
            }
        },
        current: {
            title: "🌐 現在の言語",
            description: "このサーバーの現在の言語は: **{language}**",
            global: "グローバルデフォルト（設定から）: **{language}**"
        },
        changed: {
            title: "✅ 言語が変更されました",
            description: "サーバーの言語が **{language}** に変更されました",
            note: "ボットはこのサーバーのすべてのコマンドでこの言語を使用します。"
        },
        available: {
            title: "📚 利用可能な言語",
            description: "以下のリストから言語を選択してください:",
            list: "**利用可能な言語:**\n{list}",
            item: "• **{name}** (`{code}`)"
        },
        errors: {
            notFound: "❌ **言語が見つかりません！**\n言語 `{code}` は存在しません。",
            failed: "❌ **言語の設定に失敗しました！**\n{error}",
            noPermission: "❌ **言語を変更する権限がありません！**\n`サーバー管理` 権限が必要です。"
        },
        info: {
            title: "ℹ️ 言語情報",
            description: "**現在のサーバー言語:** {serverLang}\n**グローバルデフォルト言語:** {globalLang}\n\n**利用可能な言語:** {count}",
            reset: "グローバルデフォルトにリセットするには、`/language reset` を使用してください"
        }
    },
    ping: {
        command: {
            name: "ping",
            description: "ボットのレイテンシと応答時間を確認"
        },
        header: {
            title: "# 🏓 ボットのレイテンシ",
            botName: "**{botName}** - プライムミュージックボット",
            subtitle: "ボットの応答時間と接続状態を確認"
        },
        metrics: {
            title: "## ⚡ パフォーマンス指標",
            responseTime: "**応答時間:** {latency}ms",
            websocketPing: "**Websocket Ping:** {ping}ms",
            botUptime: "**ボット稼働時間:** {uptime}",
            connectionSpeed: {
                excellent: "🟢 優れた接続速度",
                good: "🟡 良好な接続速度",
                slow: "🔴 低速な接続速度"
            }
        },
        footer: {
            version: "**バージョン 1.4** • プライムミュージックボット",
            developer: "GlaceYT / https://GlaceYT.com によって開発"
        },
        errors: {
            title: "## ❌ エラー",
            message: "レイテンシの確認中にエラーが発生しました。\n後でもう一度お試しください。",
            fallback: "❌ レイテンシの確認中にエラーが発生しました。"
        }
    },
    stats: {
        command: {
            name: "stats",
            description: "ボットの統計とサーバー情報を表示"
        },
        header: {
            title: "# 📊 ボット統計",
            botName: "**{botName}** - プライムミュージックボット",
            developer: "GlaceYT / https://GlaceYT.com によって開発"
        },
        botInfo: {
            title: "## 📊 ボット情報",
            servers: "• **サーバー:** {count}",
            users: "• **ユーザー:** {count}",
            channels: "• **チャンネル:** {count}",
            uptime: "• **稼働時間:** {uptime}"
        },
        musicStats: {
            title: "## 🎵 音楽統計",
            activePlayers: "• **アクティブプレイヤー:** {count}",
            totalPlayers: "• **総プレイヤー数:** {count}",
            currentTrack: "• **現在のトラック:** {track}"
        },
        systemInfo: {
            title: "## 💻 システム情報",
            cpu: "• **CPU:** {cpu}",
            platform: "• **プラットフォーム:** {platform}",
            nodejs: "• **Node.js:** {version}",
            discordjs: "• **Discord.js:** {version}"
        },
        memory: {
            title: "## 💾 メモリとパフォーマンス",
            memoryUsage: "**メモリ使用量:**",
            used: "• 使用中: {used}",
            total: "• 合計: {total}",
            systemMemory: "**システムメモリ:**",
            systemUsed: "• 使用中: {used}",
            systemFree: "• 空き: {free}",
            performance: "**パフォーマンス:**",
            ping: "• Ping: {ping}ms",
            shards: "• シャード: {count}",
            commands: "• コマンド: {count}"
        },
        footer: {
            version: "**バージョン 1.4** • プライムミュージックボット",
            developer: "GlaceYT / https://GlaceYT.com によって開発"
        },
        errors: {
            title: "## ❌ エラー",
            message: "統計の取得中にエラーが発生しました。\n後でもう一度お試しください。",
            fallback: "❌ 統計の取得中にエラーが発生しました。"
        }
    },
    support: {
        command: {
            name: "support",
            description: "サポートサーバーのリンクと重要なリンクを取得"
        },
        header: {
            title: "# 🆘 サポートとリンク",
            botName: "**{botName}** - プライムミュージックボット",
            subtitle: "ヘルプを取得したり、問題を報告したり、私たちとつながりましょう！"
        },
        links: {
            title: "## 🔗 重要なリンク",
            supportServer: {
                title: "**📢 サポートサーバー**",
                description: "ヘルプ、アップデート、コミュニティのためにDiscordサーバーに参加してください！",
                link: "[ここをクリックして参加]({url})"
            },
            github: {
                title: "**💻 GitHub**",
                description: "コードをチェックして貢献してください！",
                link: "[GitHubにアクセス]({url})"
            },
            youtube: {
                title: "**🎬 YouTube**",
                description: "チュートリアルとアップデートをご覧ください！",
                link: "[チャンネル登録]({url})"
            },
            website: {
                title: "**🌐 ウェブサイト**",
                description: "公式ウェブサイトをご覧ください！",
                link: "[ウェブサイトにアクセス]({url})"
            }
        },
        footer: {
            version: "**バージョン 1.4** • プライムミュージックボット",
            developer: "GlaceYT / https://GlaceYT.com によって開発"
        },
        buttons: {
            supportServer: "サポートサーバー",
            github: "GitHub",
            youtube: "YouTube"
        },
        errors: {
            title: "## ❌ エラー",
            message: "サポート情報の取得中にエラーが発生しました。\n後でもう一度お試しください。",
            fallback: "❌ サポート情報の取得中にエラーが発生しました。"
        }
    },
    music: {
        autoplay: {
            command: {
                name: "autoplay",
                description: "サーバーの自動再生を切り替え"
            },
            enabled: {
                title: "## ✅ 自動再生が有効になりました",
                message: "このサーバーで自動再生が**有効**になりました。",
                note: "🎵 キューが終了すると、ボットは自動的に類似の曲を再生します。"
            },
            disabled: {
                title: "## ❌ 自動再生が無効になりました",
                message: "このサーバーで自動再生が**無効**になりました。",
                note: "⏹️ キューが終了すると、ボットは再生を停止します。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "自動再生設定の更新中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        pause: {
            command: {
                name: "pause",
                description: "現在の曲を一時停止"
            },
            success: {
                title: "## ⏸️ 音楽が一時停止されました",
                message: "現在のトラックが一時停止されました。",
                note: "再生を続けるには `/resume` を使用してください。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "音楽の一時停止中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        resume: {
            command: {
                name: "resume",
                description: "現在の曲を再開"
            },
            success: {
                title: "## ▶️ 音楽が再開されました",
                message: "現在のトラックが再開されました。",
                note: "音楽が再生されています。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "音楽の再開中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        skip: {
            command: {
                name: "skip",
                description: "現在の曲をスキップ"
            },
            success: {
                title: "## ⏭️ 曲がスキップされました",
                message: "現在のトラックがスキップされました。",
                nextSong: "キューの次の曲を再生中...",
                queueEmpty: "キューが空です。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "曲のスキップ中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        stop: {
            command: {
                name: "stop",
                description: "現在の曲を停止してプレイヤーを破棄"
            },
            success: {
                title: "## ⏹️ 音楽が停止されました",
                message24_7: "音楽が停止されました。プレイヤーはアクティブのまま（24/7モードが有効）。",
                messageNormal: "音楽が停止され、プレイヤーが破棄されました。",
                note: "音楽の再生を再開するには `/play` を使用してください。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "音楽の停止中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        volume: {
            command: {
                name: "volume",
                description: "現在の曲の音量を設定"
            },
            invalid: {
                title: "## ❌ 無効な音量",
                message: "音量は **0** から **100** の間である必要があります。",
                note: "有効な音量レベルを入力してください。"
            },
            success: {
                title: "## 🔊 音量が更新されました",
                message: "音量が **{volume}%** に設定されました。",
                muted: "🔇 ミュート",
                low: "🔉 低",
                medium: "🔊 中",
                high: "🔊🔊 高"
            },
            errors: {
                title: "## ❌ エラー",
                message: "音量の設定中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        shuffle: {
            command: {
                name: "shuffle",
                description: "現在のキューをシャッフル"
            },
            queueEmpty: {
                title: "## ❌ キューが空です",
                message: "キューが空です。シャッフルする曲がありません。",
                note: "まず `/play` を使用してキューに曲を追加してください。"
            },
            success: {
                title: "## 🔀 キューがシャッフルされました",
                message: "キューが正常にシャッフルされました！",
                count: "**{count}** 曲{plural}が並べ替えられました。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "キューのシャッフル中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        np: {
            command: {
                name: "np",
                description: "現在再生中の曲をプログレスバーと共に表示"
            },
            title: "## 🎵 再生中",
            nowPlaying: "**[{title}]({uri})**",
            by: "アーティスト: **{author}**",
            errors: {
                title: "## ❌ エラー",
                message: "現在のトラックの取得中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        queue: {
            command: {
                name: "queue",
                description: "現在のキューを表示"
            },
            title: "## 📋 現在のキュー",
            titlePaginated: "## 📋 現在のキュー (ページ {currentPage}/{totalPages})",
            nowPlaying: "🎵 **再生中:**",
            track: "[{title}]({uri})",
            requestedBy: "リクエスト: {requester}",
            trackNumber: "**{number}.**",
            noMoreSongs: "これ以上の曲はありません",
            buttons: {
                previous: "⬅ 前へ",
                next: "次へ ➡"
            },
            errors: {
                title: "## ❌ エラー",
                message: "キューの取得中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        remove: {
            command: {
                name: "remove",
                description: "位置を指定してキューから曲を削除"
            },
            queueEmpty: {
                title: "## ❌ キューが空です",
                message: "キューが空です。削除する曲がありません。",
                note: "まず `/play` を使用してキューに曲を追加してください。"
            },
            invalidPosition: {
                title: "## ❌ 無効な位置",
                message: "位置は **1** から **{max}** の間である必要があります。",
                note: "キューには **{count}** 曲{plural}あります。"
            },
            success: {
                title: "## ✅ 曲が削除されました",
                removed: "**削除:** [{title}]({uri})",
                position: "**位置:** {position}",
                message: "曲がキューから削除されました。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "曲の削除中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        move: {
            command: {
                name: "move",
                description: "トラックをキュー内の別の位置に移動"
            },
            queueEmpty: {
                title: "## ❌ キューが空です",
                message: "キューが空です。移動する曲がありません。",
                note: "まず `/play` を使用してキューに曲を追加してください。"
            },
            invalidPosition: {
                title: "## ❌ 無効な位置",
                message: "位置は **1** から **{max}** の間である必要があります。",
                note: "キューには **{count}** 曲{plural}あります。"
            },
            samePosition: {
                title: "## ❌ 同じ位置",
                message: "移動元と移動先の位置を同じにすることはできません。",
                note: "異なる位置を指定してください。"
            },
            success: {
                title: "## ✅ トラックが移動されました",
                track: "**トラック:** [{title}]({uri})",
                from: "**移動元の位置:** {from}",
                to: "**移動先の位置:** {to}",
                message: "トラックが正常に移動されました。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "トラックの移動中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        jump: {
            command: {
                name: "jump",
                description: "キュー内の特定のトラックにジャンプ"
            },
            queueEmpty: {
                title: "## ❌ キューが空です",
                message: "キューが空です。ジャンプする曲がありません。",
                note: "まず `/play` を使用してキューに曲を追加してください。"
            },
            invalidPosition: {
                title: "## ❌ 無効な位置",
                message: "位置は **1** から **{max}** の間である必要があります。",
                note: "キューには **{count}** 曲{plural}あります。"
            },
            success: {
                title: "## ⏭️ トラックにジャンプしました",
                track: "**トラック:** [{title}]({uri})",
                position: "**位置:** {position}",
                message: "キュー内の指定されたトラックにジャンプしました。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "トラックへのジャンプ中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        seek: {
            command: {
                name: "seek",
                description: "現在のトラックの特定の時間にシーク"
            },
            invalidTime: {
                title: "## ❌ 無効な時間",
                message: "無効な時間形式です。次のいずれかを使用してください:",
                formats: "• **MM:SS** (例: 1:30)\n• **HH:MM:SS** (例: 1:05:30)\n• **秒** (例: 90)",
                trackLength: "**トラックの長さ:** {length}"
            },
            success: {
                title: "## ⏩ 位置にシークしました",
                time: "**時間:** {time}",
                track: "**トラック:** [{title}]({uri})",
                message: "トラックが指定された時間にシークされました。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "シーク中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        trackinfo: {
            command: {
                name: "trackinfo",
                description: "現在のトラックの詳細情報を表示"
            },
            trackInfo: {
                title: "## 🎵 トラック情報",
                titleLabel: "**タイトル:** [{title}]({uri})",
                artist: "**アーティスト:** {artist}",
                duration: "**長さ:** {duration}",
                source: "**ソース:** {source}"
            },
            progress: {
                title: "## 📊 進行状況",
                current: "**現在:** {current}",
                total: "**合計:** {total}",
                progress: "**進行状況:** {progress}%"
            },
            status: {
                title: "## 🎚️ プレイヤー状態",
                volume: "**音量:** {volume}%",
                loop: "**ループ:** {loop}",
                status: "**状態:** {status}",
                queue: "**キュー:** {count} トラック{plural}"
            },
            errors: {
                title: "## ❌ エラー",
                message: "トラック情報の取得中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        voteskip: {
            command: {
                name: "voteskip",
                description: "現在のトラックをスキップするために投票"
            },
            alreadyVoted: {
                title: "## ❌ 既に投票済み",
                message: "このトラックのスキップに既に投票しています。",
                votes: "**現在の投票数:** {current}/{required}"
            },
            success: {
                title: "## ✅ 投票が追加されました",
                message: "投票が追加されました！",
                currentVotes: "**現在の投票数:** {current}/{required}",
                required: "**必要数:** スキップには {required} 票必要",
                moreNeeded: "あと {count} 票{plural}必要です。"
            },
            skipped: {
                title: "## ⏭️ 投票によりトラックがスキップされました",
                message: "トラックがスキップされました！",
                votes: "**投票数:** {current}/{required}",
                required: "**必要数:** {required} 票"
            },
            errors: {
                title: "## ❌ エラー",
                message: "投票の処理中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        filters: {
            command: {
                name: "filters",
                description: "オーディオフィルターを制御"
            },
            cleared: {
                title: "## ✅ フィルターがクリアされました",
                message: "すべてのオーディオフィルターがクリアされました。",
                note: "オーディオが通常に戻りました。"
            },
            invalid: {
                title: "## ❌ 無効なフィルター",
                message: "選択したフィルターは無効です。",
                note: "オプションから有効なフィルターを選択してください。"
            },
            success: {
                title: "## 🎛️ フィルターが適用されました",
                filter: "**フィルター:** {filter}",
                message: "オーディオフィルターが正常に適用されました。",
                note: "すべてのフィルターを削除するには `/filters clear` を使用してください。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "フィルターの適用中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        play: {
            command: {
                name: "play",
                description: "名前またはリンクから曲を再生"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalinkマネージャーエラー",
                message: "Lavalinkノードマネージャーが初期化されていません。",
                note: "ボット管理者に連絡してください。"
            },
            noNodes: {
                title: "## ❌ Lavalinkノードなし",
                message: "現在利用可能なLavalinkノードがありません（{connected}/{total} 接続中）。",
                note: "ボットは再接続を試みています。しばらくしてからもう一度お試しください。"
            },
            spotifyError: {
                title: "## ❌ Spotifyエラー",
                message: "Spotifyデータの取得に失敗しました。",
                note: "リンクを確認して、もう一度お試しください。"
            },
            invalidResponse: {
                title: "## ❌ 無効な応答",
                message: "音楽ソースからの無効な応答です。",
                note: "もう一度試すか、別のクエリを使用してください。"
            },
            noResults: {
                title: "## ❌ 結果なし",
                message: "クエリの結果が見つかりませんでした。",
                note: "別の検索語やリンクを試してください。"
            },
            success: {
                titleTrack: "## ✅ トラックが追加されました",
                titlePlaylist: "## ✅ プレイリストが追加されました",
                trackAdded: "トラックがキューに追加されました。",
                playlistAdded: "**{count}** トラックがキューに追加されました。",
                nowPlaying: "🎵 再生中...",
                queueReady: "⏸️ キュー準備完了"
            },
            errors: {
                title: "## ❌ エラー",
                message: "リクエストの処理中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        search: {
            command: {
                name: "search",
                description: "曲を検索して結果から選択"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalinkマネージャーエラー",
                message: "Lavalinkノードマネージャーが初期化されていません。",
                note: "ボット管理者に連絡してください。"
            },
            noNodes: {
                title: "## ❌ Lavalinkノードなし",
                message: "現在利用可能なLavalinkノードがありません（{connected}/{total} 接続中）。",
                note: "ボットは再接続を試みています。しばらくしてからもう一度お試しください。"
            },
            noResults: {
                title: "## ❌ 結果なし",
                message: "検索クエリの結果が見つかりませんでした。",
                note: "別の検索語を試してください。"
            },
            playlistNotSupported: {
                title: "## ❌ プレイリストはサポートされていません",
                message: "プレイリストは検索でサポートされていません。",
                note: "プレイリストには `/play` コマンドを使用してください。"
            },
            results: {
                title: "## 🔍 検索結果",
                query: "**クエリ:** {query}",
                track: "**{number}.** [{title}]({uri})\n   └ {author} • {duration}"
            },
            buttons: {
                cancel: "キャンセル"
            },
            errors: {
                title: "## ❌ エラー",
                message: "検索中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        }
    },
    playlist: {
        createplaylist: {
            command: {
                name: "createplaylist",
                description: "新しいプレイリストを作成"
            },
            alreadyExists: {
                title: "## ❌ プレイリストは既に存在します",
                message: "**\"{name}\"** という名前のプレイリストは既に存在します。",
                note: "別の名前を選択してください。"
            },
            success: {
                title: "## ✅ プレイリストが作成されました",
                message: "プレイリスト **\"{name}\"** が正常に作成されました！",
                visibility: "**公開設定:** {visibility}",
                server: "**サーバー:** {server}",
                private: "🔒 プライベート",
                public: "🌐 公開"
            },
            errors: {
                title: "## ❌ エラー",
                message: "プレイリストの作成中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        addsong: {
            command: {
                name: "addsong",
                description: "プレイリストに曲を追加"
            },
            notFound: {
                title: "## ❌ プレイリストが見つかりません",
                message: "プレイリスト **\"{name}\"** は存在しません。",
                note: "プレイリスト名を確認して、もう一度お試しください。"
            },
            accessDenied: {
                title: "## 🔒 アクセスが拒否されました",
                message: "このプレイリストを変更する権限がありません。",
                note: "プレイリストの所有者のみが曲を追加できます。"
            },
            success: {
                title: "## ✅ 曲が追加されました",
                song: "**曲:** {song}",
                playlist: "**プレイリスト:** {playlist}",
                message: "曲がプレイリストに正常に追加されました！"
            },
            errors: {
                title: "## ❌ エラー",
                message: "曲の追加中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        deleteplaylist: {
            command: {
                name: "deleteplaylist",
                description: "プレイリストを削除"
            },
            notFound: {
                title: "## ❌ プレイリストが見つかりません",
                message: "プレイリスト **\"{name}\"** は存在しません。",
                note: "プレイリスト名を確認して、もう一度お試しください。"
            },
            accessDenied: {
                title: "## 🔒 アクセスが拒否されました",
                message: "このプレイリストを削除する権限がありません。",
                note: "プレイリストの所有者のみが削除できます。"
            },
            success: {
                title: "## ✅ プレイリストが削除されました",
                message: "プレイリスト **\"{name}\"** が正常に削除されました。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "プレイリストの削除中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        deletesong: {
            command: {
                name: "deletesong",
                description: "プレイリストから曲を削除"
            },
            notFound: {
                title: "## ❌ プレイリストが見つかりません",
                message: "プレイリスト **\"{name}\"** は存在しません。",
                note: "プレイリスト名を確認して、もう一度お試しください。"
            },
            success: {
                title: "## ✅ 曲が削除されました",
                song: "**曲:** {song}",
                playlist: "**プレイリスト:** {playlist}",
                message: "曲がプレイリストから正常に削除されました。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "曲の削除中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        savequeue: {
            command: {
                name: "savequeue",
                description: "現在のキューをプレイリストとして保存"
            },
            queueEmpty: {
                title: "## ❌ キューが空です",
                message: "キューが空です。保存するものがありません。",
                note: "まずキューに曲を追加してください！"
            },
            alreadyExists: {
                title: "## ❌ プレイリストは既に存在します",
                message: "**\"{name}\"** という名前のプレイリストは既に存在します。",
                note: "別の名前を選択してください。"
            },
            success: {
                title: "## ✅ キューが保存されました！",
                message: "キューがプレイリスト **\"{name}\"** として保存されました",
                tracks: "**トラック数:** {count}"
            },
            errors: {
                title: "## ❌ エラー",
                message: "キューの保存中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        myplaylists: {
            command: {
                name: "myplaylists",
                description: "作成したすべてのプレイリストを一覧表示"
            },
            noPlaylists: {
                title: "## 📋 プレイリストが見つかりません",
                message: "まだプレイリストを作成していません。",
                note: "`/createplaylist` を使用して最初のプレイリストを作成してください！"
            },
            title: "## 📂 あなたのプレイリスト (ページ {currentPage}/{totalPages})",
            playlistItem: "**{number}.** **{name}**\n   • 公開設定: **{visibility}**\n   • サーバー: {server}\n   • 曲数: **{count}**",
            visibilityPrivate: "🔒 プライベート",
            visibilityPublic: "🌐 公開",
            errors: {
                title: "## ❌ エラー",
                message: "プレイリストの取得中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        allplaylists: {
            command: {
                name: "allplaylists",
                description: "すべての公開プレイリストを一覧表示"
            },
            noPlaylists: {
                title: "## 📋 公開プレイリストが見つかりません",
                message: "利用可能な公開プレイリストがありません。",
                note: "`/createplaylist` を使用して公開プレイリストを作成してください！"
            },
            title: "## 🌐 公開プレイリスト (ページ {currentPage}/{totalPages})",
            playlistItem: "**{number}.** **{name}**\n   • 作成者: {creator}\n   • サーバー: {server}\n   • 曲数: **{count}**",
            errors: {
                title: "## ❌ エラー",
                message: "公開プレイリストの取得中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        showsongs: {
            command: {
                name: "showsongs",
                description: "プレイリスト内のすべての曲を表示"
            },
            notFound: {
                title: "## ❌ プレイリストが見つかりません",
                message: "プレイリスト **\"{name}\"** は存在しません。",
                note: "プレイリスト名を確認して、もう一度お試しください。"
            },
            accessDenied: {
                title: "## 🔒 アクセスが拒否されました",
                message: "このプレイリストを表示する権限がありません。",
                note: "このプレイリストはプライベートで、所有者のみが表示できます。"
            },
            empty: {
                title: "## 📋 \"{name}\" の曲",
                message: "このプレイリストは空です。`/addsong` を使用して曲を追加してください！"
            },
            title: "## 🎵 \"{name}\" の曲 (ページ {currentPage}/{totalPages})",
            errors: {
                title: "## ❌ エラー",
                message: "プレイリストの曲の表示中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        },
        playcustomplaylist: {
            command: {
                name: "playcustomplaylist",
                description: "カスタムプレイリストを再生"
            },
            notFound: {
                title: "## ❌ プレイリストが見つかりません",
                message: "プレイリスト **\"{name}\"** は存在しません。",
                note: "プレイリスト名を確認して、もう一度お試しください。"
            },
            accessDenied: {
                title: "## 🔒 アクセスが拒否されました",
                message: "このプレイリストを再生する権限がありません。",
                note: "このプレイリストはプライベートで、所有者のみが再生できます。"
            },
            empty: {
                title: "## ❌ 空のプレイリスト",
                message: "プレイリスト **\"{name}\"** は空です。",
                note: "まずプレイリストに曲を追加してください！"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalinkマネージャーエラー",
                message: "Lavalinkノードマネージャーが初期化されていません。",
                note: "ボット管理者に連絡してください。"
            },
            noNodes: {
                title: "## ❌ Lavalinkノードなし",
                message: "現在利用可能なLavalinkノードがありません（{connected}/{total} 接続中）。",
                note: "ボットは再接続を試みています。しばらくしてからもう一度お試しください。"
            },
            resolveError: {
                title: "## ❌ 曲の解決エラー",
                message: "プレイリストから1つ以上の曲を解決できませんでした。",
                note: "プレイリストを確認して、もう一度お試しください。"
            },
            success: {
                title: "## 🎵 プレイリストを再生中",
                message: "プレイリスト **\"{name}\"** を再生中",
                songs: "**曲数:** {count}"
            },
            errors: {
                title: "## ❌ エラー",
                message: "プレイリストの再生中にエラーが発生しました。\n後でもう一度お試しください。"
            }
        }
    },
    utility: {
        twentyfourseven: {
            command: {
                name: "247",
                description: "24/7モードを切り替え（ボットをボイスチャンネルに常駐）"
            },
            accessDenied: {
                title: "## ❌ アクセスが拒否されました",
                message: "24/7モードを切り替えられるのはサーバー所有者のみです。"
            },
            enabled: {
                title: "## ✅ 24/7モードが有効になりました",
                message: "このサーバーで24/7モードが**有効**になりました。",
                note: "🔄 キューが空でも、ボットはボイスチャンネルに留まります。"
            },
            disabled: {
                title: "## ❌ 24/7モードが無効になりました",
                message: "このサーバーで24/7モードが**無効**になりました。",
                note: "⏹️ キューが終了すると、ボットはボイスチャンネルから退出します。"
            },
            errors: {
                title: "## ❌ エラー",
                message: "24/7モードの更新中にエラーが発生しました。",
                note: "後でもう一度お試しください。"
            }
        },
        history: {
            command: {
                name: "history",
                description: "最近再生されたトラックを表示"
            },
            noHistory: {
                title: "## 📜 履歴が見つかりません",
                message: "このサーバーの再生履歴が見つかりませんでした。",
                note: "履歴を作成するために曲を再生してください！"
            },
            title: "## 📜 再生履歴",
            titlePaginated: "## 📜 再生履歴 (ページ {currentPage}/{totalPages})",
            noMoreSongs: "- 履歴にこれ以上の曲はありません。",
            buttons: {
                previous: "⬅ 前へ",
                next: "次へ ➡"
            },
            errors: {
                title: "## ❌ エラー",
                message: "履歴の取得中にエラーが発生しました。",
                note: "後でもう一度お試しください。"
            }
        }
    },
    events: {
        interactionCreate: {
            noGuild: "❌ **このコマンドはサーバーでのみ使用できます。**",
            commandNotFound: "❌ **コマンドが見つかりません！**",
            noPermission: "❌ **このコマンドを使用する権限がありません。**",
            errorOccurred: "❌ **エラーが発生しました: {message}**",
            unexpectedError: "❌ **予期しないエラーが発生しました。後でもう一度お試しください。**",
            errorTryAgain: "❌ エラーが発生しました。もう一度お試しください。"
        }
    },
    utils: {
        voiceChannelCheck: {
            noVoiceChannel: {
                title: "## ❌ ボイスチャンネルなし",
                message: "このコマンドを使用するにはボイスチャンネルに参加する必要があります。",
                note: "ボイスチャンネルに参加してから、もう一度お試しください。"
            },
            wrongChannel: {
                title: "## 🎵 ボイスチャンネルに参加",
                message: "ボットは現在 **{channelName}** でアクティブです。",
                note: "音楽コマンドを使用するには **{channelName}** に参加してください。"
            }
        },
        playerValidation: {
            queueEmpty: {
                title: "## ❌ キューが空です",
                message: "キューが空です。利用可能な曲がありません。",
                note: "まず `/play` を使用してキューに曲を追加してください。"
            },
            noSongPlaying: {
                title: "## ❌ 曲が再生されていません",
                message: "現在再生中の曲がありません。",
                note: "音楽の再生を開始するには `/play` を使用してください。"
            },
            noMusicPlaying: {
                title: "## ❌ 音楽が再生されていません",
                message: "現在音楽が再生されておらず、キューも空です。",
                note: "音楽の再生を開始するには `/play` を使用してください。"
            }
        },
        responseHandler: {
            defaultError: {
                title: "## ❌ エラー",
                message: "コマンドの処理中にエラーが発生しました。",
                note: "後でもう一度お試しください。"
            },
            commandError: "❌ コマンド {commandName} の処理中にエラーが発生しました。"
        }
    },
    console: {
        bot: {
            clientLogged: "クライアントが {tag} としてログインしました",
            musicSystemReady: "Riffy音楽システム準備完了 🎵",
            lavalinkError: "プレイヤーの初期化エラー: {message}",
            nodeManagerStatus: "ノードマネージャー: {available}/{total} ノードが利用可能",
            nodeStatus: "ノード状態:",
            nodeInfo: "{icon} {name} ({host}:{port}) - {status}{error}",
            commandsLoaded: "ロードされたコマンドの合計: {count}",
            commandLoadFailed: "ロード失敗: {name} - データまたはrunプロパティがありません",
            commandLoadError: "{name} のロードエラー: {message}",
            tokenVerification: "🔐 トークン検証",
            tokenAuthFailed: "認証失敗 ❌",
            tokenError: "エラー: Intentsを有効にするか、新しいトークンをリセットしてください",
            databaseOnline: "MongoDB オンライン ✅",
            databaseStatus: "🕸️  データベース状態",
            databaseConnection: "🕸️  データベース接続",
            databaseFailed: "接続失敗 ❌",
            databaseError: "エラー: {message}",
            unhandledRejection: "未処理の拒否:",
            uncaughtException: "キャッチされない例外:",
            riffyThumbnailError: "[ Riffy ] サムネイルエラーを無視: {message}"
        },
        events: {
            rest: {
                commandsRegistered: "{count} 個のアプリケーション (/) コマンドがグローバルに正常に登録されました ✅",
                commandsFailed: "コマンドの登録に失敗しました ❌",
                error: "エラー: {message}",
                details: "詳細: {details}"
            },
            interaction: {
                commandNotFound: "コマンドが見つかりません: {commandName}",
                errorExecuting: "コマンド {commandName} の実行エラー:",
                errorHelpButton: "ヘルプの戻るボタンの処理エラー:",
                errorHelpSelect: "ヘルプカテゴリ選択の処理エラー:",
                unexpectedError: "予期しないエラー:",
                failedToSendError: "エラーメッセージの送信に失敗しました:"
            }
        },
        mongodb: {
            uriNotDefined: "MongoDB URIが設定で定義されていません。",
            skippingConnection: "URIが提供されていないため、MongoDBへの接続をスキップします。",
            connected: "MongoDBに接続されました ✅",
            connectionFailed: "MongoDBへの接続に失敗しました。データベース機能なしで続行します。"
        },
        lavalink: {
            nodesConfigured: "設定されたノード: {count}",
            riffyInitialized: "{count} ノードで初期化されました",
            nodeKeys: "ノードキー:",
            failedToInitialize: "Riffyの初期化に失敗しました: {message}",
            riffyReinitialized: "Riffyが再初期化されました",
            failedToReinitialize: "Riffyの再初期化に失敗しました: {message}",
            nodeConnected: "接続されました: {name} ({host}:{port}) • {available}/{total} アクティブ",
            nodeDisconnected: "切断されました: {name} ({host}:{port}) • {available}/{total} アクティブ",
            retryLimitReported: "{name} により再試行制限が報告されました; 再接続ループは続行します",
            nodeError: "エラー: {name} ({host}:{port}) • {message}",
            nodeStatus: "{available}/{total} アクティブ",
            waitingForConnection: "Lavalinkノードの接続を待機中...",
            nodeAvailable: "ノード利用可能（{count} 接続）",
            noNodesConnected: "接続されているノードがありません（{connected}/{total}） — 再接続を試みています...",
            nodeStatusReport: "ノード状態: {connected}/{total} 接続"
        },
        player: {
            lacksPermissions: "ボットにこのチャンネルでメッセージを送信する権限がありません。",
            errorSendingMessage: "メッセージの送信エラー: {message}",
            trackException: "サーバー {guildId} のトラック例外: {message}",
            trackStuck: "サーバー {guildId} のトラックがスタックしました: {message}",
            trackNull: "サーバー {guildId} のトラックがnullまたは情報が不足しています - イベントを無視",
            playerInvalid: "サーバー {guildId} のプレイヤーが無効または破棄されました - イベントを無視",
            channelNotFound: "サーバー {guildId} のチャンネルが見つかりません",
            errorSavingHistory: "履歴の保存エラー:",
            errorMusicCard: "音楽カードの作成または送信エラー: {message}",
            autoplayDisabled: "サーバーで自動再生が無効です: {guildId}",
            errorQueueEnd: "キュー終了の処理エラー:",
            errorCleanupPrevious: "前のトラックメッセージのクリーンアップエラー:",
            errorCleanupTrack: "トラックメッセージのクリーンアップエラー:",
            lyricsFetchError: "❌ 歌詞の取得エラー: {message}",
            unableToSendMessage: {
                title: "## ⚠️ メッセージを送信できません",
                message: "メッセージを送信できません。ボットの権限を確認してください。"
            },
            trackError: {
                title: "## ⚠️ トラックエラー",
                message: "トラックを読み込めませんでした。",
                skipping: "次の曲にスキップしています..."
            },
            unableToLoadCard: {
                title: "## ⚠️ トラックカードを読み込めません",
                message: "トラックカードを読み込めません。再生を続行します..."
            },
            queueEnd: {
                noMoreAutoplay: "⚠️ **自動再生するトラックがこれ以上ありません。切断しています...**",
                queueEndedAutoplayDisabled: "🎶 **キューが終了しました。自動再生が無効です。**",
                queueEmpty: "👾 **キューが空です！切断しています...**",
                twentyfoursevenEmpty: "🔄 **24/7モード: ボットは音声チャンネルに留まります。キューが空です。**"
            },
            voiceChannelRequired: {
                title: "## 🔒 音声チャンネルが必要",
                message: "コントロールを使用するには、同じ音声チャンネルにいる必要があります！"
            },
            controls: {
                skip: "⏭️ **次の曲にスキップしています...**",
                queueCleared: "🗑️ **キューがクリアされました！**",
                playbackStopped: "⏹️ **再生が停止され、プレイヤーが破棄されました！**",
                alreadyPaused: "⏸️ **再生は既に一時停止されています！**",
                playbackPaused: "⏸️ **再生が一時停止されました！**",
                alreadyResumed: "▶️ **再生は既に再開されています！**",
                playbackResumed: "▶️ **再生が再開されました！**",
                volumeMax: "🔊 **音量は既に最大です！**",
                volumeMin: "🔉 **音量は既に最小です！**",
                volumeChanged: "🔊 **音量が{volume}%に変更されました！**",
                trackLoopActivated: "🔁 **トラックループが有効になりました！**",
                queueLoopActivated: "🔁 **キューループが有効になりました！**",
                loopDisabled: "❌ **ループが無効になりました！**"
            },
            lyrics: {
                noSongPlaying: "🚫 **現在再生中の曲はありません。**",
                notFound: "❌ **歌詞が見つかりませんでした！**",
                liveTitle: "## 🎵 ライブ歌詞: {title}",
                syncing: "🔄 歌詞を同期しています...",
                fullTitle: "## 🎵 完全な歌詞: {title}",
                stopButton: "歌詞を停止",
                fullButton: "完全な歌詞",
                deleteButton: "削除"
            },
            trackInfo: {
                title: "**タイトル:**",
                author: "**アーティスト:**",
                length: "**長さ:**",
                requester: "**リクエスト者:**",
                source: "**ソース:**",
                progress: "**進行状況:**",
                unknownArtist: "不明なアーティスト",
                unknown: "不明"
            },
            controlLabels: {
                loop: "ループ",
                disable: "無効化",
                skip: "スキップ",
                queue: "キュー",
                clear: "クリア",
                stop: "停止",
                pause: "一時停止",
                resume: "再開",
                volUp: "音量 +",
                volDown: "音量 -"
            }
        }
    }
};