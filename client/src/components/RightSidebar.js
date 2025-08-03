import React, { useState } from 'react';
import MarioGame from './MarioGame';
import CollaborativeText from './CollaborativeText';

const RightSidebar = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);

  const openGame = () => setIsGameOpen(true);
  const closeGame = () => setIsGameOpen(false);

  return (
    <>
      <aside className="w-full space-y-8">
        {/* Mario Game Launcher */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-xl shadow-lg border border-red-400 text-black overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 gap-1 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="bg-white rounded-sm"></div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">🍄 Mario Jump</h3>
              <div className="text-2xl">🎮</div>
            </div>
            
            <p className="text-red-100 mb-6 text-sm leading-relaxed">
              Classic side-scrolling platformer game! Jump over obstacles and collect points.
            </p>
            
            <button
              onClick={openGame}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-red-800 font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🚀 Launch Game
            </button>
          </div>
        </div>

        {/* Collaborative Text Space */}
        <CollaborativeText />
      </aside>

      {/* Mario Game Modal */}
      <MarioGame isOpen={isGameOpen} onClose={closeGame} />
    </>
  );
};

export default RightSidebar;