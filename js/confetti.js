/**
 * Confetti & Fireworks Engine
 * Lightweight, high-performance canvas-based particle system for romantic celebrations.
 * No external dependencies required.
 */

class ConfettiEngine {
  /**
   * @param {HTMLCanvasElement|string} canvas - Canvas element or its ID
   */
  constructor(canvas) {
    if (typeof canvas === 'string') {
      this.canvas = document.getElementById(canvas);
    } else {
      this.canvas = canvas;
    }

    if (!this.canvas) {
      console.warn('ConfettiEngine: Canvas element not found.');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationFrameId = null;
    this.animating = false;

    // Palette: romantic pinks, burgundy, gold, lavender, rose gold, white
    this.colors = [
      '#FF1493', // Deep Pink
      '#FF69B4', // Hot Pink
      '#FFB6C1', // Blush Pink
      '#800020', // Burgundy
      '#B76E79', // Rose Gold
      '#FFD700', // Gold
      '#E6E6FA', // Lavender
      '#FFF8F0', // Warm Cream
      '#FF4081'  // Accent Pink
    ];

    this.resize();
    this._handleResize = () => this.resize();
    window.addEventListener('resize', this._handleResize, { passive: true });
  }

  /**
   * Resize canvas resolution to match its displayed dimensions and device pixel ratio.
   * @param {number} [customWidth]
   * @param {number} [customHeight]
   */
  resize(customWidth, customHeight) {
    if (!this.canvas || !this.ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const w = customWidth || rect.width || this.canvas.parentElement?.clientWidth || window.innerWidth;
    const h = customHeight || rect.height || this.canvas.parentElement?.clientHeight || window.innerHeight;

    this.width = w;
    this.height = h;

    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);

    if (this.ctx.resetTransform) {
      this.ctx.resetTransform();
    } else {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.ctx.scale(dpr, dpr);
  }

  /**
   * Standard confetti burst from an origin.
   * @param {Object} [options]
   */
  burst(options = {}) {
    if (!this.canvas) return;

    const count = options.count ?? 80;
    const originX = options.x ?? this.width / 2;
    const originY = options.y ?? this.height / 2;
    const colors = options.colors ?? this.colors;
    const spread = (options.spread ?? 360) * (Math.PI / 180);
    const baseAngle = options.angle != null ? options.angle * (Math.PI / 180) : -Math.PI / 2;
    const baseSpeed = options.speed ?? 10;
    const gravity = options.gravity ?? 0.28;
    const drag = options.drag ?? 0.96;

    for (let i = 0; i < count; i++) {
      const angle = (options.spread === 360 || options.spread == null)
        ? Math.random() * Math.PI * 2
        : baseAngle + (Math.random() - 0.5) * spread;

      const speed = (Math.random() * 0.7 + 0.3) * baseSpeed;
      const size = Math.random() * 8 + 6;
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        type: 'confetti',
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: size,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.008 + 0.006,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.12 + 0.05,
        gravity: gravity,
        drag: drag,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    this._start();
  }

  /**
   * Heart-shaped particle burst.
   * @param {Object} [options]
   */
  heartBurst(options = {}) {
    if (!this.canvas) return;

    const count = options.count ?? 50;
    const originX = options.x ?? this.width / 2;
    const originY = options.y ?? this.height / 2;
    const colors = options.colors ?? ['#FF1493', '#FF69B4', '#FFB6C1', '#800020', '#B76E79', '#FFD700'];
    const spread = (options.spread ?? 360) * (Math.PI / 180);
    const baseAngle = options.angle != null ? options.angle * (Math.PI / 180) : -Math.PI / 2;
    const baseSpeed = options.speed ?? 8;
    const gravity = options.gravity ?? 0.18;
    const drag = options.drag ?? 0.97;

    for (let i = 0; i < count; i++) {
      const angle = (options.spread === 360 || options.spread == null)
        ? Math.random() * Math.PI * 2
        : baseAngle + (Math.random() - 0.5) * spread;

      const speed = (Math.random() * 0.75 + 0.25) * baseSpeed;
      const size = Math.random() * 12 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        type: 'heart',
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: size,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.006 + 0.004,
        rotation: (Math.random() - 0.5) * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.06,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.08 + 0.03,
        gravity: gravity,
        drag: drag
      });
    }

    this._start();
  }

  /**
   * Firework rocket that launches up, then bursts into hearts or sparkling confetti.
   * @param {Object} [options]
   */
  firework(options = {}) {
    if (!this.canvas) return;

    const startX = options.startX ?? Math.random() * (this.width * 0.6) + this.width * 0.2;
    const startY = options.startY ?? this.height + 20;
    const targetY = options.targetY ?? Math.random() * (this.height * 0.4) + this.height * 0.15;
    const isHeartBurst = options.heartBurst ?? (Math.random() > 0.4);
    const color = options.color ?? '#FFD700';

    // Rocket particle
    this.particles.push({
      type: 'rocket',
      x: startX,
      y: startY,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(Math.random() * 3 + 11),
      targetY: targetY,
      color: color,
      alpha: 1,
      gravity: 0.15,
      drag: 0.99,
      isHeartBurst: isHeartBurst,
      trailTimer: 0
    });

    this._start();
  }

  /**
   * Internal animation loop using requestAnimationFrame.
   */
  _start() {
    if (this.animating) return;
    this.animating = true;
    this._loop();
  }

  _loop() {
    if (!this.animating) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.type === 'rocket') {
        // Rocket physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;

        // Rocket spark trail
        p.trailTimer++;
        if (p.trailTimer % 2 === 0) {
          this.particles.push({
            type: 'spark',
            x: p.x + (Math.random() - 0.5) * 3,
            y: p.y + (Math.random() - 0.5) * 3,
            vx: (Math.random() - 0.5) * 0.8,
            vy: Math.random() * 1.2 + 0.5,
            size: Math.random() * 3 + 1.5,
            color: '#FFE4E1',
            alpha: 0.8,
            decay: 0.06,
            gravity: 0.05,
            drag: 0.95
          });
        }

        // Draw rocket head
        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // Apex reached or passed targetY
        if (p.vy >= -0.5 || p.y <= p.targetY) {
          // Explode!
          if (p.isHeartBurst) {
            this.heartBurst({
              x: p.x,
              y: p.y,
              count: 45,
              speed: 7
            });
          } else {
            this.burst({
              x: p.x,
              y: p.y,
              count: 70,
              speed: 9
            });
          }
          this.particles.splice(i, 1);
        }
        continue;
      }

      // Physics for regular particles (confetti, heart, spark)
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.alpha -= p.decay;

      if (p.rotationSpeed) p.rotation += p.rotationSpeed;
      if (p.wobbleSpeed) p.wobble += p.wobbleSpeed;

      // Draw particle based on type
      if (p.type === 'heart') {
        this._drawHeart(p);
      } else if (p.type === 'confetti') {
        this._drawConfetti(p);
      } else if (p.type === 'spark') {
        this._drawSpark(p);
      }

      // Remove dead or out-of-bounds particles
      if (p.alpha <= 0 || p.y > this.height + 60 || p.x < -60 || p.x > this.width + 60) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animationFrameId = requestAnimationFrame(() => this._loop());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  /**
   * Draw a heart shape with smooth bezier curves.
   * @param {Object} p
   */
  _drawHeart(p) {
    const ctx = this.ctx;
    const wobbleScale = Math.cos(p.wobble || 0) * 0.2 + 0.9;
    const d = p.size * wobbleScale;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
    ctx.fillStyle = p.color;

    ctx.beginPath();
    // Offset so heart is centered at (p.x, p.y)
    ctx.translate(0, -d * 0.4);
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
    ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw a standard confetti rectangle or circle with 3D tumbling.
   * @param {Object} p
   */
  _drawConfetti(p) {
    const ctx = this.ctx;
    const wobbleWidth = Math.cos(p.wobble) * p.size;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
    ctx.fillStyle = p.color;

    ctx.beginPath();
    if (p.shape === 'circle') {
      ctx.ellipse(0, 0, Math.abs(wobbleWidth) / 2, p.size / 2, 0, 0, Math.PI * 2);
    } else {
      ctx.fillRect(-wobbleWidth / 2, -p.size / 2, wobbleWidth, p.size * 0.6);
    }
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw a glowing sparkle dot.
   * @param {Object} p
   */
  _drawSpark(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /**
   * Clear all particles and stop the animation loop.
   */
  clear() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.animating = false;
    this.particles = [];
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  /**
   * Destroy instance and remove event listeners.
   */
  destroy() {
    this.clear();
    window.removeEventListener('resize', this._handleResize);
  }
}

// Export globally
window.ConfettiEngine = ConfettiEngine;
