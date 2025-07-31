import React, { useState } from 'react';
import MarioGame from './MarioGame';

const RightSidebar = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);

  const openGame = () => setIsGameOpen(true);
  const closeGame = () => setIsGameOpen(false);

  return (
    <>
      <aside className="w-full xl:w-96 space-y-6">
        {/* Mario Game Launcher */}
        <div className="sticky top-8">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-lg border border-red-400 text-white overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 gap-1 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-sm"></div>
                ))}
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">🍄 Mario Jump</h3>
                <div className="text-2xl">🎮</div>
              </div>
              
              <p className="text-red-100 mb-4 text-sm">
                Classic side-scrolling platformer game! Jump over obstacles and collect points.
              </p>
              
              <button
                onClick={openGame}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-red-800 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🚀 Launch Game
              </button>
            </div>
          </div>
        </div>
        
        {/* Game Features */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-black/10">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Game Features</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>🏃 Side-scrolling action</p>
            <p>🦘 Smooth jump physics</p>
            <p>🏆 Score system</p>
            <p>🎯 Obstacle avoidance</p>
            <p>📱 Click/Space to jump</p>
            <p>🌟 Retro Mario style</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">How to Play:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click "Launch Game" to start</li>
            <li>• Press SPACE or click to jump</li>
            <li>• Avoid red spiky obstacles</li>
            <li>• Stay on blue platforms</li>
            <li>• Survive as long as possible!</li>
          </ul>
        </div>
      </aside>

      {/* Mario Game Modal */}
      <MarioGame isOpen={isGameOpen} onClose={closeGame} />
    </>
  );
};

export default RightSidebar;