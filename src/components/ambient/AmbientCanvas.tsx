import React, { useEffect, useRef } from 'react';

interface Particle {
  type: 'petal' | 'dust' | 'glint' | 'bokeh';
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  opacitySpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  maxOpacity: number;
}

export const AmbientCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 60 balanced ambient particles
    const particles: Particle[] = [];
    const TOTAL_PARTICLES = 60;

    const createParticle = (yOffset?: number): Particle => {
      const rand = Math.random();
      let type: Particle['type'] = 'dust';
      if (rand < 0.35) type = 'petal';
      else if (rand < 0.65) type = 'dust';
      else if (rand < 0.85) type = 'glint';
      else type = 'bokeh';

      const y = yOffset !== undefined ? yOffset : Math.random() * height;
      const x = Math.random() * width;

      if (type === 'petal') {
        return {
          type,
          x,
          y,
          size: 10 + Math.random() * 8, // Rose petal size
          speedX: -0.6 + Math.random() * 1.2,
          speedY: 0.8 + Math.random() * 1.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          opacity: 0.4 + Math.random() * 0.45,
          opacitySpeed: 0,
          flip: Math.random() * Math.PI,
          flipSpeed: 0.02 + Math.random() * 0.03,
          color: Math.random() > 0.4 ? '#8B1425' : '#5A0F1E',
          maxOpacity: 0.8,
        };
      } else if (type === 'glint') {
        return {
          type,
          x,
          y,
          size: 8 + Math.random() * 12, // Diamond glint star
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: 0,
          opacitySpeed: 0.015 + Math.random() * 0.02,
          flip: 0,
          flipSpeed: 0,
          color: '#FAF6ED',
          maxOpacity: 0.85 + Math.random() * 0.15,
        };
      } else if (type === 'bokeh') {
        return {
          type,
          x,
          y,
          size: 20 + Math.random() * 35, // Soft cinematic golden orb
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -0.3 - Math.random() * 0.4,
          rotation: 0,
          rotationSpeed: 0,
          opacity: 0.05 + Math.random() * 0.1,
          opacitySpeed: 0,
          flip: 0,
          flipSpeed: 0,
          color: '#D4AF37',
          maxOpacity: 0.18,
        };
      } else {
        // Gold dust micro-particle
        return {
          type: 'dust',
          x,
          y,
          size: 1.5 + Math.random() * 2.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: 0.3 + Math.random() * 0.6,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          opacity: 0.3 + Math.random() * 0.5,
          opacitySpeed: (Math.random() - 0.5) * 0.01,
          flip: 0,
          flipSpeed: 0,
          color: '#FBE285',
          maxOpacity: 0.75,
        };
      }
    };

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      particles.push(createParticle());
    }

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Draw single rose petal with 3D tumble
    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.flip), 1);
      ctx.globalAlpha = p.opacity;

      const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
      grad.addColorStop(0, '#B31B34');
      grad.addColorStop(0.6, p.color);
      grad.addColorStop(1, '#3D0A14');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.8, p.size * 1.1, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 1.1, p.size * 0.5, -p.size * 0.9, -p.size * 0.8, 0, -p.size);
      ctx.fill();

      // Subtle gold rim glint on edge
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    // Draw Sheesh Mahal mirror diamond glint star
    const drawGlint = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // 4-pointed diamond star flare
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      // Horizontal flare
      ctx.moveTo(-p.size, 0);
      ctx.quadraticCurveTo(0, 0, 0, -p.size);
      ctx.quadraticCurveTo(0, 0, p.size, 0);
      ctx.quadraticCurveTo(0, 0, 0, p.size);
      ctx.quadraticCurveTo(0, 0, -p.size, 0);
      ctx.fill();

      // Golden center aura
      const radial = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 0.7);
      radial.addColorStop(0, 'rgba(255, 242, 178, 0.9)');
      radial.addColorStop(0.5, 'rgba(212, 175, 55, 0.4)');
      radial.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw gold dust
    const drawDust = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Draw soft bokeh orb
    const drawBokeh = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;
      const radial = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      radial.addColorStop(0, 'rgba(251, 226, 133, 0.5)');
      radial.addColorStop(0.6, 'rgba(212, 175, 55, 0.2)');
      radial.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (!isTabVisible) return;

      const delta = Math.min((currentTime - lastTime) / 16.6, 2.0); // normalize around 60fps
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position update
        p.x += p.speedX * delta;
        p.y += p.speedY * delta;
        p.rotation += p.rotationSpeed * delta;
        p.flip += p.flipSpeed * delta;

        // Specific type updates
        if (p.type === 'glint') {
          p.opacity += p.opacitySpeed * delta;
          if (p.opacity >= p.maxOpacity) {
            p.opacitySpeed = -Math.abs(p.opacitySpeed);
          }
          if (p.opacity <= 0 && p.opacitySpeed < 0) {
            // Respawn glint elsewhere
            particles[i] = createParticle();
            particles[i].type = 'glint';
            particles[i].opacity = 0;
            particles[i].opacitySpeed = 0.015 + Math.random() * 0.02;
          }
        } else if (p.type === 'dust') {
          p.opacity += p.opacitySpeed * delta;
          if (p.opacity > p.maxOpacity || p.opacity < 0.2) {
            p.opacitySpeed = -p.opacitySpeed;
          }
        }

        // Boundary wrap
        if (p.y > height + 25) {
          particles[i] = createParticle(-20);
        } else if (p.y < -35 && p.speedY < 0) {
          particles[i] = createParticle(height + 20);
        }
        if (p.x > width + 25) p.x = -20;
        if (p.x < -25) p.x = width + 20;

        // Render particle
        if (p.type === 'petal') drawPetal(p);
        else if (p.type === 'glint') drawGlint(p);
        else if (p.type === 'bokeh') drawBokeh(p);
        else drawDust(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};
