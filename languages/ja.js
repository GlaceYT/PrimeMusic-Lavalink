module.exports = {
    footer: "SSRR により開発 | Prime Music v1.2",
    ping: {
      description: "ボットの応答時間を確認",
      response: "応答時間を計測中...",
      embed: {
        title: "ボット応答時間",
        responseTime: "- ボット応答時間：**{latency}ミリ秒**",
        websocketPing: "- WebSocket応答時間：**{ping}ミリ秒**",
        uptime: "- 稼働時間：**{uptime}**",
        footer: "SSRR により開発 | Prime Music v1.2"
      }
    },
    addsong: {
      embed: {
          playlistNotFound: "プレイリストが見つかりません",
          playlistNotFoundDescription: "- プレイリストが見つかりません。",
          accessDenied: "アクセス拒否",
          accessDeniedDescription: "- このプレイリストに曲を追加する権限がありません。",
          songAdded: "曲を追加しました",
          songAddedDescription: "- 曲 **{songInput}** をプレイリスト **{playlistName}** に追加しました。",
          error: "エラー",
          errorDescription: "- 曲の追加中にエラーが発生しました。"
      }
    },
    allplaylists: {
      embed: {
          noPlaylistsFound: "プレイリストが見つかりません",
          noPlaylistsFoundDescription: "- 現在公開プレイリストはありません。",
          createdBy: "作成者：{userId}",
          serverName: "サーバー：{serverName}",
          songs: "曲数：**{songCount}**",
          publicPlaylistsTitle: "公開プレイリスト（{currentPage}/{totalPages}ページ）",
          error: "エラー",
          errorDescription: "- プレイリストの取得中にエラーが発生しました。"
      }
    },
    autoplay: {
      embed: {
          autoplayUpdated: "自動再生を更新しました",
          autoplayStatus: "- このサーバーの自動再生が**{status}**されました。",
          enabled: "有効",
          disabled: "無効",
          error: "エラー",
          errorDescription: "- 自動再生の更新中にエラーが発生しました。"
      },
      commandDescription: "自動再生を有効または無効にする"
    },
    createplaylist: {
      embed: {
          playlistExists: "プレイリストが既に存在します",
          playlistExistsDescription: "- この名前のプレイリストは既に存在します。",
          playlistCreated: "プレイリストを作成しました",
          playlistCreatedDescription: "- プレイリスト **{playlistName}** を作成しました。\n- 公開設定：**{visibility}**。",
          private: "非公開",
          public: "公開",
          error: "エラー",
          errorDescription: "- プレイリストの作成中にエラーが発生しました。"
      },
      commandDescriptionName: "プレイリスト名を入力",
      commandDescriptionPrivate: "プレイリストを非公開に設定（あなたのみ閲覧可能）"
    },
    deleteplaylist: {
      embed: {
          playlistNotFound: "プレイリストが見つかりません",
          playlistNotFoundDescription: "- プレイリストが見つかりません。",
          accessDenied: "アクセス拒否",
          accessDeniedDescription: "- このプレイリストを削除する権限がありません。",
          playlistDeleted: "プレイリストを削除しました",
          playlistDeletedDescription: "- プレイリスト **{playlistName}** を削除しました。",
          error: "エラー",
          errorDescription: "- プレイリストの削除中にエラーが発生しました。"
      },
      commandDescriptionName: "プレイリスト名を入力"
    },
    deletesong: {
      embed: {
          playlistNotFound: "プレイリストが見つかりません",
          playlistNotFoundDescription: "- プレイリストが見つかりません。",
          songDeleted: "曲を削除しました",
          songDeletedDescription: "- プレイリスト **{playlistName}** から曲 **{songName}** を削除しました。",
          error: "エラー",
          errorDescription: "- 曲の削除中にエラーが発生しました。"
      },
      commandDescriptionPlaylist: "プレイリスト名を入力",
      commandDescriptionSong: "曲名を入力"
    },
    filters: {
      embed: {
          error: "エラー",
          noPlayer: "- アクティブなプレイヤーが見つかりません。先に曲を再生してください。",
          wrongChannel: "- このコマンドを使用するにはボットと同じボイスチャンネルにいる必要があります。",
          filtersCleared: "全てのフィルターをクリアしました。",
          invalidFilter: "無効なフィルターが選択されました。",
          filterApplied: "フィルター **{filter}** を適用しました。",
          errorProcessing: "- リクエストの処理中にエラーが発生しました。"
      },
      commandDescription: "適用するフィルターを選択"
    },
    help: {
      embed: {
          title: "📜 {botName} ヘルプメニュー",
          author: "ヘルプ",
          description: `
          **{botName}へようこそ！**

          > Discordの究極の音楽コンパニオン。
          > ボットの詳細情報：
                  
          **📂 コマンド数：** {totalCommands}
          **🌐 サーバー数：** {totalServers}
          **👥 ユーザー数：** {totalUsers}
          **⏳ 稼働時間：** {uptimeString}
          **📡 応答時間：** {ping}ミリ秒
          `,
          availableCommands: "利用可能なコマンド",
          noDescription: "説明がありません。",
          noCommands: "コマンドが見つかりません。",
          error: "❌ ヘルプメニューの取得中にエラーが発生しました。"
      },
      commandDescription: "ボットの情報を取得"
    },
    myplaylists: {
      embed: {
          noPlaylistsFound: "プレイリストが見つかりません",
          noPlaylistsFoundDescription: "- まだプレイリストを作成していません。",
          yourPlaylistsTitle: "あなたのプレイリスト（{currentPage}/{totalPages}ページ）",
          visibility: "公開設定",
          private: "非公開",
          public: "公開",
          server: "サーバー",
          songs: "曲数",
          error: "エラー",
          errorDescription: "- プレイリストの取得中にエラーが発生しました。"
      }
    },
    nowPlaying: {
      embed: {
          error: "エラー",
          noSong: "- 現在再生中の曲はありません。",
          nowPlaying: "再生中！",
          errorDescription: "- リクエストの処理中にエラーが発生しました。"
      }
    },
    pause: {
      embed: {
          error: "エラー",
          noActivePlayer: "- アクティブなプレイヤーが見つかりません。",
          paused: "一時停止しました！",
          pausedDescription: "**- 再生を一時停止しました！**",
          errorDescription: "- リクエストの処理中にエラーが発生しました。"
      }
    },
    play: {
      embed: {
          error: "エラー",
          noVoiceChannel: "- このコマンドを使用するにはボイスチャンネルに参加する必要があります。",
          noLavalinkNodes: "- リクエストを処理できるLavalinkノードがありません。",
          noResults: "- 結果が見つかりません。",
          requestUpdated: "リクエストを更新しました！",
          successProcessed: "- リクエストを正常に処理しました。\n- ボタンを使用して再生を制御してください。",
          errorProcessing: "- リクエストの処理中にエラーが発生しました。"
      },
      commandDescription: "曲名/リンクまたはプレイリストを入力"
    },
    playCustomPlaylist: {
      embed: {
          error: "エラー",
          noVoiceChannel: "- このコマンドを使用するにはボイスチャンネルに参加する必要があります。",
          playlistNotFound: "- プレイリストが見つかりません。",
          accessDenied: "アクセス拒否",
          noPermission: "- この非公開プレイリストを再生する権限がありません。",
          emptyPlaylist: "- プレイリストが空です。",
          playingPlaylist: "プレイリストを再生中！",
          playlistPlaying: "- プレイリスト **{playlistName}** を再生中です。\n- ボタンを使用して再生を制御してください。",
          errorResolvingSong: "- 曲の解決中にエラーが発生しました。",
          errorPlayingPlaylist: "- プレイリストの再生中にエラーが発生しました。"
      },
      commandDescription: "プレイリスト名を入力"
    },
    queue: {
      embed: {
          queueEmpty: "キューが空です",
          queueEmptyDescription: "- 現在キューは空です。`/play`コマンドで曲を追加してください。",
          currentQueue: "現在のキュー",
          noMoreSongs: "- キューに曲がありません。",
          error: "エラー",
          errorDescription: "- キューの取得中にエラーが発生しました。"
      }
    },
    remove: {
      embed: {
          queueEmpty: "キューが空です",
          queueEmptyDescription: "- 現在キューは空です。`/play`コマンドで曲を追加してください。",
          invalidPosition: "エラー",
          invalidPositionDescription: "- 無効な位置です。1から{queueLength}の間の数字を入力してください。",
          songRemoved: "曲を削除しました",
          songRemovedDescription: "- キューから曲を削除しました：**{songTitle}**",
          error: "エラー",
          errorDescription: "- キューからの曲の削除中にエラーが発生しました。"
      }
    },
    resume: {
      embed: {
          noActivePlayer: "エラー",
          noActivePlayerDescription: "- アクティブなプレイヤーが見つかりません。",
          resumed: "再開しました！",
          resumedDescription: "**- 再生を再開しました！**",
          error: "エラー",
          errorDescription: "- リクエストの処理中にエラーが発生しました。"
      }
    },
    showsongs: {
      embed: {
          error: "エラー",
          playlistNotFound: "- プレイリストが見つかりません。",
          accessDenied: "アクセス拒否",
          noPermission: "- この非公開プレイリストを閲覧する権限がありません。",
          noSongs: "- このプレイリストに曲はありません。",
          songsInPlaylist: "{playlistName}の曲一覧",
          songsInPlaylistPage: "{playlistName}の曲一覧（{currentPage}/{totalPages}ページ）",
          errorDescription: "- 曲の表示中にエラーが発生しました。"
      }
    },
    shuffle: {
      embed: {
          queueEmpty: "キューが空です",
          queueEmptyDescription: "- 現在キューは空です。`/play`コマンドで曲を追加してください。",
          queueShuffled: "キューをシャッフルしました",
          queueShuffledDescription: "- キューを正常にシャッフルしました。",
          error: "エラー",
          errorDescription: "- キューのシャッフル中にエラーが発生しました。"
      }
    },
    skip: {
      embed: {
          noActivePlayer: "エラー",
          noActivePlayerDescription: "- アクティブなプレイヤーが見つかりません。",
          songSkipped: "スキップしました！",
          songSkippedDescription: "**- プレイヤーは次の曲を再生します！**",
          error: "エラー",
          errorDescription: "- リクエストの処理中にエラーが発生しました。"
      }
    },
    stop: {
      embed: {
          noActivePlayer: "エラー",
          noActivePlayerDescription: "- アクティブなプレイヤーが見つかりません。",
          musicHalted: "再生を停止しました！",
          musicHaltedDescription: "**- 再生を停止し、プレイヤーを終了しました！**",
          error: "エラー",
          errorDescription: "- リクエストの処理中にエラーが発生しました。"
      }
    },
    support: {
      embed: {
          authorName: "サポートサーバー",
          description: "➡️ **サポートと更新情報のためにDiscordサーバーに参加：**\n- Discord - {supportServerLink}\n\n➡️ **フォローする：**\n- GitHub - {githubLink}\n- Replit - {replitLink}\n- YouTube - {youtubeLink}",
          error: "エラー",
          errorDescription: "- リクエストの処理中にエラーが発生しました。"
      }
    },
    volume: {
      embed: {
          noActivePlayer: "エラー",
          noActivePlayerDescription: "- アクティブなプレイヤーが見つかりません。",
          volumeUpdated: "音量を更新しました！",
          volumeUpdatedDescription: "- 音量を **{volume}%** に設定しました。",
          error: "エラー",
          errorDescription: "音量の設定中にエラーが発生しました。"
        },
        volumeRangeError: "音量は0から100の間で設定してください。"
      },
      errors: {
        noPermission: "このコマンドを使用する権限がありません。",
        generalError: "- エラー：{error}"
      }
  };      