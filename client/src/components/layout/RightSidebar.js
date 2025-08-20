import React, { useState, useRef, useEffect } from 'react';
import { loadYouTubeAPI } from '../../utils/api';
import { YOUTUBE_PLAYLIST_ID, YOUTUBE_PLAYER_CONFIG } from '../../constants/youtube';

const RightSidebar = ({ hideHeader = false }) => {
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
        // Error fetching video info
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
        
        // Update state with the new video info using the unique ID
        setPlaylistVideos(prevVideos => 
          prevVideos.map((video) => 
            video.originalId === playlist[i] 
              ? { ...video, title: videoInfo.title, channelTitle: videoInfo.channelTitle }
              : video
          )
        );
        
        // Small delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 150));
      } catch (error) {
        // Error loading video
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
          // Error getting time
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const onPlayerReady = (event) => {
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
        // Create unique playlist data with index-based IDs to handle duplicate video IDs
        const playlistData = playlist.map((videoId, index) => ({
          id: `${videoId}-${index}`, // Make ID unique by combining videoId with index
          originalId: videoId, // Keep original video ID for API calls
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
        // Error getting video data
      }
    }
  };

  const handlePlayPause = () => {
    if (!playerRef.current || !isPlayerReady) {
      return;
    }
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (error) {
      // Error controlling video
    }
  };

  const handleNext = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.nextVideo();
        // Update will happen in onPlayerStateChange
      } catch (error) {
        // Error going to next video
      }
    }
  };

  const handlePrevious = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.previousVideo();
        // Update will happen in onPlayerStateChange
      } catch (error) {
        // Error going to previous video
      }
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
          // Error getting video data
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
      <div className="bg-white rounded-2xl overflow-hidden h-full flex items-center justify-center shadow-lg border border-gray-200">
        <div className="text-center p-8">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl animate-pulse">🎬</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200/50">
            <p className="text-gray-700 font-semibold text-lg mb-2">Loading YouTube Player...</p>
            <p className="text-gray-500 text-sm">Getting everything ready for you</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white overflow-hidden h-full flex flex-col ${hideHeader ? 'rounded-none border-none shadow-none' : 'rounded-2xl shadow-lg border border-gray-200'}`}>
      {/* Enhanced Header - Conditionally rendered */}
      {!hideHeader && (
        <div className="relative bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 text-black p-6 overflow-hidden border-b border-gray-200 shadow-xl group hover:shadow-2xl transition-all duration-500">
          {/* Background decoration */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-red-500/15 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-blue-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-500/8 to-red-500/12 rounded-full blur-xl animate-pulse delay-500"></div>
          
          {/* Animated border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-3">
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-6 h-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight transition-all duration-300">
                  YouTube Music
                </h2>
                <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 group-hover:font-medium transition-all duration-300">Personal playlist & music collection</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <a 
                  href={`https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center px-3 py-1.5 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-500 group-hover/btn:text-gray-700 group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="font-medium group-hover/btn:translate-x-1 group-hover/btn:font-bold transition-all duration-300">View Full Playlist</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Player */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-br from-black/20 via-black/15 to-black/30 flex-1 min-h-0 group overflow-hidden shadow-inner"
      >

        
        <div 
          id="youtube-player" 
          className="w-full h-full relative z-0 cursor-pointer" 
          onClick={isPlaying ? handlePlayPause : undefined}
        ></div>

        {/* YouTube Controls Overlay */}
        <div className={`absolute inset-0 z-10 transition-all duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          
          {/* Center Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md cursor-pointer" onClick={handlePlayPause}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                className="bg-white/20 backdrop-blur-lg text-black rounded-full p-8 hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/40 hover:border-white/60 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <svg className="w-12 h-12 ml-1 relative z-10 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3 bg-gradient-to-t from-white/30 via-white/60 to-transparent backdrop-blur-md z-50">
            {/* Progress Bar */}
            <div 
              className="w-full h-1 bg-black/30 rounded-full cursor-pointer hover:h-1.5 transition-all duration-300 group shadow-inner backdrop-blur-sm"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full relative shadow-lg"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border-2 border-white drop-shadow-lg backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Control Bar */}
            <div className="flex items-center justify-between text-black relative z-50">
              <div className="flex items-center space-x-5">
                {/* Play/Pause */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause();
                  }}
                  className="group p-3.5 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md border border-black/20 hover:border-white/40 shadow-lg hover:shadow-xl cursor-pointer transform-gpu"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
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
                  className="group p-3 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md border border-black/20 hover:border-white/40 shadow-lg hover:shadow-xl cursor-pointer transform-gpu"
                >
                  <svg className="w-5 h-5 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300 group-hover:-translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>

                {/* Next */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="group p-3 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md border border-black/20 hover:border-white/40 shadow-lg hover:shadow-xl cursor-pointer transform-gpu"
                >
                  <svg className="w-5 h-5 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300 group-hover:translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>

                {/* Volume */}
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVolumeChange(volume > 0 ? 0 : 100);
                    }}
                    className="group p-3 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md border border-black/20 hover:border-white/40 shadow-lg hover:shadow-xl cursor-pointer transform-gpu"
                  >
                    {volume === 0 ? (
                      <svg className="w-5 h-5 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300 group-hover:text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>
                  
                  <div 
                    className="relative w-24 h-2 bg-black/20 rounded-full cursor-pointer hover:bg-black/30 transition-all duration-300 shadow-inner hover:h-3 group"
                    onClick={handleVolumeClick}
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-sm transition-all duration-300 group-hover:shadow-md relative overflow-hidden"
                      style={{ width: `${volume}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg border-2 border-white"></div>
                    </div>
                  </div>
                </div>

                {/* Time */}
                <span className="text-sm text-black/95 font-semibold bg-white/80 px-4 py-2 rounded-full backdrop-blur-md border border-black/20 shadow-lg hover:bg-white/90 hover:shadow-xl transition-all duration-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Fullscreen */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="group p-3 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md border border-black/20 hover:border-white/40 shadow-lg hover:shadow-xl cursor-pointer transform-gpu"
              >
                <svg className="w-5 h-5 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300 group-hover:text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Video Title */}
          {currentVideoInfo && (
            <div className="absolute top-6 left-6 right-6 bg-gradient-to-b from-white/90 via-white/70 to-transparent p-5 rounded-2xl backdrop-blur-md border border-black/20 shadow-2xl">
              <h3 className="text-black text-xl font-bold truncate tracking-tight drop-shadow-lg">
                {currentVideoInfo.title}
              </h3>
              <p className="text-black/95 text-sm truncate mt-2 flex items-center">
                <svg className="w-5 h-5 mr-3 text-black drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="font-medium">{currentVideoInfo.author}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Playlist Section */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/50 via-white/80 to-gray-50/50 min-h-0 border-t border-gray-200/30 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 tracking-tight">Your Playlist</h3>
                <p className="text-sm text-gray-500 mt-0.5">Curated music collection</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {playlistVideos.some(video => video.title === 'Loading...') && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600 font-medium">Syncing...</span>
                </div>
              )}
              <span className="text-sm text-gray-700 bg-gradient-to-r from-blue-50 via-white to-purple-50 px-4 py-2 rounded-xl font-semibold border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                {playlistVideos.length || 'Loading'} tracks
              </span>
            </div>
          </div>
          
          {playlistLoading ? (
            <div className="space-y-4">
              {/* Enhanced loading state with shimmer */}
              <div className="text-center py-8">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl">
                    <svg className="w-8 h-8 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-purple-500/20 rounded-2xl animate-ping opacity-30"></div>
                </div>
                <div className="bg-gradient-to-br from-purple-50/80 via-white/90 to-blue-50/80 rounded-2xl p-6 border border-purple-200/50 shadow-lg backdrop-blur-sm">
                  <p className="text-sm font-bold text-gray-800 mb-2">Loading Your Music Collection</p>
                  <p className="text-xs text-gray-500">Fetching playlist details and thumbnails...</p>
                  <div className="mt-4 flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
              
              {/* Skeleton loading items */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-4 p-4 rounded-2xl bg-gradient-to-br from-gray-50/80 to-white/90 border border-gray-200/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                  <div className="w-20 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : playlistVideos.length > 0 ? (
            <div className="space-y-3">
              {playlistVideos.map((video, index) => (
                <div
                  key={`${video.id}-${index}`}
                  onClick={() => handlePlaylistClick(index)}
                  className={`group relative flex space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden ${
                    index === playlistIndex 
                      ? 'bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 border-2 border-blue-200/60 shadow-xl transform scale-[1.02]' 
                      : 'bg-gradient-to-br from-white/80 to-gray-50/60 hover:from-gray-50/80 hover:to-white/90 border border-gray-200/50 hover:border-gray-300/60 hover:shadow-lg hover:scale-[1.01]'
                  }`}
                >
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    index === playlistIndex 
                      ? 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' 
                      : 'bg-gradient-to-br from-gray-500/5 via-transparent to-blue-500/5'
                  }`}></div>
                  
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 border border-gray-200/50"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-20 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-lg hidden border border-gray-200/50">
                        🎵
                      </div>
                      
                      {/* Play overlay for current track */}
                      {index === playlistIndex && (
                        <div className="absolute inset-0 bg-blue-500/30 rounded-xl border-2 border-blue-400 flex items-center justify-center backdrop-blur-sm">
                          <div className="bg-blue-500 text-white rounded-full p-1.5 shadow-lg animate-pulse">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {/* Hover play button */}
                      {index !== playlistIndex && (
                        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                          <div className="bg-white/90 text-gray-800 rounded-full p-1.5 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1 min-w-0 z-10">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-800 line-clamp-2 leading-tight mb-2 transition-colors duration-300">
                      {video.title === 'Loading...' ? (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse mr-2"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                          </div>
                        </div>
                      ) : (
                        video.title
                      )}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 flex items-center">
                        {video.channelTitle === 'Loading...' ? (
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse mr-2"></div>
                            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 animate-pulse relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <svg className="w-3 h-3 mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            <span className="font-medium truncate">{video.channelTitle}</span>
                          </>
                        )}
                      </p>
                      
                      {index === playlistIndex && (
                        <div className="flex items-center ml-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-full border border-blue-200 shadow-sm whitespace-nowrap">
                            Now Playing
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <div className="text-3xl animate-bounce">🎵</div>
                </div>
                <div className="absolute inset-0 bg-gray-300/20 rounded-2xl animate-ping opacity-30"></div>
              </div>
              <div className="bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-100/60 rounded-2xl p-6 border border-gray-200/60 shadow-lg backdrop-blur-sm">
                <p className="text-sm font-bold text-gray-800 mb-2">
                  Music Player Ready
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  YouTube player loaded successfully! Your playlist is ready to stream.
                </p>
                <a 
                  href={`https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-gray-700 hover:text-gray-800 transition-all duration-300 font-semibold bg-gradient-to-r from-white via-gray-50 to-white hover:from-gray-50 hover:to-gray-100 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Full Playlist
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