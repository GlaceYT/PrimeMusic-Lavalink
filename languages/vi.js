module.exports = {
    footer: "Phát triển bởi SSRR | Prime Music v1.2",
    ping: {
      description: "Kiểm tra độ trễ của bot",
      response: "Đang đo độ trễ...",
      embed: {
        title: "Độ Trễ Của Bot",
        responseTime: "- Thời gian phản hồi của bot: **{latency}ms**",
        websocketPing: "- Độ trễ WebSocket: **{ping}ms**",
        uptime: "- Thời gian hoạt động: **{uptime}**",
        footer: "Phát triển bởi SSRR | Prime Music v1.2"
      }
    },
    addsong: {
      embed: {
          playlistNotFound: "Không tìm thấy danh sách phát",
          playlistNotFoundDescription: "- Không tìm thấy danh sách phát.",
          accessDenied: "Từ chối truy cập",
          accessDeniedDescription: "- Bạn không có quyền thêm bài hát vào danh sách phát này.",
          songAdded: "Đã thêm bài hát",
          songAddedDescription: "- Bài hát **{songInput}** đã được thêm vào danh sách phát **{playlistName}**.",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi thêm bài hát."
      }
    },
    allplaylists: {
      embed: {
          noPlaylistsFound: "Không tìm thấy danh sách phát",
          noPlaylistsFoundDescription: "- Hiện không có danh sách phát công khai nào.",
          createdBy: "Tạo bởi: {userId}",
          serverName: "Máy chủ: {serverName}",
          songs: "Bài hát: **{songCount}**",
          publicPlaylistsTitle: "Danh Sách Phát Công Khai (Trang {currentPage}/{totalPages})",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi lấy danh sách phát."
      }
    },
    autoplay: {
      embed: {
          autoplayUpdated: "Đã cập nhật tự động phát",
          autoplayStatus: "- Tự động phát đã được **{status}** cho máy chủ này.",
          enabled: "bật",
          disabled: "tắt",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi cập nhật tự động phát."
      },
      commandDescription: "Bật hoặc tắt tự động phát"
    },
    createplaylist: {
      embed: {
          playlistExists: "Danh sách phát đã tồn tại",
          playlistExistsDescription: "- Danh sách phát với tên này đã tồn tại.",
          playlistCreated: "Đã tạo danh sách phát",
          playlistCreatedDescription: "- Danh sách phát **{playlistName}** đã được tạo.\n- Chế độ hiển thị: **{visibility}**.",
          private: "Riêng tư",
          public: "Công khai",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi tạo danh sách phát."
      },
      commandDescriptionName: "Nhập tên danh sách phát",
      commandDescriptionPrivate: "Đặt danh sách phát ở chế độ riêng tư (chỉ bạn mới nhìn thấy)"
    },
    deleteplaylist: {
      embed: {
          playlistNotFound: "Không tìm thấy danh sách phát",
          playlistNotFoundDescription: "- Không tìm thấy danh sách phát.",
          accessDenied: "Từ chối truy cập",
          accessDeniedDescription: "- Bạn không có quyền xóa danh sách phát này.",
          playlistDeleted: "Đã xóa danh sách phát",
          playlistDeletedDescription: "- Danh sách phát **{playlistName}** đã được xóa.",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi xóa danh sách phát."
      },
      commandDescriptionName: "Nhập tên danh sách phát"
    },
    deletesong: {
      embed: {
          playlistNotFound: "Không tìm thấy danh sách phát",
          playlistNotFoundDescription: "- Không tìm thấy danh sách phát.",
          songDeleted: "Đã xóa bài hát",
          songDeletedDescription: "- Bài hát **{songName}** đã được xóa khỏi danh sách phát **{playlistName}**.",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi xóa bài hát."
      },
      commandDescriptionPlaylist: "Nhập tên danh sách phát",
      commandDescriptionSong: "Nhập tên bài hát"
    },
    filters: {
      embed: {
          error: "Lỗi",
          noPlayer: "- Không tìm thấy trình phát đang hoạt động. Vui lòng phát một bài hát trước.",
          wrongChannel: "- Bạn cần ở cùng kênh thoại với bot để sử dụng lệnh này.",
          filtersCleared: "Đã xóa tất cả bộ lọc.",
          invalidFilter: "Đã chọn bộ lọc không hợp lệ.",
          filterApplied: "Đã áp dụng bộ lọc **{filter}**.",
          errorProcessing: "- Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
      },
      commandDescription: "Chọn bộ lọc để áp dụng"
    },
    help: {
      embed: {
          title: "📜 Menu Trợ Giúp {botName}",
          author: "Trợ Giúp",
          description: `
          **Chào mừng đến với {botName}!**

          > Người bạn đồng hành âm nhạc tuyệt vời của bạn trên Discord.
          > Thông tin chi tiết về bot:
                  
          **📂 Lệnh:** {totalCommands}
          **🌐 Máy chủ:** {totalServers}
          **👥 Người dùng:** {totalUsers}
          **⏳ Thời gian hoạt động:** {uptimeString}
          **📡 Độ trễ:** {ping}ms
          `,
          availableCommands: "Các lệnh có sẵn",
          noDescription: "Không có mô tả.",
          noCommands: "Không tìm thấy lệnh.",
          error: "❌ Đã xảy ra lỗi khi lấy menu trợ giúp."
      },
      commandDescription: "Xem thông tin về bot"
    },
    myplaylists: {
      embed: {
          noPlaylistsFound: "Không tìm thấy danh sách phát",
          noPlaylistsFoundDescription: "- Bạn chưa tạo danh sách phát nào.",
          yourPlaylistsTitle: "Danh Sách Phát Của Bạn (Trang {currentPage}/{totalPages})",
          visibility: "Chế độ hiển thị",
          private: "Riêng tư",
          public: "Công khai",
          server: "Máy chủ",
          songs: "Bài hát",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi lấy danh sách phát của bạn."
      }
    },
    nowPlaying: {
      embed: {
          error: "Lỗi",
          noSong: "- Không có bài hát nào đang phát.",
          nowPlaying: "Đang phát!",
          errorDescription: "- Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
      }
    },
    pause: {
      embed: {
          error: "Lỗi",
          noActivePlayer: "- Không tìm thấy trình phát đang hoạt động.",
          paused: "Đã tạm dừng!",
          pausedDescription: "**- Đã tạm dừng phát nhạc!**",
          errorDescription: "- Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
      }
    },
    play: {
      embed: {
          error: "Lỗi",
          noVoiceChannel: "- Bạn cần ở trong kênh thoại để sử dụng lệnh này.",
          noLavalinkNodes: "- Không có node Lavalink khả dụng để xử lý yêu cầu.",
          noResults: "- Không tìm thấy kết quả.",
          requestUpdated: "Đã cập nhật yêu cầu!",
          successProcessed: "- Yêu cầu của bạn đã được xử lý thành công.\n- Sử dụng các nút để điều khiển phát nhạc",
          errorProcessing: "- Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
      },
      commandDescription: "Nhập tên bài hát / link hoặc danh sách phát"
    },
    playCustomPlaylist: {
      embed: {
          error: "Lỗi",
          noVoiceChannel: "- Bạn cần ở trong kênh thoại để sử dụng lệnh này.",
          playlistNotFound: "- Không tìm thấy danh sách phát.",
          accessDenied: "Từ chối truy cập",
          noPermission: "- Bạn không có quyền phát danh sách phát riêng tư này.",
          emptyPlaylist: "- Danh sách phát trống.",
          playingPlaylist: "Đang phát danh sách phát!",
          playlistPlaying: "- Đang phát danh sách phát **{playlistName}**.\n- Sử dụng các nút để điều khiển phát nhạc",
          errorResolvingSong: "- Lỗi khi xử lý bài hát.",
          errorPlayingPlaylist: "- Đã xảy ra lỗi khi phát danh sách phát."
      },
      commandDescription: "Nhập tên danh sách phát"
    },
    queue: {
      embed: {
          queueEmpty: "Hàng đợi trống",
          queueEmptyDescription: "- Hàng đợi hiện đang trống. Thêm bài hát bằng lệnh `/play`.",
          currentQueue: "Hàng đợi hiện tại",
          noMoreSongs: "- Không còn bài hát nào trong hàng đợi.",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi lấy hàng đợi."
      }
    },
    remove: {
      embed: {
          queueEmpty: "Hàng đợi trống",
          queueEmptyDescription: "- Hàng đợi hiện đang trống. Thêm bài hát bằng lệnh `/play`.",
          invalidPosition: "Lỗi",
          invalidPositionDescription: "- Vị trí không hợp lệ. Nhập số từ 1 đến {queueLength}.",
          songRemoved: "Đã xóa bài hát",
          songRemovedDescription: "- Đã xóa bài hát khỏi hàng đợi: **{songTitle}**",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi xóa bài hát khỏi hàng đợi."
      }
    },
    resume: {
      embed: {
          noActivePlayer: "Lỗi",
          noActivePlayerDescription: "- Không tìm thấy trình phát đang hoạt động.",
          resumed: "Đã tiếp tục!",
          resumedDescription: "**- Đã tiếp tục phát nhạc!**",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
      }
    },
    showsongs: {
      embed: {
          error: "Lỗi",
          playlistNotFound: "- Không tìm thấy danh sách phát.",
          accessDenied: "Từ chối truy cập",
          noPermission: "- Bạn không có quyền xem danh sách phát riêng tư này.",
          noSongs: "- Không có bài hát nào trong danh sách phát này.",
          songsInPlaylist: "Bài hát trong {playlistName}",
          songsInPlaylistPage: "Bài hát trong {playlistName} (Trang {currentPage}/{totalPages})",
          errorDescription: "- Đã xảy ra lỗi khi hiển thị bài hát."
      }
    },
    shuffle: {
      embed: {
          queueEmpty: "Hàng đợi trống",
          queueEmptyDescription: "- Hàng đợi hiện đang trống. Thêm bài hát bằng lệnh `/play`.",
          queueShuffled: "Đã xáo trộn hàng đợi",
          queueShuffledDescription: "- Đã xáo trộn hàng đợi thành công.",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi xáo trộn hàng đợi."
      }
    },
    skip: {
      embed: {
          noActivePlayer: "Lỗi",
          noActivePlayerDescription: "- Không tìm thấy trình phát đang hoạt động.",
          songSkipped: "Đã bỏ qua bài hát!",
          songSkippedDescription: "**- Trình phát sẽ chuyển sang bài hát tiếp theo!**",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
      }
    },
    stop: {
      embed: {
          noActivePlayer: "Lỗi",
          noActivePlayerDescription: "- Không tìm thấy trình phát đang hoạt động.",
          musicHalted: "Đã dừng nhạc!",
          musicHaltedDescription: "**- Đã dừng phát nhạc và đóng trình phát!**",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
      }
    },
    support: {
      embed: {
          authorName: "Máy Chủ Hỗ Trợ",
          description: "➡️ **Tham gia máy chủ Discord của chúng tôi để được hỗ trợ và cập nhật:**\n- Discord - {supportServerLink}\n\n➡️ **Theo dõi chúng tôi tại:**\n- GitHub - {githubLink}\n- Replit - {replitLink}\n- YouTube - {youtubeLink}",
          error: "Lỗi",
          errorDescription: "- Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
      }
    },
    volume: {
      embed: {
          noActivePlayer: "Lỗi",
          noActivePlayerDescription: "- Không tìm thấy trình phát đang hoạt động.",
          volumeUpdated: "Đã cập nhật âm lượng!",
          volumeUpdatedDescription: "- Đã đặt âm lượng thành **{volume}%**",
          error: "Lỗi",
          errorDescription: "Đã xảy ra lỗi khi điều chỉnh âm lượng."
      },
      volumeRangeError: "Âm lượng phải từ 0 đến 100."
    },
    errors: {
      noPermission: "Bạn không có quyền sử dụng lệnh này.",
      generalError: "- Lỗi: {error}"
    }
};