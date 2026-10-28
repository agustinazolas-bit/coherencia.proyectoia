/**
 * Audio synthesis engine for realistic physical paper rustle,
 * push-pin tacks, and document handling sound effects using Web Audio API.
 * 100% offline, lightweight, and zero external network dependencies.
 */

let audioCtx: AudioContext | null = null;
const SOUND_STORAGE_KEY = 'coherencia_paper_sound_enabled';

// Initialize or resume AudioContext safely after user interaction
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx && AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// Sound state (active by default, zero external dependencies)
export function isSoundEnabled(): boolean {
  return true;
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, enabled ? 'true' : 'false');
  } catch {
    // ignore storage restrictions
  }
}

export function toggleSound(): boolean {
  const current = isSoundEnabled();
  const next = !current;
  setSoundEnabled(next);
  if (next) {
    // Play a gentle feedback pin click on enable
    playPinClick(0.6);
  }
  return next;
}

/**
 * Generate a white noise buffer
 */
function createNoiseBuffer(ctx: AudioContext, durationSeconds: number): AudioBuffer {
  const bufferSize = Math.floor(ctx.sampleRate * durationSeconds);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;

  // Pinkish/textured noise generation for natural paper friction
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Simple 1-pole filter to soften the harshness of raw white noise
    lastOut = (lastOut * 0.7) + (white * 0.3);
    data[i] = lastOut;
  }
  return buffer;
}

/**
 * Play a realistic paper rustle / crumple / dossier flick sound
 */
export function playPaperRustle(volume = 0.35): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.22;
    const noiseBuffer = createNoiseBuffer(ctx, duration);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Bandpass filter to shape noise like paper texture
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400 + Math.random() * 600, now);
    filter.Q.setValueAtTime(1.8, now);

    // Dynamic frequency modulation to simulate paper folds/crinkles
    filter.frequency.exponentialRampToValueAtTime(2800, now + 0.06);
    filter.frequency.exponentialRampToValueAtTime(900, now + duration);

    // Gain envelope with rapid micro-flutter
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(volume * 0.7, now + 0.015);
    // Micro flutter:
    gainNode.gain.setValueAtTime(volume * 0.9, now + 0.04);
    gainNode.gain.setValueAtTime(volume * 0.4, now + 0.09);
    gainNode.gain.setValueAtTime(volume * 0.75, now + 0.13);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + duration + 0.02);
  } catch (err) {
    console.debug('Audio playback skipped:', err);
  }
}

/**
 * Play a gentle paper slide / turn sound (smooth swoosh)
 */
export function playPaperSlide(volume = 0.28): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.16;
    const noiseBuffer = createNoiseBuffer(ctx, duration);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + duration);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(volume * 0.6, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + duration + 0.01);
  } catch (err) {
    console.debug('Audio playback skipped:', err);
  }
}

/**
 * Play a crisp push-pin tack / pin insertion sound (metallic tap + wood/cork dampening)
 */
export function playPinClick(volume = 0.45): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. High transient metal pin strike
    const oscHigh = ctx.createOscillator();
    const gainHigh = ctx.createGain();
    oscHigh.type = 'triangle';
    oscHigh.frequency.setValueAtTime(2600 + Math.random() * 400, now);
    oscHigh.frequency.exponentialRampToValueAtTime(800, now + 0.04);

    gainHigh.gain.setValueAtTime(volume * 0.7, now);
    gainHigh.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    oscHigh.connect(gainHigh);
    gainHigh.connect(ctx.destination);

    // 2. Cork/board low thud
    const oscThud = ctx.createOscillator();
    const gainThud = ctx.createGain();
    oscThud.type = 'sine';
    oscThud.frequency.setValueAtTime(280, now);
    oscThud.frequency.exponentialRampToValueAtTime(110, now + 0.07);

    gainThud.gain.setValueAtTime(volume * 0.5, now);
    gainThud.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    oscThud.connect(gainThud);
    gainThud.connect(ctx.destination);

    oscHigh.start(now);
    oscHigh.stop(now + 0.05);

    oscThud.start(now);
    oscThud.stop(now + 0.08);
  } catch (err) {
    console.debug('Audio playback skipped:', err);
  }
}
