// YouTube API configuration and constants
export const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
export const YOUTUBE_PLAYLIST_ID = 'PLvWvV445rm7UfkCe8ALK6wOT5NcdNItfd';

// YouTube iframe player configuration
export const YOUTUBE_PLAYER_CONFIG = {
  height: '100%',
  width: '100%',
  playerVars: {
    listType: 'playlist',
    list: YOUTUBE_PLAYLIST_ID,
    autoplay: 0,
    controls: 0,
    modestbranding: 1,
    rel: 0,
    iv_load_policy: 3,
    showinfo: 0,
    fs: 1,
    enablejsapi: 1,
    origin: window.location.origin
  }
};

// YouTube thumbnail URL helper
export const getYouTubeThumbnail = (videoId, quality = 'mqdefault') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

// YouTube watch URL helper  
export const getYouTubeWatchUrl = (videoId) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

// Playlist URL
export const YOUTUBE_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`;