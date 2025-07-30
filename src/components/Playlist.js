import React from 'react';

const Playlist = () => {
  return (
    <div className="relative overflow-hidden">
      <h2 className="text-2xl font-light mb-6">Playlist</h2>
      <div className="border border-black/10 bg-white hover:scale-105 transition-transform duration-300 shadow-sm">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/videoseries?list=PLvWvV445rm7UfkCe8ALK6wOT5NcdNItfd"
          title="YouTube Playlist"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Playlist; 