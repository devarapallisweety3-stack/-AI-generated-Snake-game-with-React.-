import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Point, GameState, Direction } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';
import { Trophy, RefreshCw, Play } from 'lucide-react';

import GlitchText from './GlitchText';

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameLoopRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameState('PLAYING');
    setFood(generateFood(INITIAL_SNAKE));
  };

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collisions
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameState('GAME_OVER');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const gameLoop = useCallback((timestamp: number) => {
    if (gameState === 'PLAYING') {
      if (timestamp - lastUpdateTimeRef.current > GAME_SPEED) {
        moveSnake();
        lastUpdateTimeRef.current = timestamp;
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState, moveSnake]);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, gameLoop]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-black/40 backdrop-blur-md glitch-border rounded-none relative overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      
      <div className="flex justify-between w-full font-game text-[10px] tracking-tighter text-neon-cyan">
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-neon-yellow" />
          <span>SCORE: {score.toString().padStart(4, '0')}</span>
        </div>
        <div>HI-SCORE: {highScore.toString().padStart(4, '0')}</div>
      </div>

      <div 
        className="relative bg-black/80 border border-neon-magenta/30 shadow-[0_0_20px_rgba(255,0,255,0.1)]"
        style={{ 
          width: GRID_SIZE * 20, 
          height: GRID_SIZE * 20,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {gameState === 'IDLE' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
            <button 
              onClick={resetGame}
              className="flex items-center gap-3 px-6 py-3 bg-neon-cyan text-black font-game text-xs hover:bg-white transition-colors group"
            >
              <Play size={16} fill="currentColor" />
              START_SESSION
            </button>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-center p-4">
            <h2 className="font-game text-neon-magenta text-xl mb-2 text-glitch">
              <GlitchText text="SYSTEM_FAILURE" />
            </h2>
            <p className="font-mono text-neon-cyan text-xs mb-6">CORE_DUMP: SCORE_{score}</p>
            <button 
              onClick={resetGame}
              className="flex items-center gap-3 px-6 py-3 border-2 border-neon-cyan text-neon-cyan font-game text-xs hover:bg-neon-cyan hover:text-black transition-all"
            >
              <RefreshCw size={16} />
              REBOOT_GAME
            </button>
          </div>
        )}

        {/* Snake */}
        {snake.map((segment, i) => (
          <div 
            key={i}
            className={`absolute w-[18px] h-[18px] ${i === 0 ? 'bg-neon-cyan shadow-[0_0_10px_#00ffff]' : 'bg-neon-cyan/60'}`}
            style={{ 
              left: segment.x * 20 + 1, 
              top: segment.y * 20 + 1,
              transition: 'all 0.05s linear'
            }}
          />
        ))}

        {/* Food */}
        <div 
          className="absolute w-[14px] h-[14px] bg-neon-magenta shadow-[0_0_15px_#ff00ff] rounded-full animate-pulse"
          style={{ 
            left: food.x * 20 + 3, 
            top: food.y * 20 + 3 
          }}
        />
      </div>

      <div className="text-[8px] font-game text-neon-magenta/50 flex gap-4">
        <span>[UP_DOWN_LEFT_RIGHT] TO NAVIGATE</span>
      </div>
    </div>
  );
}
