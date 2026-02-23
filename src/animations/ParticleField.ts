interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type: 'electron' | 'photon';
}

export class ParticleField {
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.initParticles();
  }

  private initParticles() {
    // Adaptive particle count based on canvas area to avoid too many particles on large screens
    const area = this.width * this.height;
    const base = Math.round(Math.min(120, Math.max(30, (area / (800 * 600)) * 80)));
    for (let i = 0; i < base; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() < 0.6 ? 1.5 : 2.5,
        color: Math.random() < 0.5 ? '#ffd600' : '#00c853',
        type: Math.random() < 0.5 ? 'electron' : 'photon',
      });
    }
  }

  setMouse(x: number, y: number) {
    this.mouse = { x, y };
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw subtle radial glow at center (cheap: single fill)
    const gradient = ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      0,
      this.width / 2,
      this.height / 2,
      Math.max(this.width, this.height) / 2
    );
    gradient.addColorStop(0, 'rgba(0, 200, 83, 0.08)');
    gradient.addColorStop(1, 'rgba(0, 200, 83, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    const mouseX = this.mouse.x;
    const mouseY = this.mouse.y;
    const interactDist = 80;
    const interactDistSq = interactDist * interactDist;

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];

      // Mouse interaction (using squared distance to avoid sqrt)
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distSq = dx * dx + dy * dy;

      if (distSq > 0 && distSq < interactDistSq) {
        const distance = Math.sqrt(distSq);
        const force = (interactDist - distance) / interactDist;
        particle.vx -= (dx / distance) * force * 0.12;
        particle.vy -= (dy / distance) * force * 0.12;
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary check
      if (particle.x < 0) { particle.x = 0; particle.vx *= -0.8; }
      if (particle.x > this.width) { particle.x = this.width; particle.vx *= -0.8; }
      if (particle.y < 0) { particle.y = 0; particle.vy *= -0.8; }
      if (particle.y > this.height) { particle.y = this.height; particle.vy *= -0.8; }

      // Damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      // Draw particle (no heavy shadow blur)
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    }

    // Draw connections (limit checks and use squared distance)
    const maxConnDist = 100;
    const maxConnDistSq = maxConnDist * maxConnDist;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      let connections = 0;
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < maxConnDistSq && connections < 4) {
          const alpha = 0.18 * (1 - distSq / maxConnDistSq);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0,200,83,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          connections++;
        }
      }
    }
  }
}
