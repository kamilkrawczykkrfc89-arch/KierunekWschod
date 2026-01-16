// Persistent Background Audio Engine
// Handles music playback across page loads using sessionStorage

class AudioManager {
    constructor() {
        this.track = 'assets/zorya.mp3';
        this.audio = new Audio(this.track);
        this.audio.loop = true;
        this.audio.volume = 0.05; // Extremely quiet background music (5%)
        this.isPlaying = false;

        // UI Elements
        this.btn = null;

        this.init();
    }

    init() {
        // 1. Create UI
        this.createControl();

        // 2. Load State
        this.loadState();

        // 3. Listeners
        window.addEventListener('beforeunload', () => this.saveState());

        // 4. Input Listeners (Unlock Audio Context if needed)
        // Try to unlock immediately on any interaction if autoplay was blocked
        ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => this.unlockAudio(), { once: true });
        });
    }

    createControl() {
        this.btn = document.createElement('button');
        this.btn.id = 'music-control';
        this.btn.className = 'music-control';
        this.btn.innerHTML = '🎵';
        this.btn.title = 'Toggle Music';

        // Add minimal inline styles for critical positioning (css handles rest)
        this.btn.style.position = 'fixed';
        this.btn.style.bottom = '20px';
        this.btn.style.right = '20px';
        this.btn.style.zIndex = '9999';
        this.btn.style.width = '50px';
        this.btn.style.height = '50px';
        this.btn.style.borderRadius = '50%';
        this.btn.style.border = 'none';
        this.btn.style.background = '#D4AF37';
        this.btn.style.color = '#1a1a1a';
        this.btn.style.fontSize = '24px';

        this.btn.onclick = () => this.toggle();

        document.body.appendChild(this.btn);
    }

    loadState() {
        const savedTime = sessionStorage.getItem('musicTime');
        const wasPlaying = sessionStorage.getItem('musicPlaying');

        if (savedTime) {
            this.audio.currentTime = parseFloat(savedTime);
        }

        // Auto-play by default if first visit (null), or if previously playing ('true')
        if (wasPlaying === 'true' || wasPlaying === null) {
            // Start at 0 volume and fade in
            this.audio.volume = 0;
            this.play().then(() => {
                this.fadeIn(2000); // 2 second fade in on load
            });
        }
    }

    saveState() {
        sessionStorage.setItem('musicTime', this.audio.currentTime);
        sessionStorage.setItem('musicPlaying', this.isPlaying);
    }

    // Returns a promise that resolves when playback starts (or fails)
    play() {
        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            return playPromise.then(() => {
                this.isPlaying = true;
                this.updateUI(true);
            }).catch(error => {
                console.log("Autoplay prevented (waiting for interaction):", error);
                // User wants it ON. Keep state as ON (UI shows speaker), 
                // even if browser held it back. 
                // unlockAudio() will catch the first click and start it.
                this.isPlaying = true;
                this.updateUI(true);
            });
        }
        return Promise.resolve();
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI(false);
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            // Instant play on manual toggle (or could fade, but usually users expect instant response)
            this.audio.volume = 0.05;
            this.play();
        }
    }

    updateUI(playing) {
        if (this.btn) {
            this.btn.innerHTML = playing ? '🔊' : '🔇';
            this.btn.style.opacity = playing ? '1' : '0.8';
        }
    }

    unlockAudio() {
        // Only try to resume if we expect it to be playing but it's not
        // or if user wants music.
        // This is a gentle 'ping' to the audio engine on first interaction
        if (this.isPlaying && this.audio.paused) {
            this.audio.volume = 0;
            this.play().then(() => this.fadeIn(2000));
        }
    }

    fadeIn(duration) {
        const targetVolume = 0.05;
        const stepTime = 50;
        const steps = duration / stepTime;
        const volStep = targetVolume / steps;

        // Clear any existing fade
        if (this.fadeInterval) clearInterval(this.fadeInterval);

        this.fadeInterval = setInterval(() => {
            if (this.audio.volume < targetVolume) {
                // minor protection against float math
                this.audio.volume = Math.min(targetVolume, this.audio.volume + volStep);
            } else {
                clearInterval(this.fadeInterval);
            }
        }, stepTime);
    }

    fadeOut(duration) {
        const stepTime = 50;
        const steps = duration / stepTime;
        const volStep = this.audio.volume / steps;

        // Clear any existing fade
        if (this.fadeInterval) clearInterval(this.fadeInterval);

        return new Promise(resolve => {
            this.fadeInterval = setInterval(() => {
                if (this.audio.volume > 0) {
                    this.audio.volume = Math.max(0, this.audio.volume - volStep);
                } else {
                    clearInterval(this.fadeInterval);
                    this.audio.pause(); // actually pause when silent
                    resolve();
                }
            }, stepTime);
        });
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    window.audioManager = new AudioManager();
});
