/**
 * Rakesh weds Yashika — Wedding Invitation Scripts
 * Features:
 * - Real-time Countdown Timer with subtle pulse
 * - Intersection Observer for 3D card unfold and scroll reveals
 * - Subtle hero parallax scroll effect
 * - Festive floating flower petals canvas animation
 * - Traditional Indian ambient flute/shehnai tone generator (Web Audio API)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initScrollAnimations();
  initPetalsAnimation();
  initAmbientMusic();
  initHeroParallax();
});

/* ==========================================================================
   1. REAL-TIME COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const targetDateStr = '2026-11-05T08:30:00+05:30';
  const targetDate = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('daysValue');
  const hoursEl = document.getElementById('hoursValue');
  const minutesEl = document.getElementById('minutesValue');
  const secondsEl = document.getElementById('secondsValue');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  let prevSeconds = null;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);

    if (seconds !== prevSeconds) {
      secondsEl.classList.remove('tick-pop');
      void secondsEl.offsetWidth; // Force DOM reflow
      secondsEl.classList.add('tick-pop');
      prevSeconds = seconds;
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. SCROLL REVEALS & 3D INVITATION UNFOLD
   ========================================================================== */
function initScrollAnimations() {
  // Elements with delayed entrance in hero
  const delayedElements = document.querySelectorAll('[data-delay]');
  delayedElements.forEach((el) => {
    const delay = el.getAttribute('data-delay');
    if (delay) {
      el.style.animationDelay = `${delay}ms`;
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach((el) => observer.observe(el));

  // 3D Invitation Card Unfold Observer
  const invitationCard = document.getElementById('invitationCard');
  if (invitationCard) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          invitationCard.classList.add('unfolded');
        }
      });
    }, { threshold: 0.2 });

    cardObserver.observe(invitationCard);
  }
}

/* ==========================================================================
   3. HERO PARALLAX SCROLL EFFECT
   ========================================================================== */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const ganesha = document.querySelector('.ganesha-wrapper');

  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < hero.offsetHeight) {
      if (ganesha) {
        ganesha.style.transform = `translateY(${scrolled * 0.18}px)`;
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   4. FESTIVE FALLING PETALS CANVAS
   ========================================================================== */
function initPetalsAnimation() {
  const canvas = document.getElementById('petalsCanvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = 28;
  const petals = [];

  const colors = [
    'rgba(218, 58, 85, 0.75)',   // Rose Red / Crimson
    'rgba(235, 120, 30, 0.75)',  // Marigold Orange
    'rgba(245, 190, 60, 0.75)',  // Turmeric / Gold
    'rgba(255, 182, 193, 0.7)'   // Soft Lotus Pink
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 8;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 1 - 0.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.flip = Math.random();
      this.flipSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.8 + this.speedX;
      this.rotation += this.rotationSpeed;
      this.flip += this.flipSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(this.flip), 1);

      ctx.beginPath();
      // Draw almond/petal shape
      ctx.moveTo(0, -this.size);
      ctx.quadraticCurveTo(this.size * 0.8, -this.size * 0.2, 0, this.size);
      ctx.quadraticCurveTo(-this.size * 0.8, -this.size * 0.2, 0, -this.size);
      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < petalsCount; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. TRADITIONAL AMBIENT SHEHNAI / TANPURA MELODY (WEB AUDIO API)
   ========================================================================== */
function initAmbientMusic() {
  const musicToggle = document.getElementById('musicToggle');
  if (!musicToggle) return;

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let loopInterval = null;

  // Traditional Raag Yaman / Bhupali notes for auspicious wedding shehnai feeling:
  // Sa, Re, Ga, Pa, Dha (C4, D4, E4, G4, A4, C5)
  const frequencies = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];

  function startAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 1.5);
    masterGain.connect(audioCtx.destination);

    // Warm Tanpura Drone (Root C and Fifth G)
    playDrone(130.81); // C3
    playDrone(196.00); // G3

    // Serene Shehnai / Bansuri Melodic Phrase Loop
    let noteIndex = 0;
    const melodyPhrase = [0, 1, 2, 4, 3, 2, 4, 5, 4, 2, 1, 0];

    function playNextMelodyNote() {
      if (!isPlaying || !audioCtx) return;
      const freq = frequencies[melodyPhrase[noteIndex % melodyPhrase.length]];
      playShehnaiNote(freq);
      noteIndex++;
    }

    playNextMelodyNote();
    loopInterval = setInterval(playNextMelodyNote, 2200);

    isPlaying = true;
    musicToggle.classList.add('playing');
    const tooltip = musicToggle.querySelector('.music-tooltip');
    if (tooltip) tooltip.textContent = 'Pause Music';
  }

  function playDrone(freq) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Gentle lowpass filter for velvety resonance
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    osc.start();
  }

  function playShehnaiNote(freq) {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Sinuous shehnai vibrato
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle pitch meend (portamento)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.01, now + 1.2);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.1);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 2.2);
  }

  function stopAudio() {
    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (audioCtx) audioCtx.suspend();
      }, 500);
    }
    if (loopInterval) clearInterval(loopInterval);
    isPlaying = false;
    musicToggle.classList.remove('playing');
    const tooltip = musicToggle.querySelector('.music-tooltip');
    if (tooltip) tooltip.textContent = 'Play Shehnai Raga';
  }

  musicToggle.addEventListener('click', () => {
    if (!isPlaying) {
      startAudio();
    } else {
      stopAudio();
    }
  });
}
