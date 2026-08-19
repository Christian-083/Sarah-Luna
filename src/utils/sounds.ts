// src/utils/sounds.ts
import bgMusicFile from '../assets/descendants.mp3';

let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// --- Background Music Manager ---
let bgAudioInstance: HTMLAudioElement | null = null;

export const initBackgroundMusic = () => {
  if (!bgAudioInstance) {
    bgAudioInstance = new Audio(bgMusicFile);
    bgAudioInstance.loop = true;
    bgAudioInstance.volume = 1.0;
  }
  return bgAudioInstance;
};

export const playBackgroundMusic = async () => {
  try {
    const audio = initBackgroundMusic();
    await audio.play();
    return true;
  } catch (e) {
    console.warn('Autoplay prevented or audio error:', e);
    return false;
  }
};

export const pauseBackgroundMusic = () => {
  if (bgAudioInstance) {
    bgAudioInstance.pause();
  }
};

export const toggleBackgroundMusic = async () => {
  try {
    const audio = initBackgroundMusic();
    if (audio.paused) {
      await audio.play();
      return true;
    } else {
      audio.pause();
      return false;
    }
  } catch (e) {
    console.warn('Audio toggle failed:', e);
    return false;
  }
};

// --- Sound Effects ---
export const playClickSound = () => {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
};

export const playPopSound = () => {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
};

export const playPaperSound = () => {
  try {
    const ctx = getContext();
    const bufferSize = ctx.sampleRate * 0.3; // 0.3 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(ctx.currentTime);
  } catch (e) {}
};

export const playSuccessSound = () => {
  try {
    const ctx = getContext();
    const playNote = (freq: number, startTime: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
      
      osc.start(startTime);
      osc.stop(startTime + 0.5);
    };
    
    playNote(523.25, ctx.currentTime); // C5
    playNote(659.25, ctx.currentTime + 0.1); // E5
    playNote(783.99, ctx.currentTime + 0.2); // G5
    playNote(1046.50, ctx.currentTime + 0.3); // C6
  } catch (e) {}
};

export const playSadSound = () => {
  try {
    const ctx = getContext();
    const playNote = (freq: number, startTime: number, type: OscillatorType = 'sawtooth') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = type;
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.6);
      
      osc.start(startTime);
      osc.stop(startTime + 0.6);
    };
    
    playNote(349.23, ctx.currentTime, 'sawtooth'); // F4
    playNote(329.63, ctx.currentTime + 0.3, 'sawtooth'); // E4
    playNote(311.13, ctx.currentTime + 0.6, 'sawtooth'); // Eb4
    playNote(293.66, ctx.currentTime + 0.9, 'sawtooth'); // D4
  } catch (e) {}
};
