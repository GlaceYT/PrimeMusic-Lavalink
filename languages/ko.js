module.exports = {
    meta: {
        name: "한국어",
        code: "ko"
    },
    help: {
        command: {
            name: "help",
            description: "봇 및 명령어에 대한 정보를 가져옵니다",
            category: {
                name: "category",
                description: "보려는 카테고리를 선택하세요",
                choices: {
                    main: "🏠 메인 메뉴",
                    music: "🎵 음악 명령어",
                    playlist: "📋 플레이리스트 명령어",
                    basic: "💜 기본 명령어",
                    utility: "🔧 유틸리티 명령어"
                }
            }
        },
        categories: {
            main: {
                name: "메인 메뉴",
                emoji: "🏠",
                description: "도움말 메뉴에 오신 것을 환영합니다"
            },
            music: {
                name: "음악 명령어",
                emoji: "🎵",
                description: "음악 재생 및 설정 제어"
            },
            playlist: {
                name: "플레이리스트 명령어",
                emoji: "📋",
                description: "플레이리스트 관리"
            },
            basic: {
                name: "기본 명령어",
                emoji: "⚙️",
                description: "일반 봇 정보 및 유틸리티"
            },
            utility: {
                name: "유틸리티 명령어",
                emoji: "🔧",
                description: "추가 유틸리티 기능"
            }
        },
        mainMenu: {
            header: {
                title: "# 🎵 {botName} 도움말 메뉴",
                welcome: "**{botName}에 오신 것을 환영합니다!**",
                subtitle: "Discord에서 최고의 음악 동반자입니다."
            },
            statistics: {
                title: "## 📊 통계",
                commands: "• **명령어:** {totalCommands}",
                servers: "• **서버:** {totalServers}",
                users: "• **사용자:** {totalUsers}",
                uptime: "• **가동 시간:** {uptimeString}",
                ping: "• **핑:** {ping}ms"
            },
            categories: {
                title: "## 📂 사용 가능한 카테고리",
                music: "{emoji} **{name}** - {count}개 명령어",
                playlist: "{emoji} **{name}** - {count}개 명령어",
                basic: "{emoji} **{name}** - {count}개 명령어",
                utility: "{emoji} **{name}** - {count}개 명령어",
                footer: "**아래에서 카테고리를 선택하여 자세한 명령어를 확인하세요.**"
            },
            footer: {
                version: "**버전 1.4** • Prime Music Bot",
                developer: "GlaceYT / https://GlaceYT.com 개발"
            },
            selectMenu: {
                placeholder: "📂 명령어를 보려면 카테고리를 선택하세요...",
                musicDescription: "{count}개 명령어 사용 가능",
                playlistDescription: "{count}개 명령어 사용 가능",
                basicDescription: "{count}개 명령어 사용 가능",
                utilityDescription: "{count}개 명령어 사용 가능"
            },
            buttons: {
                supportServer: "지원 서버",
                github: "GitHub"
            }
        },
        categoryPage: {
            noCommands: {
                title: "## ❌ 명령어를 찾을 수 없음",
                message: "**{categoryName}** 카테고리에 사용 가능한 명령어가 없습니다.",
                backToHelp: "메인 메뉴로 돌아가려면 `/help`를 사용하세요."
            },
            header: {
                title: "# {emoji} {categoryName}",
                description: "{description}",
                count: "**{count}**개 명령어{plural} 사용 가능"
            },
            commands: {
                title: "## 명령어",
                titlePaginated: "## 명령어 (페이지 {currentPage}/{totalPages})",
                item: "**{num}.** `/{commandName}`\n   {description}",
                noDescription: "설명을 사용할 수 없습니다."
            },
            footer: {
                version: "**버전 1.4** • Prime Music Bot",
                developer: "GlaceYT / https://GlaceYT.com 개발"
            },
            buttons: {
                backToMain: "🏠 메인 메뉴로 돌아가기",
                supportServer: "지원 서버",
                github: "GitHub"
            }
        },
        errors: {
            general: "❌ **도움말 메뉴를 가져오는 중 오류가 발생했습니다.**",
            fallback: "❌ 도움말 메뉴를 가져오는 중 오류가 발생했습니다.",
            fallbackDetails: "**봇:** {botName}\n**명령어:** {totalCommands}\n**서버:** {totalServers}\n**지원:** {supportServer}"
        }
    },
    language: {
        command: {
            name: "language",
            description: "이 서버의 봇 언어를 설정합니다",
            option: {
                name: "lang",
                description: "언어 선택"
            }
        },
        current: {
            title: "🌐 현재 언어",
            description: "이 서버의 현재 언어는 **{language}**입니다",
            global: "전역 기본값 (config에서): **{language}**"
        },
        changed: {
            title: "✅ 언어 변경됨",
            description: "서버 언어가 **{language}**로 변경되었습니다",
            note: "봇은 이제 이 서버의 모든 명령어에 이 언어를 사용합니다."
        },
        available: {
            title: "📚 사용 가능한 언어",
            description: "아래 목록에서 언어를 선택하세요:",
            list: "**사용 가능한 언어:**\n{list}",
            item: "• **{name}** (`{code}`)"
        },
        errors: {
            notFound: "❌ **언어를 찾을 수 없습니다!**\n언어 `{code}`가 존재하지 않습니다.",
            failed: "❌ **언어 설정 실패!**\n{error}",
            noPermission: "❌ **언어를 변경할 권한이 없습니다!**\n`서버 관리` 권한이 필요합니다."
        },
        info: {
            title: "ℹ️ 언어 정보",
            description: "**현재 서버 언어:** {serverLang}\n**전역 기본 언어:** {globalLang}\n\n**사용 가능한 언어:** {count}",
            reset: "전역 기본값으로 재설정하려면 `/language reset`을 사용하세요"
        }
    },
    ping: {
        command: {
            name: "ping",
            description: "봇 지연 시간 및 응답 시간 확인"
        },
        header: {
            title: "# 🏓 봇 지연 시간",
            botName: "**{botName}** - Prime Music Bot",
            subtitle: "봇의 응답 시간 및 연결 상태 확인"
        },
        metrics: {
            title: "## ⚡ 성능 지표",
            responseTime: "**응답 시간:** {latency}ms",
            websocketPing: "**Websocket 핑:** {ping}ms",
            botUptime: "**봇 가동 시간:** {uptime}",
            connectionSpeed: {
                excellent: "🟢 우수한 연결 속도",
                good: "🟡 양호한 연결 속도",
                slow: "🔴 느린 연결 속도"
            }
        },
        footer: {
            version: "**버전 1.4** • Prime Music Bot",
            developer: "GlaceYT / https://GlaceYT.com 개발"
        },
        errors: {
            title: "## ❌ 오류",
            message: "지연 시간을 확인하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요.",
            fallback: "❌ 지연 시간을 확인하는 중 오류가 발생했습니다."
        }
    },
    stats: {
        command: {
            name: "stats",
            description: "봇 통계 및 서버 정보 표시"
        },
        header: {
            title: "# 📊 봇 통계",
            botName: "**{botName}** - Prime Music Bot",
            developer: "GlaceYT / https://GlaceYT.com 개발"
        },
        botInfo: {
            title: "## 📊 봇 정보",
            servers: "• **서버:** {count}",
            users: "• **사용자:** {count}",
            channels: "• **채널:** {count}",
            uptime: "• **가동 시간:** {uptime}"
        },
        musicStats: {
            title: "## 🎵 음악 통계",
            activePlayers: "• **활성 플레이어:** {count}",
            totalPlayers: "• **총 플레이어:** {count}",
            currentTrack: "• **현재 트랙:** {track}"
        },
        systemInfo: {
            title: "## 💻 시스템 정보",
            cpu: "• **CPU:** {cpu}",
            platform: "• **플랫폼:** {platform}",
            nodejs: "• **Node.js:** {version}",
            discordjs: "• **Discord.js:** {version}"
        },
        memory: {
            title: "## 💾 메모리 및 성능",
            memoryUsage: "**메모리 사용량:**",
            used: "• 사용: {used}",
            total: "• 총: {total}",
            systemMemory: "**시스템 메모리:**",
            systemUsed: "• 사용: {used}",
            systemFree: "• 여유: {free}",
            performance: "**성능:**",
            ping: "• 핑: {ping}ms",
            shards: "• 샤드: {count}",
            commands: "• 명령어: {count}"
        },
        footer: {
            version: "**버전 1.4** • Prime Music Bot",
            developer: "GlaceYT / https://GlaceYT.com 개발"
        },
        errors: {
            title: "## ❌ 오류",
            message: "통계를 가져오는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요.",
            fallback: "❌ 통계를 가져오는 중 오류가 발생했습니다."
        }
    },
    support: {
        command: {
            name: "support",
            description: "지원 서버 링크 및 중요한 링크 가져오기"
        },
        header: {
            title: "# 🆘 지원 및 링크",
            botName: "**{botName}** - Prime Music Bot",
            subtitle: "도움을 받고, 문제를 보고하거나 우리와 연결하세요!"
        },
        links: {
            title: "## 🔗 중요한 링크",
            supportServer: {
                title: "**📢 지원 서버**",
                description: "도움, 업데이트 및 커뮤니티를 위해 Discord 서버에 참여하세요!",
                link: "[참여하려면 클릭]({url})"
            },
            github: {
                title: "**💻 GitHub**",
                description: "코드를 확인하고 기여하세요!",
                link: "[GitHub 방문]({url})"
            },
            youtube: {
                title: "**🎬 YouTube**",
                description: "튜토리얼 및 업데이트를 시청하세요!",
                link: "[구독]({url})"
            },
            website: {
                title: "**🌐 웹사이트**",
                description: "공식 웹사이트를 방문하세요!",
                link: "[웹사이트 방문]({url})"
            }
        },
        footer: {
            version: "**버전 1.4** • Prime Music Bot",
            developer: "GlaceYT / https://GlaceYT.com 개발"
        },
        buttons: {
            supportServer: "지원 서버",
            github: "GitHub",
            youtube: "YouTube"
        },
        errors: {
            title: "## ❌ 오류",
            message: "지원 정보를 가져오는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요.",
            fallback: "❌ 지원 정보를 가져오는 중 오류가 발생했습니다."
        }
    },
    music: {
        autoplay: {
            command: {
                name: "autoplay",
                description: "서버의 자동 재생 토글"
            },
            enabled: {
                title: "## ✅ 자동 재생 활성화됨",
                message: "이 서버에 대해 자동 재생이 **활성화**되었습니다.",
                note: "🎵 대기열이 끝나면 봇이 자동으로 유사한 노래를 재생합니다."
            },
            disabled: {
                title: "## ❌ 자동 재생 비활성화됨",
                message: "이 서버에 대해 자동 재생이 **비활성화**되었습니다.",
                note: "⏹️ 대기열이 끝나면 봇이 재생을 중지합니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "자동 재생 설정을 업데이트하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        pause: {
            command: {
                name: "pause",
                description: "현재 노래 일시 정지"
            },
            success: {
                title: "## ⏸️ 음악 일시 정지됨",
                message: "현재 트랙이 일시 정지되었습니다.",
                note: "계속 재생하려면 `/resume`을 사용하세요."
            },
            errors: {
                title: "## ❌ 오류",
                message: "음악을 일시 정지하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        resume: {
            command: {
                name: "resume",
                description: "현재 노래 재개"
            },
            success: {
                title: "## ▶️ 음악 재개됨",
                message: "현재 트랙이 재개되었습니다.",
                note: "음악이 재생 중입니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "음악을 재개하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        skip: {
            command: {
                name: "skip",
                description: "현재 노래 건너뛰기"
            },
            success: {
                title: "## ⏭️ 노래 건너뛰기",
                message: "현재 트랙이 건너뛰어졌습니다.",
                nextSong: "대기열의 다음 노래 재생 중...",
                queueEmpty: "대기열이 비어 있습니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "노래를 건너뛰는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        stop: {
            command: {
                name: "stop",
                description: "현재 노래 중지 및 플레이어 파괴"
            },
            success: {
                title: "## ⏹️ 음악 중지됨",
                message24_7: "음악이 중지되었습니다. 플레이어가 유지됩니다 (24/7 모드 활성화됨).",
                messageNormal: "음악이 중지되었고 플레이어가 파괴되었습니다.",
                note: "다시 음악을 재생하려면 `/play`를 사용하세요."
            },
            errors: {
                title: "## ❌ 오류",
                message: "음악을 중지하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        volume: {
            command: {
                name: "volume",
                description: "현재 노래의 볼륨 설정"
            },
            invalid: {
                title: "## ❌ 잘못된 볼륨",
                message: "볼륨은 **0**과 **100** 사이여야 합니다.",
                note: "유효한 볼륨 레벨을 제공해 주세요."
            },
            success: {
                title: "## 🔊 볼륨 업데이트됨",
                message: "볼륨이 **{volume}%**로 설정되었습니다.",
                muted: "🔇 음소거됨",
                low: "🔉 낮음",
                medium: "🔊 중간",
                high: "🔊🔊 높음"
            },
            errors: {
                title: "## ❌ 오류",
                message: "볼륨을 설정하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        shuffle: {
            command: {
                name: "shuffle",
                description: "현재 노래 대기열 섞기"
            },
            queueEmpty: {
                title: "## ❌ 대기열 비어 있음",
                message: "대기열이 비어 있습니다. 섞을 노래가 없습니다.",
                note: "먼저 `/play`를 사용하여 대기열에 노래를 추가하세요."
            },
            success: {
                title: "## 🔀 대기열 섞기 완료",
                message: "대기열이 성공적으로 섞였습니다!",
                count: "**{count}**개 노래{plural}가 재배치되었습니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "대기열을 섞는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        np: {
            command: {
                name: "np",
                description: "진행 표시줄과 함께 현재 재생 중인 노래 표시"
            },
            title: "## 🎵 현재 재생 중",
            nowPlaying: "**[{title}]({uri})**",
            by: "작성자: **{author}**",
            errors: {
                title: "## ❌ 오류",
                message: "현재 트랙을 가져오는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        queue: {
            command: {
                name: "queue",
                description: "현재 노래 대기열 표시"
            },
            title: "## 📋 현재 대기열",
            titlePaginated: "## 📋 현재 대기열 (페이지 {currentPage}/{totalPages})",
            nowPlaying: "🎵 **현재 재생 중:**",
            track: "[{title}]({uri})",
            requestedBy: "요청자: {requester}",
            trackNumber: "**{number}.**",
            noMoreSongs: "더 이상 노래가 없습니다",
            buttons: {
                previous: "⬅ 이전",
                next: "다음 ➡"
            },
            errors: {
                title: "## ❌ 오류",
                message: "대기열을 가져오는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        remove: {
            command: {
                name: "remove",
                description: "위치별로 대기열에서 노래 제거"
            },
            queueEmpty: {
                title: "## ❌ 대기열 비어 있음",
                message: "대기열이 비어 있습니다. 제거할 노래가 없습니다.",
                note: "먼저 `/play`를 사용하여 대기열에 노래를 추가하세요."
            },
            invalidPosition: {
                title: "## ❌ 잘못된 위치",
                message: "위치는 **1**과 **{max}** 사이여야 합니다.",
                note: "대기열에 **{count}**개 노래{plural}가 있습니다."
            },
            success: {
                title: "## ✅ 노래 제거됨",
                removed: "**제거됨:** [{title}]({uri})",
                position: "**위치:** {position}",
                message: "노래가 대기열에서 제거되었습니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "노래를 제거하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        move: {
            command: {
                name: "move",
                description: "대기열에서 트랙을 다른 위치로 이동"
            },
            queueEmpty: {
                title: "## ❌ 대기열 비어 있음",
                message: "대기열이 비어 있습니다. 이동할 노래가 없습니다.",
                note: "먼저 `/play`를 사용하여 대기열에 노래를 추가하세요."
            },
            invalidPosition: {
                title: "## ❌ 잘못된 위치",
                message: "위치는 **1**과 **{max}** 사이여야 합니다.",
                note: "대기열에 **{count}**개 노래{plural}가 있습니다."
            },
            samePosition: {
                title: "## ❌ 동일한 위치",
                message: "시작 위치와 목표 위치가 같을 수 없습니다.",
                note: "다른 위치를 제공해 주세요."
            },
            success: {
                title: "## ✅ 트랙 이동됨",
                track: "**트랙:** [{title}]({uri})",
                from: "**시작 위치:** {from}",
                to: "**목표 위치:** {to}",
                message: "트랙이 성공적으로 이동되었습니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "트랙을 이동하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        jump: {
            command: {
                name: "jump",
                description: "대기열에서 특정 트랙으로 이동"
            },
            queueEmpty: {
                title: "## ❌ 대기열 비어 있음",
                message: "대기열이 비어 있습니다. 이동할 노래가 없습니다.",
                note: "먼저 `/play`를 사용하여 대기열에 노래를 추가하세요."
            },
            invalidPosition: {
                title: "## ❌ 잘못된 위치",
                message: "위치는 **1**과 **{max}** 사이여야 합니다.",
                note: "대기열에 **{count}**개 노래{plural}가 있습니다."
            },
            success: {
                title: "## ⏭️ 트랙으로 이동됨",
                track: "**트랙:** [{title}]({uri})",
                position: "**위치:** {position}",
                message: "대기열에서 지정된 트랙으로 이동했습니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "트랙으로 이동하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        seek: {
            command: {
                name: "seek",
                description: "현재 트랙에서 특정 시간으로 이동"
            },
            invalidTime: {
                title: "## ❌ 잘못된 시간",
                message: "잘못된 시간 형식입니다. 다음 중 하나를 사용하세요:",
                formats: "• **MM:SS** (예: 1:30)\n• **HH:MM:SS** (예: 1:05:30)\n• **초** (예: 90)",
                trackLength: "**트랙 길이:** {length}"
            },
            success: {
                title: "## ⏩ 위치로 이동됨",
                time: "**시간:** {time}",
                track: "**트랙:** [{title}]({uri})",
                message: "트랙이 지정된 시간으로 이동되었습니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "이동하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        trackinfo: {
            command: {
                name: "trackinfo",
                description: "현재 트랙에 대한 자세한 정보 표시"
            },
            trackInfo: {
                title: "## 🎵 트랙 정보",
                titleLabel: "**제목:** [{title}]({uri})",
                artist: "**아티스트:** {artist}",
                duration: "**길이:** {duration}",
                source: "**소스:** {source}"
            },
            progress: {
                title: "## 📊 진행 상황",
                current: "**현재:** {current}",
                total: "**전체:** {total}",
                progress: "**진행률:** {progress}%"
            },
            status: {
                title: "## 🎚️ 플레이어 상태",
                volume: "**볼륨:** {volume}%",
                loop: "**반복:** {loop}",
                status: "**상태:** {status}",
                queue: "**대기열:** {count}개 트랙{plural}"
            },
            errors: {
                title: "## ❌ 오류",
                message: "트랙 정보를 가져오는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        voteskip: {
            command: {
                name: "voteskip",
                description: "현재 트랙 건너뛰기에 투표"
            },
            alreadyVoted: {
                title: "## ❌ 이미 투표함",
                message: "이미 이 트랙을 건너뛰는 것에 투표했습니다.",
                votes: "**현재 투표:** {current}/{required}"
            },
            success: {
                title: "## ✅ 투표 추가됨",
                message: "투표가 추가되었습니다!",
                currentVotes: "**현재 투표:** {current}/{required}",
                required: "**필요:** 건너뛰려면 {required}표",
                moreNeeded: "{count}표{plural} 더 필요합니다."
            },
            skipped: {
                title: "## ⏭️ 투표로 트랙 건너뛰기",
                message: "트랙이 건너뛰어졌습니다!",
                votes: "**투표:** {current}/{required}",
                required: "**필요:** {required}표"
            },
            errors: {
                title: "## ❌ 오류",
                message: "투표를 처리하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        filters: {
            command: {
                name: "filters",
                description: "오디오 필터 제어"
            },
            cleared: {
                title: "## ✅ 필터 지워짐",
                message: "모든 오디오 필터가 지워졌습니다.",
                note: "오디오가 이제 정상으로 돌아왔습니다."
            },
            invalid: {
                title: "## ❌ 잘못된 필터",
                message: "선택한 필터가 잘못되었습니다.",
                note: "옵션에서 유효한 필터를 선택해 주세요."
            },
            success: {
                title: "## 🎛️ 필터 적용됨",
                filter: "**필터:** {filter}",
                message: "오디오 필터가 성공적으로 적용되었습니다.",
                note: "모든 필터를 제거하려면 `/filters clear`를 사용하세요."
            },
            errors: {
                title: "## ❌ 오류",
                message: "필터를 적용하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        play: {
            command: {
                name: "play",
                description: "이름 또는 링크에서 노래 재생"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalink 관리자 오류",
                message: "Lavalink 노드 관리자가 초기화되지 않았습니다.",
                note: "봇 관리자에게 문의하세요."
            },
            noNodes: {
                title: "## ❌ Lavalink 노드 없음",
                message: "현재 사용 가능한 Lavalink 노드가 없습니다 ({connected}/{total} 연결됨).",
                note: "봇이 다시 연결을 시도하고 있습니다. 잠시 후 다시 시도해 주세요."
            },
            spotifyError: {
                title: "## ❌ Spotify 오류",
                message: "Spotify 데이터를 가져오지 못했습니다.",
                note: "링크를 확인하고 다시 시도해 주세요."
            },
            invalidResponse: {
                title: "## ❌ 잘못된 응답",
                message: "음악 소스로부터 잘못된 응답입니다.",
                note: "다시 시도하거나 다른 쿼리를 사용하세요."
            },
            noResults: {
                title: "## ❌ 결과 없음",
                message: "쿼리에 대한 결과를 찾을 수 없습니다.",
                note: "다른 검색어 또는 링크를 시도하세요."
            },
            success: {
                titleTrack: "## ✅ 트랙 추가됨",
                titlePlaylist: "## ✅ 플레이리스트 추가됨",
                trackAdded: "트랙이 대기열에 추가되었습니다.",
                playlistAdded: "**{count}**개 트랙이 대기열에 추가되었습니다.",
                nowPlaying: "🎵 재생 중...",
                queueReady: "⏸️ 대기열 준비됨"
            },
            errors: {
                title: "## ❌ 오류",
                message: "요청을 처리하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        search: {
            command: {
                name: "search",
                description: "노래 검색 및 결과에서 선택"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalink 관리자 오류",
                message: "Lavalink 노드 관리자가 초기화되지 않았습니다.",
                note: "봇 관리자에게 문의하세요."
            },
            noNodes: {
                title: "## ❌ Lavalink 노드 없음",
                message: "현재 사용 가능한 Lavalink 노드가 없습니다 ({connected}/{total} 연결됨).",
                note: "봇이 다시 연결을 시도하고 있습니다. 잠시 후 다시 시도해 주세요."
            },
            noResults: {
                title: "## ❌ 결과 없음",
                message: "검색 쿼리에 대한 결과를 찾을 수 없습니다.",
                note: "다른 검색어를 시도하세요."
            },
            playlistNotSupported: {
                title: "## ❌ 플레이리스트 지원 안 됨",
                message: "검색에서는 플레이리스트가 지원되지 않습니다.",
                note: "플레이리스트에는 `/play` 명령어를 사용하세요."
            },
            results: {
                title: "## 🔍 검색 결과",
                query: "**쿼리:** {query}",
                track: "**{number}.** [{title}]({uri})\n   └ {author} • {duration}"
            },
            buttons: {
                cancel: "취소"
            },
            errors: {
                title: "## ❌ 오류",
                message: "검색하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        }
    },
    playlist: {
        createplaylist: {
            command: {
                name: "createplaylist",
                description: "새 플레이리스트 만들기"
            },
            alreadyExists: {
                title: "## ❌ 플레이리스트가 이미 존재함",
                message: "**\"{name}\"**라는 이름의 플레이리스트가 이미 존재합니다.",
                note: "다른 이름을 선택해 주세요."
            },
            success: {
                title: "## ✅ 플레이리스트 생성됨",
                message: "플레이리스트 **\"{name}\"**가 성공적으로 생성되었습니다!",
                visibility: "**공개 설정:** {visibility}",
                server: "**서버:** {server}",
                private: "🔒 비공개",
                public: "🌐 공개"
            },
            errors: {
                title: "## ❌ 오류",
                message: "플레이리스트를 생성하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        addsong: {
            command: {
                name: "addsong",
                description: "플레이리스트에 노래 추가"
            },
            notFound: {
                title: "## ❌ 플레이리스트를 찾을 수 없음",
                message: "플레이리스트 **\"{name}\"**가 존재하지 않습니다.",
                note: "플레이리스트 이름을 확인하고 다시 시도해 주세요."
            },
            accessDenied: {
                title: "## 🔒 액세스 거부됨",
                message: "이 플레이리스트를 수정할 권한이 없습니다.",
                note: "플레이리스트 소유자만 노래를 추가할 수 있습니다."
            },
            success: {
                title: "## ✅ 노래 추가됨",
                song: "**노래:** {song}",
                playlist: "**플레이리스트:** {playlist}",
                message: "노래가 플레이리스트에 성공적으로 추가되었습니다!"
            },
            errors: {
                title: "## ❌ 오류",
                message: "노래를 추가하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        deleteplaylist: {
            command: {
                name: "deleteplaylist",
                description: "플레이리스트 삭제"
            },
            notFound: {
                title: "## ❌ 플레이리스트를 찾을 수 없음",
                message: "플레이리스트 **\"{name}\"**가 존재하지 않습니다.",
                note: "플레이리스트 이름을 확인하고 다시 시도해 주세요."
            },
            accessDenied: {
                title: "## 🔒 액세스 거부됨",
                message: "이 플레이리스트를 삭제할 권한이 없습니다.",
                note: "플레이리스트 소유자만 삭제할 수 있습니다."
            },
            success: {
                title: "## ✅ 플레이리스트 삭제됨",
                message: "플레이리스트 **\"{name}\"**가 성공적으로 삭제되었습니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "플레이리스트를 삭제하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        deletesong: {
            command: {
                name: "deletesong",
                description: "플레이리스트에서 노래 삭제"
            },
            notFound: {
                title: "## ❌ 플레이리스트를 찾을 수 없음",
                message: "플레이리스트 **\"{name}\"**가 존재하지 않습니다.",
                note: "플레이리스트 이름을 확인하고 다시 시도해 주세요."
            },
            success: {
                title: "## ✅ 노래 삭제됨",
                song: "**노래:** {song}",
                playlist: "**플레이리스트:** {playlist}",
                message: "노래가 플레이리스트에서 성공적으로 제거되었습니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "노래를 삭제하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        savequeue: {
            command: {
                name: "savequeue",
                description: "현재 대기열을 플레이리스트로 저장"
            },
            queueEmpty: {
                title: "## ❌ 대기열 비어 있음",
                message: "대기열이 비어 있습니다. 저장할 것이 없습니다.",
                note: "먼저 대기열에 노래를 추가하세요!"
            },
            alreadyExists: {
                title: "## ❌ 플레이리스트가 이미 존재함",
                message: "**\"{name}\"**라는 이름의 플레이리스트가 이미 존재합니다.",
                note: "다른 이름을 선택해 주세요."
            },
            success: {
                title: "## ✅ 대기열 저장됨!",
                message: "대기열이 플레이리스트 **\"{name}\"**로 저장되었습니다",
                tracks: "**트랙:** {count}"
            },
            errors: {
                title: "## ❌ 오류",
                message: "대기열을 저장하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        myplaylists: {
            command: {
                name: "myplaylists",
                description: "생성한 모든 플레이리스트 나열"
            },
            noPlaylists: {
                title: "## 📋 플레이리스트를 찾을 수 없음",
                message: "아직 플레이리스트를 만들지 않았습니다.",
                note: "첫 번째 플레이리스트를 만들려면 `/createplaylist`를 사용하세요!"
            },
            title: "## 📂 내 플레이리스트 (페이지 {currentPage}/{totalPages})",
            playlistItem: "**{number}.** **{name}**\n   • 공개 설정: **{visibility}**\n   • 서버: {server}\n   • 노래: **{count}**",
            visibilityPrivate: "🔒 비공개",
            visibilityPublic: "🌐 공개",
            errors: {
                title: "## ❌ 오류",
                message: "플레이리스트를 가져오는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        allplaylists: {
            command: {
                name: "allplaylists",
                description: "모든 공개 플레이리스트 나열"
            },
            noPlaylists: {
                title: "## 📋 공개 플레이리스트를 찾을 수 없음",
                message: "사용 가능한 공개 플레이리스트가 없습니다.",
                note: "`/createplaylist`를 사용하여 공개 플레이리스트를 만드세요!"
            },
            title: "## 🌐 공개 플레이리스트 (페이지 {currentPage}/{totalPages})",
            playlistItem: "**{number}.** **{name}**\n   • 작성자: {creator}\n   • 서버: {server}\n   • 노래: **{count}**",
            errors: {
                title: "## ❌ 오류",
                message: "공개 플레이리스트를 가져오는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        showsongs: {
            command: {
                name: "showsongs",
                description: "플레이리스트의 모든 노래 표시"
            },
            notFound: {
                title: "## ❌ 플레이리스트를 찾을 수 없음",
                message: "플레이리스트 **\"{name}\"**가 존재하지 않습니다.",
                note: "플레이리스트 이름을 확인하고 다시 시도해 주세요."
            },
            accessDenied: {
                title: "## 🔒 액세스 거부됨",
                message: "이 플레이리스트를 볼 권한이 없습니다.",
                note: "이 플레이리스트는 비공개이며 소유자만 볼 수 있습니다."
            },
            empty: {
                title: "## 📋 \"{name}\"의 노래",
                message: "이 플레이리스트가 비어 있습니다. `/addsong`을 사용하여 노래를 추가하세요!"
            },
            title: "## 🎵 \"{name}\"의 노래 (페이지 {currentPage}/{totalPages})",
            errors: {
                title: "## ❌ 오류",
                message: "플레이리스트 노래를 표시하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        },
        playcustomplaylist: {
            command: {
                name: "playcustomplaylist",
                description: "사용자 정의 플레이리스트 재생"
            },
            notFound: {
                title: "## ❌ 플레이리스트를 찾을 수 없음",
                message: "플레이리스트 **\"{name}\"**가 존재하지 않습니다.",
                note: "플레이리스트 이름을 확인하고 다시 시도해 주세요."
            },
            accessDenied: {
                title: "## 🔒 액세스 거부됨",
                message: "이 플레이리스트를 재생할 권한이 없습니다.",
                note: "이 플레이리스트는 비공개이며 소유자만 재생할 수 있습니다."
            },
            empty: {
                title: "## ❌ 빈 플레이리스트",
                message: "플레이리스트 **\"{name}\"**가 비어 있습니다.",
                note: "먼저 플레이리스트에 노래를 추가하세요!"
            },
            lavalinkManagerError: {
                title: "## ❌ Lavalink 관리자 오류",
                message: "Lavalink 노드 관리자가 초기화되지 않았습니다.",
                note: "봇 관리자에게 문의하세요."
            },
            noNodes: {
                title: "## ❌ Lavalink 노드 없음",
                message: "현재 사용 가능한 Lavalink 노드가 없습니다 ({connected}/{total} 연결됨).",
                note: "봇이 다시 연결을 시도하고 있습니다. 잠시 후 다시 시도해 주세요."
            },
            resolveError: {
                title: "## ❌ 노래 해석 오류",
                message: "플레이리스트에서 하나 이상의 노래를 해석하지 못했습니다.",
                note: "플레이리스트를 확인하고 다시 시도해 주세요."
            },
            success: {
                title: "## 🎵 플레이리스트 재생 중",
                message: "플레이리스트 **\"{name}\"** 재생 중",
                songs: "**노래:** {count}"
            },
            errors: {
                title: "## ❌ 오류",
                message: "플레이리스트를 재생하는 중 오류가 발생했습니다.\n나중에 다시 시도해 주세요."
            }
        }
    },
    utility: {
        twentyfourseven: {
            command: {
                name: "247",
                description: "24/7 모드 토글 (봇을 음성 채널에 유지)"
            },
            accessDenied: {
                title: "## ❌ 액세스 거부됨",
                message: "서버 소유자만 24/7 모드를 토글할 수 있습니다."
            },
            enabled: {
                title: "## ✅ 24/7 모드 활성화됨",
                message: "이 서버에 대해 24/7 모드가 **활성화**되었습니다.",
                note: "🔄 대기열이 비어 있어도 봇이 음성 채널에 머물 것입니다."
            },
            disabled: {
                title: "## ❌ 24/7 모드 비활성화됨",
                message: "이 서버에 대해 24/7 모드가 **비활성화**되었습니다.",
                note: "⏹️ 대기열이 끝나면 봇이 음성 채널을 떠날 것입니다."
            },
            errors: {
                title: "## ❌ 오류",
                message: "24/7 모드를 업데이트하는 중 오류가 발생했습니다.",
                note: "나중에 다시 시도해 주세요."
            }
        },
        history: {
            command: {
                name: "history",
                description: "최근 재생된 트랙 표시"
            },
            noHistory: {
                title: "## 📜 기록을 찾을 수 없음",
                message: "이 서버에 대한 재생 기록을 찾을 수 없습니다.",
                note: "기록을 쌓으려면 노래를 재생하세요!"
            },
            title: "## 📜 재생 기록",
            titlePaginated: "## 📜 재생 기록 (페이지 {currentPage}/{totalPages})",
            noMoreSongs: "- 기록에 더 이상 노래가 없습니다.",
            buttons: {
                previous: "⬅ 이전",
                next: "다음 ➡"
            },
            errors: {
                title: "## ❌ 오류",
                message: "기록을 가져오는 중 오류가 발생했습니다.",
                note: "나중에 다시 시도해 주세요."
            }
        }
    },
    events: {
        interactionCreate: {
            noGuild: "❌ **이 명령어는 서버에서만 사용할 수 있습니다.**",
            commandNotFound: "❌ **명령어를 찾을 수 없습니다!**",
            noPermission: "❌ **이 명령어를 사용할 권한이 없습니다.**",
            errorOccurred: "❌ **오류가 발생했습니다: {message}**",
            unexpectedError: "❌ **예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.**",
            errorTryAgain: "❌ 오류가 발생했습니다. 다시 시도해 주세요."
        }
    },
    utils: {
        voiceChannelCheck: {
            noVoiceChannel: {
                title: "## ❌ 음성 채널 없음",
                message: "이 명령어를 사용하려면 음성 채널에 있어야 합니다.",
                note: "음성 채널에 참여한 후 다시 시도해 주세요."
            },
            wrongChannel: {
                title: "## 🎵 음성 채널 참여",
                message: "봇이 현재 **{channelName}**에서 활성화되어 있습니다.",
                note: "음악 명령어를 사용하려면 **{channelName}**에 참여해 주세요."
            }
        },
        playerValidation: {
            queueEmpty: {
                title: "## ❌ 대기열 비어 있음",
                message: "대기열이 비어 있습니다. 사용 가능한 노래가 없습니다.",
                note: "먼저 `/play`를 사용하여 대기열에 노래를 추가하세요."
            },
            noSongPlaying: {
                title: "## ❌ 노래 재생 중이 아님",
                message: "현재 재생 중인 노래가 없습니다.",
                note: "음악을 재생하려면 `/play`를 사용하세요."
            },
            noMusicPlaying: {
                title: "## ❌ 음악 재생 중이 아님",
                message: "현재 재생 중인 음악이 없고 대기열이 비어 있습니다.",
                note: "음악을 재생하려면 `/play`를 사용하세요."
            }
        },
        responseHandler: {
            defaultError: {
                title: "## ❌ 오류",
                message: "명령어를 처리하는 중 오류가 발생했습니다.",
                note: "나중에 다시 시도해 주세요."
            },
            commandError: "❌ {commandName} 명령어를 처리하는 중 오류가 발생했습니다."
        }
    },
    console: {
        bot: {
            clientLogged: "클라이언트가 {tag}로 로그인됨",
            musicSystemReady: "Riffy 음악 시스템 준비 완료 🎵",
            lavalinkError: "플레이어 초기화 오류: {message}",
            nodeManagerStatus: "노드 관리자: {available}/{total}개 노드 사용 가능",
            nodeStatus: "노드 상태:",
            nodeInfo: "{icon} {name} ({host}:{port}) - {status}{error}",
            commandsLoaded: "총 {count}개 명령어 로드됨",
            commandLoadFailed: "로드 실패: {name} - 데이터 또는 실행 속성 누락",
            commandLoadError: "{name} 로드 오류: {message}",
            tokenVerification: "🔐 토큰 확인",
            tokenAuthFailed: "인증 실패 ❌",
            tokenError: "오류: 인텐트를 켜거나 새 토큰을 재설정하세요",
            databaseOnline: "MongoDB 온라인 ✅",
            databaseStatus: "🕸️  데이터베이스 상태",
            databaseConnection: "🕸️  데이터베이스 연결",
            databaseFailed: "연결 실패 ❌",
            databaseError: "오류: {message}",
            unhandledRejection: "처리되지 않은 거부:",
            uncaughtException: "처리되지 않은 예외:",
            riffyThumbnailError: "[ Riffy ] 썸네일 오류 무시: {message}"
        },
        events: {
            rest: {
                commandsRegistered: "전역적으로 {count}개 애플리케이션 (/) 명령어가 성공적으로 등록됨 ✅",
                commandsFailed: "명령어 등록 실패 ❌",
                error: "오류: {message}",
                details: "세부 정보: {details}"
            },
            interaction: {
                commandNotFound: "명령어를 찾을 수 없음: {commandName}",
                errorExecuting: "{commandName} 명령어 실행 오류:",
                errorHelpButton: "도움말 뒤로 가기 버튼 처리 오류:",
                errorHelpSelect: "도움말 카테고리 선택 처리 오류:",
                unexpectedError: "예기치 않은 오류:",
                failedToSendError: "오류 메시지 전송 실패:"
            }
        },
        mongodb: {
            uriNotDefined: "구성에서 MongoDB URI가 정의되지 않았습니다.",
            skippingConnection: "URI가 제공되지 않아 MongoDB 연결을 건너뜁니다.",
            connected: "MongoDB에 연결됨 ✅",
            connectionFailed: "MongoDB에 연결할 수 없습니다. 데이터베이스 기능 없이 계속합니다."
        },
        lavalink: {
            nodesConfigured: "노드 구성됨: {count}",
            riffyInitialized: "{count}개 노드로 초기화됨",
            nodeKeys: "노드 키:",
            failedToInitialize: "Riffy 초기화 실패: {message}",
            riffyReinitialized: "Riffy 재초기화됨",
            failedToReinitialize: "Riffy 재초기화 실패: {message}",
            nodeConnected: "연결됨: {name} ({host}:{port}) • {available}/{total} 활성",
            nodeDisconnected: "연결 끊김: {name} ({host}:{port}) • {available}/{total} 활성",
            retryLimitReported: "{name}에서 재시도 제한 보고됨; 재연결 루프 계속됨",
            nodeError: "오류: {name} ({host}:{port}) • {message}",
            nodeStatus: "{available}/{total} 활성",
            waitingForConnection: "Lavalink 노드 연결 대기 중...",
            nodeAvailable: "노드 사용 가능 ({count} 연결됨)",
            noNodesConnected: "연결된 노드 없음 ({connected}/{total}) — 재연결 시도 중...",
            nodeStatusReport: "노드 상태: {connected}/{total} 연결됨"
        },
        player: {
            lacksPermissions: "봇이 이 채널에서 메시지를 보낼 필요한 권한이 없습니다.",
            errorSendingMessage: "메시지 전송 오류: {message}",
            trackException: "길드 {guildId}의 트랙 예외: {message}",
            trackStuck: "길드 {guildId}의 트랙 멈춤: {message}",
            trackNull: "길드 {guildId}의 트랙이 null이거나 정보가 누락됨 - 이벤트 무시",
            playerInvalid: "길드 {guildId}의 플레이어가 유효하지 않거나 파괴됨 - 이벤트 무시",
            channelNotFound: "길드 {guildId}의 채널을 찾을 수 없음",
            errorSavingHistory: "기록 저장 오류:",
            errorMusicCard: "음악 카드 생성 또는 전송 오류: {message}",
            autoplayDisabled: "길드 {guildId}에 대해 자동 재생이 비활성화됨",
            errorQueueEnd: "대기열 종료 처리 오류:",
            errorCleanupPrevious: "이전 트랙 메시지 정리 오류:",
            errorCleanupTrack: "트랙 메시지 정리 오류:",
            lyricsFetchError: "❌ 가사 가져오기 오류: {message}",
            unableToSendMessage: {
                title: "## ⚠️ 메시지를 보낼 수 없음",
                message: "메시지를 보낼 수 없습니다. 봇 권한을 확인하세요."
            },
            trackError: {
                title: "## ⚠️ 트랙 오류",
                message: "트랙을 불러오지 못했습니다.",
                skipping: "다음 노래로 건너뛰는 중..."
            },
            unableToLoadCard: {
                title: "## ⚠️ 트랙 카드를 불러올 수 없음",
                message: "트랙 카드를 불러올 수 없습니다. 재생을 계속합니다..."
            },
            queueEnd: {
                noMoreAutoplay: "⚠️ **자동 재생할 트랙이 더 이상 없습니다. 연결을 끊는 중...**",
                queueEndedAutoplayDisabled: "🎶 **대기열이 끝났습니다. 자동 재생이 비활성화되어 있습니다.**",
                queueEmpty: "👾 **대기열이 비어 있습니다! 연결을 끊는 중...**",
                twentyfoursevenEmpty: "🔄 **24/7 모드: 봇이 음성 채널에 머물 것입니다. 대기열이 비어 있습니다.**"
            },
            voiceChannelRequired: {
                title: "## 🔒 음성 채널 필요",
                message: "컨트롤을 사용하려면 같은 음성 채널에 있어야 합니다!"
            },
            controls: {
                skip: "⏭️ **다음 노래로 건너뛰는 중...**",
                queueCleared: "🗑️ **대기열이 지워졌습니다!**",
                playbackStopped: "⏹️ **재생이 중지되고 플레이어가 파괴되었습니다!**",
                alreadyPaused: "⏸️ **재생이 이미 일시 정지되어 있습니다!**",
                playbackPaused: "⏸️ **재생이 일시 정지되었습니다!**",
                alreadyResumed: "▶️ **재생이 이미 재개되었습니다!**",
                playbackResumed: "▶️ **재생이 재개되었습니다!**",
                volumeMax: "🔊 **볼륨이 이미 최대입니다!**",
                volumeMin: "🔉 **볼륨이 이미 최소입니다!**",
                volumeChanged: "🔊 **볼륨이 {volume}%로 변경되었습니다!**",
                trackLoopActivated: "🔁 **트랙 반복이 활성화되었습니다!**",
                queueLoopActivated: "🔁 **대기열 반복이 활성화되었습니다!**",
                loopDisabled: "❌ **반복이 비활성화되었습니다!**"
            },
            lyrics: {
                noSongPlaying: "🚫 **현재 재생 중인 노래가 없습니다.**",
                notFound: "❌ **가사를 찾을 수 없습니다!**",
                liveTitle: "## 🎵 실시간 가사: {title}",
                syncing: "🔄 가사 동기화 중...",
                fullTitle: "## 🎵 전체 가사: {title}",
                stopButton: "가사 중지",
                fullButton: "전체 가사",
                deleteButton: "삭제"
            },
            trackInfo: {
                title: "**제목:**",
                author: "**작성자:**",
                length: "**길이:**",
                requester: "**요청자:**",
                source: "**소스:**",
                progress: "**진행:**",
                unknownArtist: "알 수 없는 아티스트",
                unknown: "알 수 없음"
            },
            controlLabels: {
                loop: "반복",
                disable: "비활성화",
                skip: "건너뛰기",
                queue: "대기열",
                clear: "지우기",
                stop: "중지",
                pause: "일시 정지",
                resume: "재개",
                volUp: "볼륨 +",
                volDown: "볼륨 -"
            }
        }
    }
};

