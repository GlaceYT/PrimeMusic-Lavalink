module.exports = {
    footer: "SSRR이(가) 개발 | Prime Music v1.2",
    ping: {
      description: "봇 지연 시간 확인",
      response: "지연 시간 측정 중...",
      embed: {
        title: "봇 지연 시간",
        responseTime: "- 봇 응답 시간: **{latency}ms**",
        websocketPing: "- WebSocket 핑: **{ping}ms**",
        uptime: "- 가동 시간: **{uptime}**",
        footer: "SSRR이(가) 개발 | Prime Music v1.2"
      }
    },
    addsong: {
      embed: {
          playlistNotFound: "재생 목록을 찾을 수 없음",
          playlistNotFoundDescription: "- 재생 목록을 찾을 수 없습니다.",
          accessDenied: "접근 거부됨",
          accessDeniedDescription: "- 이 재생 목록에 노래를 추가할 권한이 없습니다.",
          songAdded: "노래 추가됨",
          songAddedDescription: "- 노래 **{songInput}**이(가) 재생 목록 **{playlistName}**에 추가되었습니다.",
          error: "오류",
          errorDescription: "- 노래를 추가하는 중 오류가 발생했습니다."
      }
    },
    allplaylists: {
      embed: {
          noPlaylistsFound: "재생 목록을 찾을 수 없음",
          noPlaylistsFoundDescription: "- 현재 공개된 재생 목록이 없습니다.",
          createdBy: "제작자: {userId}",
          serverName: "서버: {serverName}",
          songs: "노래: **{songCount}**",
          publicPlaylistsTitle: "공개 재생 목록 ({currentPage}/{totalPages} 페이지)",
          error: "오류",
          errorDescription: "- 재생 목록을 가져오는 중 오류가 발생했습니다."
      }
    },
    autoplay: {
      embed: {
          autoplayUpdated: "자동 재생 업데이트됨",
          autoplayStatus: "- 이 서버의 자동 재생이 **{status}**되었습니다.",
          enabled: "활성화",
          disabled: "비활성화",
          error: "오류",
          errorDescription: "- 자동 재생을 업데이트하는 중 오류가 발생했습니다."
      },
      commandDescription: "자동 재생 활성화 또는 비활성화"
    },
    createplaylist: {
      embed: {
          playlistExists: "재생 목록이 이미 존재함",
          playlistExistsDescription: "- 이 이름의 재생 목록이 이미 존재합니다.",
          playlistCreated: "재생 목록 생성됨",
          playlistCreatedDescription: "- 재생 목록 **{playlistName}**이(가) 생성되었습니다.\n- 공개 설정: **{visibility}**.",
          private: "비공개",
          public: "공개",
          error: "오류",
          errorDescription: "- 재생 목록을 생성하는 중 오류가 발생했습니다."
      },
      commandDescriptionName: "재생 목록 이름 입력",
      commandDescriptionPrivate: "재생 목록을 비공개로 설정 (본인만 볼 수 있음)"
    },
    deleteplaylist: {
      embed: {
          playlistNotFound: "재생 목록을 찾을 수 없음",
          playlistNotFoundDescription: "- 재생 목록을 찾을 수 없습니다.",
          accessDenied: "접근 거부됨",
          accessDeniedDescription: "- 이 재생 목록을 삭제할 권한이 없습니다.",
          playlistDeleted: "재생 목록 삭제됨",
          playlistDeletedDescription: "- 재생 목록 **{playlistName}**이(가) 삭제되었습니다.",
          error: "오류",
          errorDescription: "- 재생 목록을 삭제하는 중 오류가 발생했습니다."
      },
      commandDescriptionName: "재생 목록 이름 입력"
    },
    deletesong: {
      embed: {
          playlistNotFound: "재생 목록을 찾을 수 없음",
          playlistNotFoundDescription: "- 재생 목록을 찾을 수 없습니다.",
          songDeleted: "노래 삭제됨",
          songDeletedDescription: "- 노래 **{songName}**이(가) 재생 목록 **{playlistName}**에서 삭제되었습니다.",
          error: "오류",
          errorDescription: "- 노래를 삭제하는 중 오류가 발생했습니다."
      },
      commandDescriptionPlaylist: "재생 목록 이름 입력",
      commandDescriptionSong: "노래 이름 입력"
    },
    filters: {
      embed: {
          error: "오류",
          noPlayer: "- 활성화된 플레이어를 찾을 수 없습니다. 먼저 노래를 재생해 주세요.",
          wrongChannel: "- 이 명령어를 사용하려면 봇과 같은 음성 채널에 있어야 합니다.",
          filtersCleared: "모든 필터가 제거되었습니다.",
          invalidFilter: "잘못된 필터가 선택되었습니다.",
          filterApplied: "필터 **{filter}**이(가) 적용되었습니다.",
          errorProcessing: "- 요청을 처리하는 중 오류가 발생했습니다."
      },
      commandDescription: "적용할 필터 선택"
    },
    help: {
      embed: {
          title: "📜 {botName} 도움말 메뉴",
          author: "도움말",
          description: `
          **{botName}에 오신 것을 환영합니다!**

          > Discord의 궁극적인 음악 동반자입니다.
          > 봇에 대한 자세한 정보:
                  
          **📂 명령어:** {totalCommands}
          **🌐 서버:** {totalServers}
          **👥 사용자:** {totalUsers}
          **⏳ 가동 시간:** {uptimeString}
          **📡 핑:** {ping}ms
          `,
          availableCommands: "사용 가능한 명령어",
          noDescription: "설명이 없습니다.",
          noCommands: "명령어를 찾을 수 없습니다.",
          error: "❌ 도움말 메뉴를 가져오는 중 오류가 발생했습니다."
      },
      commandDescription: "봇 정보 확인"
    },
    myplaylists: {
      embed: {
          noPlaylistsFound: "재생 목록을 찾을 수 없음",
          noPlaylistsFoundDescription: "- 아직 생성한 재생 목록이 없습니다.",
          yourPlaylistsTitle: "내 재생 목록 ({currentPage}/{totalPages} 페이지)",
          visibility: "공개 설정",
          private: "비공개",
          public: "공개",
          server: "서버",
          songs: "노래",
          error: "오류",
          errorDescription: "- 재생 목록을 가져오는 중 오류가 발생했습니다."
      }
    },
    nowPlaying: {
      embed: {
          error: "오류",
          noSong: "- 현재 재생 중인 노래가 없습니다.",
          nowPlaying: "현재 재생 중!",
          errorDescription: "- 요청을 처리하는 중 오류가 발생했습니다."
      }
    },
    pause: {
      embed: {
          error: "오류",
          noActivePlayer: "- 활성화된 플레이어를 찾을 수 없습니다.",
          paused: "일시정지됨!",
          pausedDescription: "**- 재생이 일시정지되었습니다!**",
          errorDescription: "- 요청을 처리하는 중 오류가 발생했습니다."
      }
    },
    play: {
      embed: {
          error: "오류",
          noVoiceChannel: "- 이 명령어를 사용하려면 음성 채널에 있어야 합니다.",
          noLavalinkNodes: "- 요청을 처리할 수 있는 Lavalink 노드가 없습니다.",
          noResults: "- 결과를 찾을 수 없습니다.",
          requestUpdated: "요청이 업데이트되었습니다!",
          successProcessed: "- 요청이 성공적으로 처리되었습니다.\n- 재생을 제어하려면 버튼을 사용하세요",
          errorProcessing: "- 요청을 처리하는 중 오류가 발생했습니다."
      },
      commandDescription: "노래 이름/링크 또는 재생 목록 입력"
    },
    playCustomPlaylist: {
      embed: {
          error: "오류",
          noVoiceChannel: "- 이 명령어를 사용하려면 음성 채널에 있어야 합니다.",
          playlistNotFound: "- 재생 목록을 찾을 수 없습니다.",
          accessDenied: "접근 거부됨",
          noPermission: "- 이 비공개 재생 목록을 재생할 권한이 없습니다.",
          emptyPlaylist: "- 재생 목록이 비어 있습니다.",
          playingPlaylist: "재생 목록 재생 중!",
          playlistPlaying: "- 재생 목록 **{playlistName}**이(가) 재생 중입니다.\n- 재생을 제어하려면 버튼을 사용하세요",
          errorResolvingSong: "- 노래를 확인하는 중 오류가 발생했습니다.",
          errorPlayingPlaylist: "- 재생 목록을 재생하는 중 오류가 발생했습니다."
      },
      commandDescription: "재생 목록 이름 입력"
    },
    queue: {
      embed: {
          queueEmpty: "대기열이 비어 있음",
          queueEmptyDescription: "- 현재 대기열이 비어 있습니다. `/play` 명령어로 노래를 추가하세요.",
          currentQueue: "현재 대기열",
          noMoreSongs: "- 대기열에 더 이상 노래가 없습니다.",
          error: "오류",
          errorDescription: "- 대기열을 가져오는 중 오류가 발생했습니다."
      }
    },
    remove: {
      embed: {
          queueEmpty: "대기열이 비어 있음",
          queueEmptyDescription: "- 현재 대기열이 비어 있습니다. `/play` 명령어로 노래를 추가하세요.",
          invalidPosition: "오류",
          invalidPositionDescription: "- 잘못된 위치입니다. 1에서 {queueLength} 사이의 숫자를 입력하세요.",
          songRemoved: "노래 제거됨",
          songRemovedDescription: "- 대기열에서 노래가 제거되었습니다: **{songTitle}**",
          error: "오류",
          errorDescription: "- 대기열에서 노래를 제거하는 중 오류가 발생했습니다."
      }
    },
    resume: {
      embed: {
          noActivePlayer: "오류",
          noActivePlayerDescription: "- 활성화된 플레이어를 찾을 수 없습니다.",
          resumed: "재생 재개됨!",
          resumedDescription: "**- 재생이 재개되었습니다!**",
          error: "오류",
          errorDescription: "- 요청을 처리하는 중 오류가 발생했습니다."
      }
    },
    showsongs: {
      embed: {
          error: "오류",
          playlistNotFound: "- 재생 목록을 찾을 수 없습니다.",
          accessDenied: "접근 거부됨",
          noPermission: "- 이 비공개 재생 목록을 볼 권한이 없습니다.",
          noSongs: "- 이 재생 목록에 노래가 없습니다.",
          songsInPlaylist: "{playlistName}의 노래",
          songsInPlaylistPage: "{playlistName}의 노래 ({currentPage}/{totalPages} 페이지)",
          errorDescription: "- 노래 목록을 표시하는 중 오류가 발생했습니다."
      }
    },
    shuffle: {
      embed: {
          queueEmpty: "대기열이 비어 있음",
          queueEmptyDescription: "- 현재 대기열이 비어 있습니다. `/play` 명령어로 노래를 추가하세요.",
          queueShuffled: "대기열이 섞임",
          queueShuffledDescription: "- 대기열이 성공적으로 섞였습니다.",
          error: "오류",
          errorDescription: "- 대기열을 섞는 중 오류가 발생했습니다."
      }
    },
    skip: {
      embed: {
          noActivePlayer: "오류",
          noActivePlayerDescription: "- 활성화된 플레이어를 찾을 수 없습니다.",
          songSkipped: "노래 건너뜀!",
          songSkippedDescription: "**- 플레이어가 다음 노래를 재생합니다!**",
          error: "오류",
          errorDescription: "- 요청을 처리하는 중 오류가 발생했습니다."
        }
    },
    stop: {
    embed: {
        noActivePlayer: "오류",
        noActivePlayerDescription: "- 활성화된 플레이어를 찾을 수 없습니다.",
        musicHalted: "음악 중지됨!",
        musicHaltedDescription: "**- 재생이 중지되고 플레이어가 종료되었습니다!**",
        error: "오류",
        errorDescription: "- 요청을 처리하는 중 오류가 발생했습니다."
    }
    },
    support: {
    embed: {
        authorName: "지원 서버",
        description: "➡️ **지원과 업데이트를 위해 Discord 서버에 참여하세요:**\n- Discord - {supportServerLink}\n\n➡️ **팔로우하기:**\n- GitHub - {githubLink}\n- Replit - {replitLink}\n- YouTube - {youtubeLink}",
        error: "오류",
        errorDescription: "- 요청을 처리하는 중 오류가 발생했습니다."
    }
    },
    volume: {
    embed: {
        noActivePlayer: "오류",
        noActivePlayerDescription: "- 활성화된 플레이어를 찾을 수 없습니다.",
        volumeUpdated: "볼륨이 업데이트됨!",
        volumeUpdatedDescription: "- 볼륨이 **{volume}%**로 설정되었습니다.",
        error: "오류",
        errorDescription: "볼륨을 설정하는 중 오류가 발생했습니다."
    },
    volumeRangeError: "볼륨은 0에서 100 사이여야 합니다."
    },
    errors: {
    noPermission: "이 명령어를 사용할 권한이 없습니다.",
    generalError: "- 오류: {error}"
    }
    };     