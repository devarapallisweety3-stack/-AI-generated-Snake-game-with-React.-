import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const newText = text.split('').map(char => {
          if (Math.random() > 0.95) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        }).join('');
        setGlitchedText(newText);
        
        setTimeout(() => setGlitchedText(text), 100);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`${className} relative inline-block`}>
      {glitchedText}
    </span>
  );
}
