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
      velocityX: 0,
      grounded: false,
      color: '#FF6B6B',
      maxSpeed: 5
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
    state.player.y = 340; // Start on ground level (platform y=380 - player height=40)
    state.player.velocityY = 0;
    state.player.velocityX = 0;
    state.player.grounded = true; // Start grounded
    state.obstacles = [];
    state.platforms = [];
    state.camera.x = 0;
    state.speed = 2;
    state.obstacleSpawnTimer = 0;
    state.platformSpawnTimer = 0;

    // Create initial platforms with safe heights
    // First platform at starting position - extra wide and safe
    state.platforms.push({
      x: 0,
      y: 380,
      width: 300, // Wider starting platform
      height: 20,
      color: '#4ECDC4'
    });
    
    // Additional platforms with varied but safe heights
    for (let i = 1; i < 20; i++) {
      state.platforms.push({
        x: i * 150 + Math.random() * 30, // Closer spacing for easier jumping
        y: 380 - Math.random() * 40, // Smaller height variation (340-380)
        width: 120 + Math.random() * 60, // Slightly smaller variation
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
      player.velocityY = -12; // Slightly higher jump
      player.grounded = false;
    }
  }, [gameStarted, gameOver]);

  // Handle keyboard events - only when game is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Prevent any key from affecting the page when game is open
      e.preventDefault();
      e.stopPropagation();
      
      keysRef.current[e.code] = true;
      
      // Handle jump controls
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        jump();
      }
      
      // Handle movement controls (handled in updateGame for smooth movement)
      
      // Handle game start/restart
      if (e.code === 'Enter' && (!gameStarted || gameOver)) {
        initGame();
      }
      
      // Handle game close
      if (e.code === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e) => {
      if (!isOpen) return;
      e.preventDefault();
      e.stopPropagation();
      keysRef.current[e.code] = false;
    };

    // Add event listeners with capture to catch events before they bubble
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keyup', handleKeyUp, true);
    };
  }, [isOpen, jump, gameStarted, gameOver, initGame, onClose]);



  // Game physics and logic
  const updateGame = useCallback(() => {
    if (!gameStarted || gameOver) return;

    const state = gameState.current;
    const { player, obstacles, platforms } = state;
    const keys = keysRef.current;

    // Handle horizontal movement
    player.velocityX = 0;
    if (keys['ArrowLeft'] || keys['KeyA']) {
      player.velocityX = -player.maxSpeed;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
      player.velocityX = player.maxSpeed;
    }

    // Update player physics
    player.velocityY += 0.4; // Slightly reduced gravity for easier jumping
    player.y += player.velocityY;
    player.x += player.velocityX;

    // Prevent player from going too far back
    if (player.x < state.camera.x + 50) {
      player.x = state.camera.x + 50;
    }

    // Update camera to follow player (with some forward momentum)
    const targetCameraX = player.x - 200; // Keep player slightly left of center
    state.camera.x += (targetCameraX - state.camera.x) * 0.1 + state.speed * 0.5;
    
    // Check platform collisions
    player.grounded = false;
    platforms.forEach((platform, index) => {
      // Horizontal overlap check
      const horizontalOverlap = player.x + player.width > platform.x && 
                                player.x < platform.x + platform.width;
      
      // Vertical collision check - player landing on platform
      const playerBottom = player.y + player.height;
      const platformTop = platform.y;
      
      if (horizontalOverlap &&
          playerBottom >= platformTop &&
          playerBottom <= platformTop + 25 && // More forgiving collision
          player.velocityY >= 0) {
        player.y = platformTop - player.height;
        player.velocityY = 0;
        player.grounded = true;
        
        // Debug log for successful platform landing
        // if (Math.abs(player.x - 100) > 50) { // Don't spam logs at start
        //   console.log(`Player landed on platform ${index} at x=${platform.x}, y=${platform.y}`);
        // }
      }
    });

    // Safety check: Add emergency platform if player is falling with no platforms nearby
    if (player.y > 500 && !player.grounded) {
      const nearbyPlatforms = platforms.filter(p => 
        p.x > player.x - 100 && p.x < player.x + 200 && p.y > player.y
      );
      
      if (nearbyPlatforms.length === 0) {
        // console.log('Emergency platform created for player safety');
        platforms.push({
          x: player.x + 50,
          y: 450,
          width: 150,
          height: 20,
          color: '#FFD700' // Gold color for emergency platform
        });
      }
    }

    // Check if player fell off screen
    if (player.y > 600) {
                      // Game over: Player fell off screen
      setGameOver(true);
      return;
    }

    // Spawn obstacles based on camera position (on platforms) - with delay
    state.obstacleSpawnTimer++;
    if (state.obstacleSpawnTimer > 200 && state.camera.x > 200) { // Faster spawn rate
      // Find a platform to place obstacle on
      const farPlatforms = platforms.filter(p => p.x > state.camera.x + 600);
      if (farPlatforms.length > 0) {
        const targetPlatform = farPlatforms[Math.floor(Math.random() * farPlatforms.length)];
        
        // Random obstacle types
        const obstacleTypes = [
          { type: 'spike', width: 30, height: 40, color: '#E74C3C' },
          { type: 'cactus', width: 25, height: 45, color: '#27AE60' },
          { type: 'fire', width: 35, height: 35, color: '#FF6B35' },
          { type: 'rock', width: 40, height: 30, color: '#7F8C8D' },
          { type: 'gem', width: 20, height: 25, color: '#9B59B6' }
        ];
        
        const obstacleType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        
      obstacles.push({
          x: targetPlatform.x + Math.random() * (targetPlatform.width - obstacleType.width),
          y: targetPlatform.y - obstacleType.height,
          width: obstacleType.width,
          height: obstacleType.height,
          color: obstacleType.color,
          type: obstacleType.type
        });
      }
      state.obstacleSpawnTimer = 0;
    }

    // Spawn new platforms based on progress
    state.platformSpawnTimer++;
    if (state.platformSpawnTimer > 60) { // Spawn more frequently
      const lastPlatform = platforms[platforms.length - 1];
      if (lastPlatform && lastPlatform.x < state.camera.x + 800) {
        // Ensure platforms are reachable by limiting gap and height difference
        const maxGap = 120; // Maximum horizontal gap
        const maxHeightDiff = 80; // Maximum height difference
        
        const newX = lastPlatform.x + 80 + Math.random() * maxGap;
        const heightVariation = (Math.random() - 0.5) * maxHeightDiff;
        const newY = Math.max(300, Math.min(380, lastPlatform.y + heightVariation));
        
      platforms.push({
          x: newX,
          y: newY,
          width: 100 + Math.random() * 80,
        height: 20,
        color: '#4ECDC4'
      });
        
        // Debug: console.log(`Spawned platform at x=${newX}, y=${newY}, gap=${newX - lastPlatform.x}`);
      }
      state.platformSpawnTimer = 0;
    }

    // Check obstacle collisions
    obstacles.forEach((obstacle, index) => {
      if (player.x + player.width > obstacle.x &&
          player.x < obstacle.x + obstacle.width &&
          player.y + player.height > obstacle.y &&
          player.y < obstacle.y + obstacle.height) {
        // console.log('Game over: Hit obstacle at', obstacle.x, obstacle.y);
        setGameOver(true);
      }

      // Remove obstacles that are off screen
      if (obstacle.x < state.camera.x - 100) {
        obstacles.splice(index, 1);
        setScore(prev => prev + 10);
      }
    });

    // Update score based on distance traveled
    const distanceScore = Math.floor(player.x / 10);
    if (distanceScore > score) {
      setScore(distanceScore);
    }

    // Remove platforms that are off screen
    platforms.forEach((platform, index) => {
      if (platform.x + platform.width < state.camera.x - 100) {
        platforms.splice(index, 1);
      }
    });

    // Increase speed over time
    state.speed += 0.001;
  }, [gameStarted, gameOver, score]);

  // Render game with optimizations
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { player, obstacles, platforms, camera } = gameState.current;

    // Performance optimization: only clear visible area
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Sky gradient for better visuals
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.7, '#98D8E8');
    gradient.addColorStop(1, '#B8E0F0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw clouds with shadows for depth
    for (let i = 0; i < 5; i++) {
      const x = (i * 200 - camera.x * 0.3) % (canvas.width + 100);
      const y = 50 + i * 20;
      
      // Cloud shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.arc(x + 2, y + 2, 30, 0, Math.PI * 2);
      ctx.arc(x + 27, y + 2, 35, 0, Math.PI * 2);
      ctx.arc(x + 52, y + 2, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Cloud
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.arc(x + 25, y, 35, 0, Math.PI * 2);
      ctx.arc(x + 50, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw platforms with optimized culling and enhanced visuals
    const visiblePlatforms = platforms.filter(platform => {
      const x = platform.x - camera.x;
      return x > -platform.width - 50 && x < canvas.width + 50;
    });
    
    visiblePlatforms.forEach((platform, index) => {
      const x = platform.x - camera.x;
      
      // Platform shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(x + 3, platform.y + 3, platform.width, platform.height);
      
      // Platform base
      ctx.fillStyle = platform.color === '#FFD700' ? '#FFD700' : platform.color; // Gold for emergency platforms
        ctx.fillRect(x, platform.y, platform.width, platform.height);
        
      // Platform texture and highlights
      if (platform.color !== '#FFD700') {
        // Normal platform texture
        ctx.fillStyle = '#45B7AA';
        for (let i = 0; i < platform.width; i += 20) {
          ctx.fillRect(x + i, platform.y, 2, platform.height);
        }
        
        // Top highlight
        ctx.fillStyle = '#5DDFCE';
        ctx.fillRect(x, platform.y, platform.width, 3);
      } else {
        // Emergency platform special effects
        ctx.fillStyle = '#FFF700';
        ctx.fillRect(x, platform.y, platform.width, 3);
        for (let i = 0; i < platform.width; i += 15) {
          ctx.fillRect(x + i, platform.y + 5, 2, platform.height - 5);
        }
      }
    });

    // Draw obstacles with variety and optimized culling
    const visibleObstacles = obstacles.filter(obstacle => {
      const x = obstacle.x - camera.x;
      return x > -obstacle.width - 20 && x < canvas.width + 20;
    });
    
    visibleObstacles.forEach(obstacle => {
      const x = obstacle.x - camera.x;
      
      // Obstacle shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(x + 2, obstacle.y + 2, obstacle.width, obstacle.height);
      
        ctx.fillStyle = obstacle.color;
      
      switch (obstacle.type) {
          case 'spike':
            // Sharp spikes
        ctx.fillRect(x, obstacle.y, obstacle.width, obstacle.height);
        ctx.fillStyle = '#C0392B';
        ctx.beginPath();
            for (let i = 0; i < obstacle.width; i += 8) {
          ctx.moveTo(x + i, obstacle.y);
              ctx.lineTo(x + i + 4, obstacle.y - 12);
              ctx.lineTo(x + i + 8, obstacle.y);
            }
            ctx.fill();
            break;
            
          case 'cactus':
            // Cactus body
            ctx.fillRect(x + 8, obstacle.y, obstacle.width - 16, obstacle.height);
            // Cactus arms
            ctx.fillRect(x, obstacle.y + 15, 12, 8);
            ctx.fillRect(x + obstacle.width - 12, obstacle.y + 10, 12, 8);
            // Spines
            ctx.fillStyle = '#1E8449';
            for (let i = 0; i < obstacle.height; i += 8) {
              ctx.fillRect(x + 6, obstacle.y + i, 2, 2);
              ctx.fillRect(x + obstacle.width - 8, obstacle.y + i, 2, 2);
            }
            break;
            
          case 'fire':
            // Fire base
            ctx.fillRect(x + 5, obstacle.y + 20, obstacle.width - 10, 15);
            
            // Animated fire flames
            ctx.fillStyle = '#FF4757';
            ctx.beginPath();
            const time = Date.now() * 0.01;
            for (let i = 0; i < obstacle.width; i += 6) {
              const flameHeight = 8 + Math.sin(time + i * 0.5) * 4;
              ctx.moveTo(x + i, obstacle.y + 20);
              ctx.lineTo(x + i + 3, obstacle.y + 20 - flameHeight);
              ctx.lineTo(x + i + 6, obstacle.y + 20);
            }
            ctx.fill();
            
            // Inner fire with glow
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(x + 8, obstacle.y + 22, obstacle.width - 16, 8);
            
            // Fire glow effect
            ctx.fillStyle = 'rgba(255, 107, 53, 0.3)';
            ctx.fillRect(x, obstacle.y + 15, obstacle.width, 25);
            break;
            
          case 'rock':
            // Rock body
            ctx.fillRect(x, obstacle.y, obstacle.width, obstacle.height);
            // Rock texture
            ctx.fillStyle = '#566573';
            ctx.fillRect(x + 5, obstacle.y + 5, 8, 8);
            ctx.fillRect(x + 20, obstacle.y + 8, 6, 6);
            ctx.fillRect(x + 10, obstacle.y + 18, 12, 8);
            break;
            
          case 'gem':
            // Gem shape
            ctx.fillStyle = obstacle.color;
            ctx.beginPath();
            ctx.moveTo(x + obstacle.width/2, obstacle.y);
            ctx.lineTo(x + obstacle.width, obstacle.y + obstacle.height/3);
            ctx.lineTo(x + obstacle.width * 0.8, obstacle.y + obstacle.height);
            ctx.lineTo(x + obstacle.width * 0.2, obstacle.y + obstacle.height);
            ctx.lineTo(x, obstacle.y + obstacle.height/3);
            ctx.closePath();
            ctx.fill();
            
            // Gem shine with animation
            const gemTime = Date.now() * 0.005;
            const shine = 0.5 + Math.sin(gemTime) * 0.3;
            ctx.fillStyle = `rgba(232, 218, 239, ${shine})`;
            ctx.fillRect(x + 4, obstacle.y + 5, 4, 8);
            
            // Sparkle effects
            if (Math.sin(gemTime * 2) > 0.7) {
              ctx.fillStyle = '#FFF';
              ctx.fillRect(x + 2, obstacle.y + 3, 2, 2);
              ctx.fillRect(x + obstacle.width - 4, obstacle.y + 8, 2, 2);
              ctx.fillRect(x + obstacle.width/2, obstacle.y + obstacle.height - 3, 2, 2);
            }
            break;
            
          default:
            // Default rectangle
            ctx.fillRect(x, obstacle.y, obstacle.width, obstacle.height);
        }
    });

    // Draw player (Enhanced Mario-style)
    const playerScreenX = player.x - camera.x;
    
    // Player shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(playerScreenX + 2, player.y + 2, player.width, player.height);
    
    // Player body
    ctx.fillStyle = player.color;
    ctx.fillRect(playerScreenX, player.y, player.width, player.height);
    
    // Player details with better colors
    ctx.fillStyle = '#FF4757';
    ctx.fillRect(playerScreenX + 5, player.y + 5, 30, 10); // hat
    
    // Hat emblem
    ctx.fillStyle = '#FFF';
    ctx.fillRect(playerScreenX + 17, player.y + 7, 6, 6);
    ctx.fillStyle = '#FF4757';
    ctx.fillRect(playerScreenX + 19, player.y + 9, 2, 2);
    
    ctx.fillStyle = '#FFA502';
    ctx.fillRect(playerScreenX + 10, player.y + 15, 20, 8); // face
    ctx.fillStyle = '#5F27CD';
    ctx.fillRect(playerScreenX + 5, player.y + 23, 30, 17); // overalls
    
    // Overalls buttons
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(playerScreenX + 12, player.y + 26, 3, 3);
    ctx.fillRect(playerScreenX + 25, player.y + 26, 3, 3);
    
    // Eyes (facing direction based on movement)
    ctx.fillStyle = '#000';
    const eyeOffset = player.velocityX > 0 ? 2 : player.velocityX < 0 ? -2 : 0;
    ctx.fillRect(playerScreenX + 15 + eyeOffset, player.y + 18, 3, 3);
    ctx.fillRect(playerScreenX + 22 + eyeOffset, player.y + 18, 3, 3);
    
    // Nose
    ctx.fillStyle = '#E67E22';
    ctx.fillRect(playerScreenX + 18, player.y + 20, 4, 2);
    
    // Movement effects
    if (Math.abs(player.velocityX) > 0) {
      // Speed lines
      ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
      for (let i = 0; i < 3; i++) {
        const lineX = playerScreenX - (player.velocityX > 0 ? 10 + i * 5 : -5 - i * 5);
        ctx.fillRect(lineX, player.y + 10 + i * 8, 8, 2);
      }
    }
    
    // Jump indicator
    if (!player.grounded) {
      ctx.fillStyle = 'rgba(135, 206, 235, 0.6)';
      ctx.beginPath();
      ctx.arc(playerScreenX + 20, player.y - 8, 6, 0, Math.PI * 2);
      ctx.fill();
    }

  }, []);

  // Optimized game loop with FPS targeting
  useEffect(() => {
    if (!isOpen) return;

    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const gameLoop = (currentTime) => {
      if (currentTime - lastTime >= frameTime) {
        updateGame();
        render();
        lastTime = currentTime;
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameStarted) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
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
      <div className="relative w-full max-w-4xl h-full max-h-[700px] bg-gradient-to-b from-blue-400 to-blue-600 rounded-2xl shadow-2xl border-4 border-yellow-300/50 overflow-hidden">
        {/* Game canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            jump();
          }}
          width={900}
          height={600}
        />

        {/* Game UI */}
        <div className="absolute top-4 left-4 text-white z-10">
          <div className="bg-black/70 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <h2 className="text-xl font-bold mb-2">🍄 Mario Jump</h2>
            <p className="text-lg font-semibold">Distance: {score}m</p>
            <p className="text-sm text-gray-300">Performance: Optimized</p>
            {!gameStarted && !gameOver && (
              <div className="mt-3 space-y-2">
              <button 
                onClick={initGame}
                  className="block w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
              >
                  Start Game (ENTER)
              </button>
                <div className="text-yellow-300 text-sm font-medium">
                  <p>🎮 Controls Ready!</p>
                  <p>A/← = Move Left</p>
                  <p>D/→ = Move Right</p>
                  <p>SPACE/W/↑ = Jump</p>
                  <p>CLICK = Jump</p>
                </div>
              </div>
            )}
            {gameStarted && !gameOver && (
              <div className="mt-2 text-yellow-300 text-sm font-medium">
                <p>🎮 A/D: Move | SPACE: Jump!</p>
              </div>
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
            <div className="bg-white p-8 rounded-xl text-center shadow-2xl max-w-md">
              <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
              <p className="text-xl mb-4">Distance Traveled: {score}m</p>
              <div className="text-sm text-gray-600 mb-4">
                <p>🎮 <strong>Controls:</strong></p>
                <p>ENTER = Play Again | ESC = Close</p>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={initGame}
                  className="block w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Play Again (ENTER)
                </button>
                <button 
                  onClick={onClose}
                  className="block w-full px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Close Game (ESC)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 text-white z-10">
          <div className="bg-black/70 backdrop-blur-sm p-3 rounded-lg border border-white/20">
            <p className="text-sm font-bold mb-1">🎮 Game Instructions:</p>
            <div className="text-xs space-y-1">
              <p>• <span className="text-yellow-300 font-semibold">A/D or ←/→</span> to move left/right</p>
              <p>• <span className="text-yellow-300 font-semibold">SPACE/W/↑</span> or <span className="text-yellow-300 font-semibold">CLICK</span> to jump</p>
              <p>• <span className="text-red-300 font-semibold">Avoid:</span> Spikes, Cactus, Fire, Rocks</p>
              <p>• <span className="text-purple-300 font-semibold">Purple gems</span> are deadly too!</p>
              <p>• <span className="text-blue-300 font-semibold">Stay on blue platforms</span></p>
              <p>• <span className="text-yellow-300 font-semibold">Gold platforms</span> = emergency help</p>
              <p>• <span className="text-gray-300 font-semibold">ESC</span> to close game</p>
            </div>
          </div>
        </div>

        {/* Game Ready Indicator */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-green-500/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-yellow-300 shadow-2xl text-center">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">🎮 GAME READY!</h3>
                <p className="text-lg mb-3">Controls are active</p>
                <div className="text-sm space-y-1">
                  <p><span className="font-bold">A/D or ←/→</span> = Move</p>
                  <p><span className="font-bold">SPACE/W/↑</span> = Jump</p>
                  <p><span className="font-bold">ENTER</span> = Start Game</p>
                  <p><span className="font-bold">ESC</span> = Close</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarioGame;