import React, { useState, useRef, useEffect } from 'react';
import { DUMMY_TRACKS } from '../constants';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="w-full max-w-md bg-black/60 backdrop-blur-xl glitch-border p-6 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
      
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      <div className="flex gap-4 items-center">
        <div className="relative w-24 h-24 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentTrack.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover border border-neon-cyan/50"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          {isPlaying && (
            <div className="absolute -bottom-2 -right-2 bg-neon-magenta p-1 rounded-full shadow-[0_0_10px_#ff00ff]">
              <Music size={12} className="text-black animate-bounce" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-game text-neon-magenta mb-1 tracking-widest">NOW_PLAYING</div>
          <h3 className="text-neon-cyan font-mono font-bold truncate text-lg text-glitch">{currentTrack.title}</h3>
          <p className="text-neon-cyan/60 font-mono text-xs truncate">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-1 bg-white/10 w-full relative overflow-hidden">
          <motion.div 
            className="h-full bg-neon-cyan shadow-[0_0_10px_#00ffff]"
            style={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-neon-cyan/40">
          <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '00:00'}</span>
          <span>{audioRef.current ? formatTime(audioRef.current.duration) : '00:00'}</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-8">
        <button onClick={handlePrev} className="text-neon-cyan hover:text-white transition-colors">
          <SkipBack size={24} fill="currentColor" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full border-2 border-neon-magenta flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-black transition-all shadow-[0_0_15px_rgba(255,0,255,0.3)]"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>

        <button onClick={handleNext} className="text-neon-cyan hover:text-white transition-colors">
          <SkipForward size={24} fill="currentColor" />
        </button>
      </div>

      <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
        <Volume2 size={14} className="text-neon-cyan" />
        <div className="flex-1 h-[2px] bg-white/10">
          <div className="h-full bg-neon-cyan w-2/3" />
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
