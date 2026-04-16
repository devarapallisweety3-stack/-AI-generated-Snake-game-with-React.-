import { Track } from './types';

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'SYNTH_VOID_01',
    artist: 'NEON_ARCHITECT',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/synth1/400/400'
  },
  {
    id: '2',
    title: 'CYBER_PULSE_X',
    artist: 'GLITCH_GHOST',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/cyber2/400/400'
  },
  {
    id: '3',
    title: 'DATA_STREAM_ERROR',
    artist: 'NULL_POINTER',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/data3/400/400'
  }
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 }
];
export const INITIAL_DIRECTION = 'UP';
export const GAME_SPEED = 100;
