import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Cpu, Zap, Activity } from 'lucide-react';
import { motion } from 'motion/react';

import GlitchText from './components/GlitchText';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden selection:bg-neon-magenta selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/cyberpunk/1920/1080')] bg-cover bg-center opacity-10 grayscale contrast-150" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 scanlines opacity-30" />
        <div className="absolute inset-0 crt-flicker pointer-events-none" />
      </div>

      {/* Header / HUD */}
      <header className="w-full max-w-6xl flex justify-between items-end mb-8 z-10 border-b border-neon-cyan/20 pb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-neon-magenta mb-1">
            <Terminal size={16} />
            <span className="font-game text-[10px] tracking-widest">SYSTEM_OS // v0.4.2</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-game text-neon-cyan text-glitch tracking-tighter">
            <GlitchText text="NEON_SNAKE" />
          </h1>
        </div>

        <div className="hidden md:flex gap-8 items-center font-mono text-[10px] text-neon-cyan/60 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-neon-magenta" />
            <span>CPU_LOAD: 42%</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-neon-yellow" />
            <span>LATENCY: 12ms</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-neon-cyan" />
            <span>POWER: STABLE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 items-start">
        {/* Sidebar / Music Player */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <MusicPlayer />
          
          <div className="bg-black/40 backdrop-blur-md glitch-border p-4 font-mono text-[10px] text-neon-cyan/80 leading-relaxed">
            <div className="flex items-center gap-2 text-neon-magenta mb-2 border-b border-neon-magenta/20 pb-1">
              <Terminal size={12} />
              <span>LOG_STREAM</span>
            </div>
            <p className="mb-1">{`> INITIALIZING_NEURAL_LINK...`}</p>
            <p className="mb-1">{`> LOADING_SYNTH_WAVE_DATA...`}</p>
            <p className="mb-1 text-neon-yellow">{`> WARNING: GRID_INSTABILITY_DETECTED`}</p>
            <p className="mb-1">{`> SNAKE_PROTOCOL_ACTIVE`}</p>
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-3 bg-neon-cyan ml-1 align-middle"
            />
          </div>
        </motion.div>

        {/* Center / Game Area */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-8 flex justify-center"
        >
          <SnakeGame />
        </motion.div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="w-full max-w-6xl mt-8 pt-4 border-t border-neon-cyan/20 z-10 flex justify-between items-center font-mono text-[10px] text-neon-cyan/40">
        <div>© 2026 NEON_ARCHITECT // ALL_RIGHTS_RESERVED</div>
        <div className="flex gap-4">
          <span className="hover:text-neon-magenta cursor-pointer transition-colors">TERMINAL</span>
          <span className="hover:text-neon-magenta cursor-pointer transition-colors">NETWORK</span>
          <span className="hover:text-neon-magenta cursor-pointer transition-colors">VOID_LINK</span>
        </div>
      </footer>

      {/* Global Glitch Overlays */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neon-magenta/20 z-50 animate-[glitch-anim_5s_infinite]" />
      <div className="fixed bottom-0 right-0 w-1 h-full bg-neon-cyan/20 z-50 animate-[glitch-anim_7s_infinite_reverse]" />
    </div>
  );
}
