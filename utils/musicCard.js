const { createCanvas, loadImage } = require("@napi-rs/canvas");
const path = require("path");
const fs = require('fs').promises;
const axios = require('axios');
const crypto = require('crypto');

function youtubeThumbCandidates(videoId) {
    return [
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/default.jpg`,
    ];
}

function tryExtractYouTubeId(url) {
    if (!url) return null;
    try {
        const u = new URL(url);
        if (u.hostname.includes('youtube.com')) {
            return u.searchParams.get('v');
        }
        if (u.hostname === 'youtu.be') {
            return u.pathname.slice(1);
        }
    } catch (e) {
        if (/^[\w-]{11}$/.test(url)) return url;
    }
    return null;
}

async function fetchImageBuffer(url, timeout = 3000) {
    try {
        const resp = await axios.get(url, {
            responseType: 'arraybuffer',
            timeout,
            maxContentLength: 5 * 1024 * 1024, // 5MB max
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            validateStatus: status => status >= 200 && status < 400
        });
        return Buffer.from(resp.data);
    } catch (error) {
        return null;
    }
}

async function getYouTubeThumbnail(videoId) {
    if (!videoId) return null;
    
    // Try smaller thumbnails first (faster, less memory)
    const candidates = [
        `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,  // Medium quality (faster)
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,  // High quality fallback
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,  // Standard definition
    ];
    
    for (const url of candidates) {
        try {
            const buffer = await fetchImageBuffer(url, 2000); // 2 second timeout
            if (buffer && buffer.length > 5000) { // At least 5KB
                return buffer;
            }
        } catch (err) {
            continue;
        }
    }
    
    return null;
}

class EnhancedMusicCard {
    async generateCard(options) {
        const config = {
            width: 900,
            height: 300,
            thumbnailURL: options.thumbnailURL || '',
            trackURI: options.trackURI || options.thumbnailURL || '', // Track URI for YouTube ID extraction
            songTitle: options.songTitle || 'Unknown Track',
            songArtist: options.songArtist || 'Unknown Artist',
            trackRequester: options.trackRequester || 'Unknown',
            isPlaying: options.isPlaying !== false,
            showVisualizer: options.showVisualizer !== false,
        };

        try {
            const canvas = createCanvas(config.width, config.height);
            const ctx = canvas.getContext("2d");

            // Draw clean background
            await this.drawBackground(ctx, config);
            
            // Draw content card
            await this.drawContentCard(ctx, config);
            
            // Draw thumbnail
            await this.drawThumbnail(ctx, config);
            
            // Draw visualizer (always draw, but static when showVisualizer is false)
            this.drawVisualizer(ctx, config);
            
            // Draw text content
            await this.drawTextContent(ctx, config);

            return canvas.toBuffer("image/png");
        } catch (error) {
            console.error('Error generating music card:', error);
            return this.generateErrorCard(config.width, config.height);
        }
    }

    async drawBackground(ctx, config) {
        const { width, height } = config;
        
        // Professional dark gradient - sophisticated and clean
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#0F0F23');      // Deep navy
        gradient.addColorStop(0.3, '#1A1A2E');   // Dark slate
        gradient.addColorStop(0.6, '#16213E');   // Darker blue-gray
        gradient.addColorStop(1, '#0F0F23');     // Back to deep navy
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Subtle radial overlay for depth (very subtle)
        const radialGradient = ctx.createRadialGradient(
            width * 0.75, height * 0.25, 0,
            width * 0.75, height * 0.25, Math.max(width, height) * 0.9
        );
        radialGradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
        radialGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
        radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
        
        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, width, height);
        
        // Very subtle noise texture for professional look
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
    }

    async drawContentCard(ctx, config) {
        const { width, height } = config;
        const margin = 20;
        const radius = 24;
        
        ctx.save();
        
        // Professional glass morphism - subtle and clean
        ctx.beginPath();
        ctx.roundRect(margin, margin, width - margin * 2, height - margin * 2, radius);
        
        // Main glass effect - more subtle for professional look
        const cardGradient = ctx.createLinearGradient(0, margin, 0, height - margin);
        cardGradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        cardGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
        cardGradient.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
        
        ctx.fillStyle = cardGradient;
        ctx.fill();
        
        // Very subtle inner highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(margin + 2, margin + 2, width - margin * 2 - 4, (height - margin * 2) * 0.25, radius - 2);
        ctx.fill();
        
        // Clean, professional border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(margin, margin, width - margin * 2, height - margin * 2, radius);
        ctx.stroke();
        
        ctx.restore();
    }

    async drawThumbnail(ctx, config) {
        const { height } = config;
        const thumbnailSize = height - 80;
        const thumbnailX = config.width - thumbnailSize - 40;
        const thumbnailY = 40;
        const radius = 18;
        const borderWidth = 4;
        
        // Try to extract YouTube ID from track URI first (most reliable)
        let ytId = tryExtractYouTubeId(config.trackURI);
        
        // Fallback: try thumbnail URL
        if (!ytId) {
            ytId = tryExtractYouTubeId(config.thumbnailURL);
        }
        
        let buffer = null;
        
        // Try to get YouTube thumbnail directly (simpler, faster, more reliable)
        if (ytId) {
            buffer = await getYouTubeThumbnail(ytId);
        }
        
        // Fallback: try original thumbnail URL if YouTube method failed
        if (!buffer && config.thumbnailURL && config.thumbnailURL.startsWith('http')) {
            try {
                buffer = await fetchImageBuffer(config.thumbnailURL, 2000);
            } catch (err) {
                // Ignore errors, will use placeholder
            }
        }
        
        // If we got a buffer, try to load and draw it
        if (buffer && buffer.length > 5000) {
            try {
                const img = await loadImage(buffer);
                ctx.save();
                
                const srcW = img.width;
                const srcH = img.height;
                const destW = thumbnailSize;
                const destH = thumbnailSize;
                
                const scaleX = destW / srcW;
                const scaleY = destH / srcH;
                const scale = Math.max(scaleX, scaleY);
                
                const scaledSrcW = destW / scale;
                const scaledSrcH = destH / scale;
                
                const sw = Math.min(srcW, scaledSrcW);
                const sh = Math.min(srcH, scaledSrcH);
                
                const sx = Math.floor(Math.max(0, (srcW - sw) / 2));
                const sy = Math.floor(Math.max(0, (srcH - sh) / 2));
                
                ctx.beginPath();
                ctx.roundRect(thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, radius);
                ctx.clip();
                
                ctx.drawImage(img, sx, sy, sw, sh, thumbnailX, thumbnailY, destW, destH);
                ctx.restore();
                
                ctx.save();
                ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 3;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.lineWidth = borderWidth;
                ctx.beginPath();
                ctx.roundRect(thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, radius);
                ctx.stroke();
                
                ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
                ctx.shadowBlur = 6;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(
                    thumbnailX + borderWidth / 2,
                    thumbnailY + borderWidth / 2,
                    thumbnailSize - borderWidth,
                    thumbnailSize - borderWidth,
                    radius - 1
                );
                ctx.stroke();
                ctx.restore();
                
                return; // Successfully drew thumbnail
            } catch (err) {
                // Fall through to placeholder
            }
        }
        
        // Draw beautiful music icon placeholder
        return this.drawThumbnailPlaceholder(ctx, thumbnailX, thumbnailY, thumbnailSize, radius);
    }

    drawThumbnailPlaceholder(ctx, x, y, size, radius = 18) {
        ctx.save();
        
        // Beautiful gradient background
        const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');  // Blue
        gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.3)'); // Purple
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0.3)');   // Pink
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, radius);
        ctx.fill();
        
        // Subtle inner glow
        const innerGradient = ctx.createRadialGradient(
            x + size/2, y + size/2, 0,
            x + size/2, y + size/2, size/2
        );
        innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        innerGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, radius);
        ctx.fill();
        
        // Elegant border with glow
        ctx.shadowColor = 'rgba(96, 165, 250, 0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, radius);
        ctx.stroke();
        
        // Reset shadow for icon
        ctx.shadowColor = 'transparent';
        
        // Draw music note icon (more professional than emoji)
        const iconSize = size * 0.4;
        const iconX = x + size/2;
        const iconY = y + size/2;
        
        ctx.strokeStyle = '#FFFFFF';
        ctx.fillStyle = '#FFFFFF';
        ctx.lineWidth = Math.max(3, size * 0.02);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw music note
        ctx.beginPath();
        // Note head (circle)
        ctx.arc(iconX - iconSize * 0.15, iconY - iconSize * 0.1, iconSize * 0.12, 0, Math.PI * 2);
        ctx.fill();
        
        // Note stem
        ctx.beginPath();
        ctx.moveTo(iconX - iconSize * 0.15, iconY - iconSize * 0.22);
        ctx.lineTo(iconX - iconSize * 0.15, iconY + iconSize * 0.3);
        ctx.stroke();
        
        // Note flag
        ctx.beginPath();
        ctx.moveTo(iconX - iconSize * 0.15, iconY + iconSize * 0.3);
        ctx.quadraticCurveTo(
            iconX - iconSize * 0.1, iconY + iconSize * 0.25,
            iconX + iconSize * 0.1, iconY + iconSize * 0.2
        );
        ctx.quadraticCurveTo(
            iconX + iconSize * 0.15, iconY + iconSize * 0.15,
            iconX + iconSize * 0.1, iconY + iconSize * 0.1
        );
        ctx.stroke();
        
        // Add subtle shine effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(iconX - iconSize * 0.15, iconY - iconSize * 0.1, iconSize * 0.08, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    drawVisualizer(ctx, config) {
        const barCount = 32;
        const barWidth = 8;
        const barSpacing = 4;
        const maxBarHeight = 70;
        const minBarHeight = 15;
        const startX = 50;
        const baseY = config.height - 40;
        
        ctx.save();
        
        const isDynamic = config.showVisualizer && config.isPlaying;
        
        for (let i = 0; i < barCount; i++) {
            let barHeight;
            
            if (isDynamic) {
                const wavePhase1 = (i / barCount) * Math.PI * 4;
                const wavePhase2 = (i / barCount) * Math.PI * 2.5;
                const wavePhase3 = (i / barCount) * Math.PI * 6;
                
                const wave1 = Math.sin(wavePhase1) * 0.5;
                const wave2 = Math.sin(wavePhase2) * 0.3;
                const wave3 = Math.sin(wavePhase3) * 0.2;
                const randomFactor = (Math.random() - 0.5) * 0.3;
                const combinedWave = wave1 + wave2 + wave3 + randomFactor;
                
                const normalizedWave = (combinedWave + 1) / 2;
                barHeight = minBarHeight + (maxBarHeight - minBarHeight) * normalizedWave;
            } else {
                const staticHeight = minBarHeight + (maxBarHeight - minBarHeight) * 0.5;
                barHeight = staticHeight;
            }
            
            const x = startX + i * (barWidth + barSpacing);
            
            const barGradient = ctx.createLinearGradient(0, baseY - barHeight, 0, baseY);
            barGradient.addColorStop(0, '#60A5FA');
            barGradient.addColorStop(0.5, '#3B82F6');
            barGradient.addColorStop(1, '#1E40AF');
            
            ctx.fillStyle = barGradient;
            ctx.beginPath();
            ctx.roundRect(x, baseY - barHeight, barWidth, barHeight, barWidth/2);
            ctx.fill();
            
            if (isDynamic) {
                ctx.save();
                ctx.shadowColor = 'rgba(96, 165, 250, 0.4)';
                ctx.shadowBlur = 8;
                ctx.globalCompositeOperation = 'screen';
                ctx.fill();
                ctx.restore();
            }
        }
        
        ctx.restore();
    }

    async drawTextContent(ctx, config) {
        const maxWidth = config.width - 320;
        const startX = 50;
        const startY = 60;
        
        // Song title - Enhanced with better shadow
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 40px Poppins, Segoe UI, Helvetica Neue, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
        
        const truncatedTitle = this.truncateText(ctx, config.songTitle, maxWidth);
        ctx.fillText(truncatedTitle, startX, startY);
        
        // Get title height for proper spacing
        const titleMetrics = ctx.measureText(truncatedTitle);
        const titleHeight = 40; // Font size
        ctx.restore();
        
        // Song artist - Better contrast with proper spacing
        ctx.save();
        ctx.fillStyle = '#E5E7EB';
        ctx.font = '28px Poppins, Segoe UI, Helvetica Neue, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        const truncatedArtist = this.truncateText(ctx, config.songArtist, maxWidth);
        const artistY = startY + titleHeight + 12; // 12px gap after title
        ctx.fillText(truncatedArtist, startX, artistY);
        
        // Get artist height for proper spacing
        const artistHeight = 28; // Font size
        ctx.restore();
        
        // Requester - Professional subtle style with proper spacing
        ctx.save();
        ctx.fillStyle = '#9CA3AF';  // Professional gray
        ctx.font = 'bold 19px Poppins, Segoe UI, Helvetica Neue, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetY = 1;
        
        const requesterText = `Requested by: ${config.trackRequester}`;
        const requesterY = artistY + artistHeight + 10; // 10px gap after artist
        ctx.fillText(requesterText, startX, requesterY);
        ctx.restore();
    }

    truncateText(ctx, text, maxWidth) {
        if (ctx.measureText(text).width <= maxWidth) {
            return text;
        }
        let truncated = text;
        while (ctx.measureText(truncated + '...').width > maxWidth && truncated.length > 0) {
            truncated = truncated.slice(0, -1);
        }
        return truncated + '...';
    }

    generateErrorCard(width, height) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        
        ctx.fillStyle = '#FF4444';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px Poppins, Segoe UI, Helvetica Neue, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Error generating music card', width/2, height/2);
        
        return canvas.toBuffer("image/png");
    }
}

module.exports = { EnhancedMusicCard };


