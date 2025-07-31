import React, { useState, useEffect, useRef, useCallback } from 'react';

const MarioGame = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const keysRef = useRef({});
  
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Game state
  const gameState = useRef({
    player: {
      x: 100,
      y: 300,
      width: 40,
      height: 40,
      velocityY: 0,
      grounded: false,
      color: '#FF6B6B'
    },
    obstacles: [],
    platforms: [],
    camera: { x: 0 },
    speed: 2,
    obstacleSpawnTimer: 0,
    platformSpawnTimer: 0
  });

  // Initialize game
  const initGame = useCallback(() => {
    const state = gameState.current;
    state.player.x = 100;
    state.player.y = 300;
    state.player.velocityY = 0;
    state.player.grounded = false;
    state.obstacles = [];
    state.platforms = [];
    state.camera.x = 0;
    state.speed = 2;
    state.obstacleSpawnTimer = 0;
    state.platformSpawnTimer = 0;

    // Create initial platforms
    for (let i = 0; i < 10; i++) {
      state.platforms.push({
        x: i * 200,
        y: 380,
        width: 150,
        height: 20,
        color: '#4ECDC4'
      });
    }

    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  }, []);

  const jump = useCallback(() => {
    const player = gameState.current.player;
    if (player.grounded && gameStarted && !gameOver) {
      player.velocityY = -12;
      player.grounded = false;
    }
  }, [gameStarted, gameOver]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current[e.code] = true;
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.code] = false;
    };

    const handleClick = () => {
      jump();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('click', handleClick);
    };
  }, [jump]);



  // Game physics and logic
  const updateGame = useCallback(() => {
    if (!gameStarted || gameOver) return;

    const state = gameState.current;
    const { player, obstacles, platforms } = state;

    // Update player physics
    player.velocityY += 0.5; // gravity
    player.y += player.velocityY;

    // Move camera with player
    state.camera.x += state.speed;
    
    // Check platform collisions
    player.grounded = false;
    platforms.forEach(platform => {
      if (player.x + player.width > platform.x &&
          player.x < platform.x + platform.width &&
          player.y + player.height > platform.y &&
          player.y + player.height < platform.y + platform.height + 10 &&
          player.velocityY > 0) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.grounded = true;
      }
    });

    // Check if player fell off screen
    if (player.y > 600) {
      setGameOver(true);
      return;
    }

    // Spawn obstacles
    state.obstacleSpawnTimer++;
    if (state.obstacleSpawnTimer > 120) {
      obstacles.push({
        x: state.camera.x + 800,
        y: 340,
        width: 30,
        height: 40,
        color: '#E74C3C'
      });
      state.obstacleSpawnTimer = 0;
    }

    // Spawn new platforms
    state.platformSpawnTimer++;
    if (state.platformSpawnTimer > 100) {
      const lastPlatform = platforms[platforms.length - 1];
      platforms.push({
        x: lastPlatform.x + 200 + Math.random() * 100,
        y: 380 - Math.random() * 100,
        width: 100 + Math.random() * 100,
        height: 20,
        color: '#4ECDC4'
      });
      state.platformSpawnTimer = 0;
    }

    // Check obstacle collisions
    obstacles.forEach((obstacle, index) => {
      if (player.x + player.width > obstacle.x &&
          player.x < obstacle.x + obstacle.width &&
          player.y + player.height > obstacle.y &&
          player.y < obstacle.y + obstacle.height) {
        setGameOver(true);
      }

      // Remove obstacles that are off screen
      if (obstacle.x < state.camera.x - 100) {
        obstacles.splice(index, 1);
        setScore(prev => prev + 10);
      }
    });

    // Remove platforms that are off screen
    platforms.forEach((platform, index) => {
      if (platform.x + platform.width < state.camera.x - 100) {
        platforms.splice(index, 1);
      }
    });

    // Increase speed over time
    state.speed += 0.001;
  }, [gameStarted, gameOver]);

  // Render game
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { player, obstacles, platforms, camera } = gameState.current;

    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw clouds
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 5; i++) {
      const x = (i * 200 - camera.x * 0.3) % (canvas.width + 100);
      ctx.beginPath();
      ctx.arc(x, 50 + i * 20, 30, 0, Math.PI * 2);
      ctx.arc(x + 25, 50 + i * 20, 35, 0, Math.PI * 2);
      ctx.arc(x + 50, 50 + i * 20, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw platforms
    platforms.forEach(platform => {
      const x = platform.x - camera.x;
      if (x > -platform.width && x < canvas.width) {
        ctx.fillStyle = platform.color;
        ctx.fillRect(x, platform.y, platform.width, platform.height);
        
        // Add platform texture
        ctx.fillStyle = '#45B7AA';
        for (let i = 0; i < platform.width; i += 20) {
          ctx.fillRect(x + i, platform.y, 2, platform.height);
        }
      }
    });

    // Draw obstacles
    obstacles.forEach(obstacle => {
      const x = obstacle.x - camera.x;
      if (x > -obstacle.width && x < canvas.width) {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(x, obstacle.y, obstacle.width, obstacle.height);
        
        // Add spikes on top
        ctx.fillStyle = '#C0392B';
        ctx.beginPath();
        for (let i = 0; i < obstacle.width; i += 10) {
          ctx.moveTo(x + i, obstacle.y);
          ctx.lineTo(x + i + 5, obstacle.y - 10);
          ctx.lineTo(x + i + 10, obstacle.y);
        }
        ctx.fill();
      }
    });

    // Draw player (Mario-style)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - camera.x, player.y, player.width, player.height);
    
    // Player details
    ctx.fillStyle = '#FF4757';
    ctx.fillRect(player.x - camera.x + 5, player.y + 5, 30, 10); // hat
    ctx.fillStyle = '#FFA502';
    ctx.fillRect(player.x - camera.x + 10, player.y + 15, 20, 8); // face
    ctx.fillStyle = '#5F27CD';
    ctx.fillRect(player.x - camera.x + 5, player.y + 23, 30, 17); // overalls
    
    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x - camera.x + 15, player.y + 18, 3, 3);
    ctx.fillRect(player.x - camera.x + 22, player.y + 18, 3, 3);

  }, []);

  // Game loop
  useEffect(() => {
    if (!isOpen) return;

    const gameLoop = () => {
      updateGame();
      render();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameStarted) {
      gameLoop();
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isOpen, gameStarted, updateGame, render]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 900;
      canvas.height = 600;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred background */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-lg"
        onClick={onClose}
      />
      
      {/* Game container - floating window */}
      <div className="relative w-full max-w-4xl h-full max-h-[700px] bg-gradient-to-b from-blue-400 to-blue-600 rounded-2xl shadow-2xl border-4 border-white/20 overflow-hidden">
        {/* Game canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer"
          onClick={(e) => e.stopPropagation()}
          width={900}
          height={600}
        />

        {/* Game UI */}
        <div className="absolute top-4 left-4 text-white z-10">
          <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg">
            <h2 className="text-xl font-bold mb-1">🍄 Mario Jump</h2>
            <p className="text-md">Score: {score}</p>
            {!gameStarted && !gameOver && (
              <button 
                onClick={initGame}
                className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors text-sm"
              >
                Start Game
              </button>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full z-10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Game Over screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
            <div className="bg-white p-8 rounded-xl text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
              <p className="text-xl mb-2">Final Score: {score}</p>
              <div className="space-y-3">
                <button 
                  onClick={initGame}
                  className="block w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Play Again
                </button>
                <button 
                  onClick={onClose}
                  className="block w-full px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Close Game
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 text-white z-10">
          <div className="bg-black/60 backdrop-blur-sm p-2 rounded-lg text-xs">
            <p>🎮 <strong>Controls:</strong></p>
            <p>• SPACE or CLICK to jump</p>
            <p>• Avoid red obstacles</p>
            <p>• Stay on platforms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarioGame;