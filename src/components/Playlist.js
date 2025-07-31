import React from 'react';

const Playlist = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] via-white to-black/[0.02] rounded-lg"></div>
      <div className="relative bg-white/70 backdrop-blur-sm border border-black/5 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-6">
        <h2 className="text-2xl font-light mb-6 text-black/90">Playlist</h2>
        <div className="border border-black/10 bg-white/95 backdrop-blur-sm rounded-md overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 group">
          <div className="relative">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/videoseries?list=PLvWvV445rm7UfkCe8ALK6wOT5NcdNItfd"
              title="YouTube Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <div className="p-4 bg-white/95 border-t border-black/5">
            <p className="text-xs text-black/70 leading-relaxed">
              A curated collection of inspiring music to code by
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist; 