import React, { useState, useRef, useEffect } from 'react';
import { loadYouTubeAPI } from '../../utils/api';
import { YOUTUBE_PLAYLIST_ID, YOUTUBE_PLAYER_CONFIG } from '../../constants/youtube';

const RightSidebar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentVideoInfo, setCurrentVideoInfo] = useState(null);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Function to load video titles using YouTube oEmbed API (no API key required)
  const loadVideoTitles = async (playlist) => {
    if (!playlist) return;
    
    // Function to fetch video info using oEmbed
    const fetchVideoInfo = async (videoId, index) => {
      try {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (response.ok) {
          const data = await response.json();
          return {
            title: data.title || `Video ${index + 1}`,
            channelTitle: data.author_name || 'YouTube'
          };
        }
      } catch (error) {
        console.log(`Could not fetch info for video ${videoId}:`, error);
      }
      
      return {
        title: `Video ${index + 1}`,
        channelTitle: 'YouTube'
      };
    };

    // Load titles for all videos with progressive updates
    for (let i = 0; i < playlist.length; i++) {
      try {
        const videoInfo = await fetchVideoInfo(playlist[i], i);
        
        // Update state with the new video info
        setPlaylistVideos(prevVideos => 
          prevVideos.map((video, index) => 
            index === i 
              ? { ...video, title: videoInfo.title, channelTitle: videoInfo.channelTitle }
              : video
          )
        );
        
        // Small delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 150));
      } catch (error) {
        console.log(`Error loading video ${i}:`, error);
      }
    }
  };

  // Load YouTube API and initialize player
  useEffect(() => {
    const initializePlayer = async () => {
      try {
        await loadYouTubeAPI();
        setIsPlayerReady(true);
      } catch (error) {
        console.error('Failed to load YouTube API:', error);
      }
    };

    initializePlayer();
  }, []);

  // Initialize YouTube player
  useEffect(() => {
    if (isPlayerReady && !playerRef.current && window.YT) {
      try {
        playerRef.current = new window.YT.Player('youtube-player', {
          ...YOUTUBE_PLAYER_CONFIG,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': (event) => {
              console.error('YouTube player error:', event.data);
            }
          }
        });
      } catch (error) {
        console.error('Failed to initialize YouTube player:', error);
      }
    }
  }, [isPlayerReady]);



  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      setShowControls(true);
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetControlsTimeout);
      container.addEventListener('mouseleave', () => {
        if (isPlaying) {
          clearTimeout(controlsTimeoutRef.current);
          controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 1000);
        }
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', resetControlsTimeout);
      }
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Update time
  useEffect(() => {
    let interval;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        try {
          const time = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration();
          setCurrentTime(time);
          setDuration(dur);
        } catch (error) {
          console.log('Error getting time:', error);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const onPlayerReady = (event) => {
    console.log('YouTube player ready');
    try {
      const videoData = playerRef.current.getVideoData();
      setCurrentVideoInfo({
        title: videoData.title || 'Loading...',
        author: videoData.author || 'YouTube',
        videoId: videoData.video_id
      });

      // Get playlist info from the player
      const playlist = playerRef.current.getPlaylist();
      if (playlist && playlist.length > 0) {
        const playlistData = playlist.map((videoId, index) => ({
          id: videoId,
          title: 'Loading...',
          channelTitle: 'Loading...',
          thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        }));
        setPlaylistVideos(playlistData);
        
        // Load video titles asynchronously
        setTimeout(() => {
          loadVideoTitles(playlist);
        }, 2000);
      }
      setPlaylistLoading(false);
    } catch (error) {
      console.log('Could not get initial video data:', error);
      setPlaylistLoading(false);
    }
  };

  const onPlayerStateChange = (event) => {
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
    
    if (playerRef.current) {
      try {
        const videoData = playerRef.current.getVideoData();
        const currentIndex = playerRef.current.getPlaylistIndex();
        
        setCurrentVideoInfo(prev => ({
          ...prev,
          title: videoData.title || 'Unknown Video',
          author: videoData.author || 'Unknown Channel',
          videoId: videoData.video_id
        }));

        // Update current playlist index
        if (currentIndex !== -1) {
          setPlaylistIndex(currentIndex);
          
          // Update the current video title in the playlist
          setPlaylistVideos(prev => prev.map((video, index) => 
            index === currentIndex 
              ? { ...video, title: videoData.title || `Video ${index + 1}`, channelTitle: videoData.author || 'YouTube' }
              : video
          ));
        }
      } catch (error) {
        console.log('Could not get video data:', error);
      }
    }
  };

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    if (playerRef.current) {
      playerRef.current.nextVideo();
      // Update will happen in onPlayerStateChange
    }
  };

  const handlePrevious = () => {
    if (playerRef.current) {
      playerRef.current.previousVideo();
      // Update will happen in onPlayerStateChange
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const handleSeek = (percentage) => {
    if (playerRef.current && duration) {
      const seekTime = (percentage / 100) * duration;
      playerRef.current.seekTo(seekTime);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlaylistClick = (index) => {
    setPlaylistIndex(index);
    if (playerRef.current) {
      playerRef.current.playVideoAt(index);
      
      // Update video info after a short delay to let the player load
      setTimeout(() => {
        try {
          const videoData = playerRef.current.getVideoData();
          setCurrentVideoInfo({
            title: videoData.title || `Video ${index + 1}`,
            author: videoData.author || 'YouTube',
            videoId: videoData.video_id
          });
        } catch (error) {
          console.log('Could not get video data:', error);
        }
      }, 500);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    handleSeek(percentage);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    handleVolumeChange(newVolume);
  };

  if (!isPlayerReady) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden h-full flex items-center justify-center backdrop-blur-sm">
        <div className="text-center p-8">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl animate-pulse">🎬</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200/50">
            <p className="text-gray-700 font-semibold text-lg mb-2">Loading YouTube Player...</p>
            <p className="text-gray-500 text-sm">Getting everything ready for you</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden h-full flex flex-col backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm"></div>
        <div className="relative flex items-center space-x-4">
          <div className="text-3xl animate-pulse">🎬</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold tracking-tight">YouTube Player</h2>
            <p className="text-sm text-purple-100 mt-1">
              <a 
                href={`https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all duration-200 hover:underline flex items-center space-x-1"
              >
                <span>View Full Playlist</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* YouTube Player */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-br from-gray-900 to-black flex-1 min-h-0 group cursor-pointer rounded-t-lg overflow-hidden"
        onClick={handlePlayPause}
      >
        <div id="youtube-player" className="w-full h-full relative z-0 rounded-t-lg"></div>

        {/* YouTube Controls Overlay */}
        <div className={`absolute inset-0 z-10 transition-all duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          
          {/* Center Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                className="bg-white/10 backdrop-blur-md text-white rounded-full p-6 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/20"
              >
                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-5 space-y-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm">
            {/* Progress Bar */}
            <div 
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all duration-300 group"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full relative shadow-lg"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg border-2 border-white"></div>
              </div>
            </div>

            {/* Control Bar */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause();
                  }}
                  className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Previous */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>

                {/* Next */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>

                {/* Volume */}
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVolumeChange(volume > 0 ? 0 : 100);
                    }}
                    className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                  >
                    {volume === 0 ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>
                  
                  <div 
                    className="w-20 h-1.5 bg-white/30 rounded-full cursor-pointer hover:bg-white/40 transition-colors duration-200"
                    onClick={handleVolumeClick}
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-white to-gray-200 rounded-full shadow-sm"
                      style={{ width: `${volume}%` }}
                    ></div>
                  </div>
                </div>

                {/* Time */}
                <span className="text-sm text-white/90 font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Fullscreen */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Video Title */}
          {currentVideoInfo && (
            <div className="absolute top-5 left-5 right-5 bg-gradient-to-b from-black/80 via-black/60 to-transparent p-4 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="text-white text-lg font-bold truncate tracking-tight">
                {currentVideoInfo.title}
              </h3>
              <p className="text-white/90 text-sm truncate mt-1 flex items-center">
                <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                {currentVideoInfo.author}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Playlist Section */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white min-h-0 border-t border-gray-200/50 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100 hover:scrollbar-thumb-purple-400">
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Your Playlist
            </h3>
            <div className="flex items-center space-x-2">
              {playlistVideos.some(video => video.title === 'Loading...') && (
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></div>
              )}
              <span className="text-xs text-gray-600 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1.5 rounded-full font-medium border border-purple-200/50">
                {playlistVideos.length || 'Loading'} videos
              </span>
            </div>
          </div>
          
          {playlistLoading ? (
            <div className="text-center py-12">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl animate-pulse">🎵</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200/50">
                <p className="text-sm font-medium text-gray-700">Loading your awesome playlist...</p>
                <p className="text-xs text-gray-500 mt-1">This might take a moment</p>
              </div>
            </div>
          ) : playlistVideos.length > 0 ? (
            <div className="space-y-3">
              {playlistVideos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handlePlaylistClick(index)}
                  className={`flex space-x-4 p-3 rounded-xl cursor-pointer transition-all duration-300 group ${
                    index === playlistIndex 
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300 shadow-lg transform scale-[1.02]' 
                      : 'hover:bg-gray-100 hover:shadow-md hover:transform hover:scale-[1.01] border border-transparent'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 group">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-20 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-lg hidden border border-gray-200">
                      🎬
                    </div>
                    {index === playlistIndex && (
                      <div className="absolute inset-0 bg-red-500/20 rounded-lg border-2 border-red-500 flex items-center justify-center">
                        <div className="bg-red-500 text-white rounded-full p-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight mb-1">
                      {video.title === 'Loading...' ? (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2"></div>
                          <span className="text-gray-400">Loading title...</span>
                        </div>
                      ) : (
                        video.title
                      )}
                    </h4>
                    <p className="text-xs text-gray-600 truncate flex items-center mb-1">
                      {video.channelTitle === 'Loading...' ? (
                        <span className="text-gray-400 flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse mr-2"></div>
                          Loading channel...
                        </span>
                      ) : (
                        <>
                          <svg className="w-3 h-3 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          {video.channelTitle}
                        </>
                      )}
                    </p>
                    {index === playlistIndex && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                        <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                          Now Playing
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4 animate-bounce">🎬</div>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200/50">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  YouTube player loaded successfully!
                </p>
                <a 
                  href={`https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-all duration-200 font-medium bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md border border-purple-200 hover:border-purple-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View full playlist
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;