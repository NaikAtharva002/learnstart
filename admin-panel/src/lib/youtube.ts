/**
 * YouTube URL utilities — LearnStart
 * Handles parsing, validation, and embed URL generation for YouTube videos.
 */

/**
 * Extract YouTube video ID from any YouTube URL format.
 * Supports:
 *   - youtube.com/watch?v=VIDEO_ID
 *   - youtu.be/VIDEO_ID
 *   - youtube.com/shorts/VIDEO_ID
 *   - youtube.com/embed/VIDEO_ID
 *   - Raw video ID string
 */
export function extractYouTubeId(url: string): string | null {
    if (!url) return null;

    // Already a plain video ID (11 chars, alphanumeric + dash/underscore)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return url.trim();
    }

    try {
        const parsed = new URL(url);

        // youtube.com/watch?v=ID
        if (parsed.hostname.includes('youtube.com') && parsed.searchParams.has('v')) {
            return parsed.searchParams.get('v');
        }

        // youtu.be/ID
        if (parsed.hostname === 'youtu.be') {
            return parsed.pathname.slice(1).split('/')[0] || null;
        }

        // youtube.com/shorts/ID or youtube.com/embed/ID
        const pathMatch = parsed.pathname.match(/^\/(shorts|embed)\/([a-zA-Z0-9_-]+)/);
        if (pathMatch) {
            return pathMatch[2];
        }
    } catch {
        // Not a valid URL — try regex fallback
        const match = url.match(/(?:v=|\/)([\w-]{11})(?:\?|&|$)/);
        if (match) return match[1];
    }

    return null;
}

/**
 * Generate YouTube embed URL from a video ID.
 * Includes recommended params for clean embedding.
 */
export function getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

/**
 * Generate YouTube watch URL from a video ID.
 */
export function getWatchUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Generate YouTube thumbnail URL from a video ID.
 * Uses maxresdefault with fallback options.
 */
export function getThumbnailUrl(videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'): string {
    const qualityMap = {
        default: 'default',
        hq: 'hqdefault',
        mq: 'mqdefault',
        sd: 'sddefault',
        maxres: 'maxresdefault',
    };
    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Parse any YouTube URL and return structured data.
 */
export function parseYouTubeUrl(url: string): {
    videoId: string;
    embedUrl: string;
    watchUrl: string;
    thumbnailUrl: string;
} | null {
    const videoId = extractYouTubeId(url);
    if (!videoId) return null;

    return {
        videoId,
        embedUrl: getEmbedUrl(videoId),
        watchUrl: getWatchUrl(videoId),
        thumbnailUrl: getThumbnailUrl(videoId),
    };
}
