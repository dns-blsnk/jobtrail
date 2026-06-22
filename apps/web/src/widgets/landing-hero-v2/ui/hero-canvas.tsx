'use client';

import { useEffect, useRef } from 'react';
import s from './landing-hero-v2.module.scss';

interface PixiGfx {
  clear(): this;
  circle(x: number, y: number, r: number): this;
  fill(opts: { color: number; alpha: number }): this;
  moveTo(x: number, y: number): this;
  lineTo(x: number, y: number): this;
  stroke(opts: { color: number; alpha: number; width: number }): this;
  x: number;
  y: number;
}

interface PixiApp {
  screen: { width: number; height: number };
  stage: { addChild(child: PixiGfx | { addChild(c: PixiGfx): void; removeChild(c: PixiGfx): void }): void };
  ticker: { add(fn: () => void): void };
  init(opts: object): Promise<void>;
  destroy(removeView: boolean, opts: { children: boolean; texture: boolean }): void | Promise<void>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: number;
  gfx: PixiGfx;
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    let app: PixiApp | null = null;
    let destroyed = false;
    let ro: ResizeObserver | null = null;
    const particles: Particle[] = [];

    (async () => {
      const { Application, Graphics, Container } = await import('pixi.js');

      const container = containerRef.current;
      const canvas    = canvasRef.current;
      if (!container || !canvas) return;

      app = new Application() as unknown as PixiApp;
      await app.init({
        canvas,
        resizeTo: container,
        backgroundAlpha: 0,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
      });

      if (destroyed) {
        await app.destroy(true, { children: true, texture: true });
        return;
      }

      const linesGfx = new Graphics() as unknown as PixiGfx;
      const dotsCont = new Container();
      app.stage.addChild(linesGfx);
      app.stage.addChild(dotsCont as unknown as PixiGfx);

      const buildParticles = () => {
        for (const p of particles) dotsCont.removeChild(p.gfx as unknown as Parameters<typeof dotsCont.removeChild>[0]);
        particles.length = 0;

        const W = app!.screen.width;
        const H = app!.screen.height;
        const count = Math.max(40, Math.min(Math.floor((W * H) / 12000), 100));

        for (let i = 0; i < count; i++) {
          const gfx = new Graphics() as unknown as PixiGfx;
          const p: Particle = {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: 1.5 + Math.random() * 2,
            alpha: 0.4 + Math.random() * 0.6,
            color: Math.random() < 0.7 ? 0xffffff : 0x375dfb,
            gfx,
          };
          particles.push(p);
          dotsCont.addChild(gfx as unknown as Parameters<typeof dotsCont.addChild>[0]);
        }
      };

      buildParticles();

      const CONNECTION_RADIUS = 110;
      const REPEL_RADIUS      = 130;
      const REPEL_FORCE       = 0.06;

      const drawLines = () => {
        linesGfx.clear();
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_RADIUS) {
              const alpha = (1 - dist / CONNECTION_RADIUS) * 0.2;
              linesGfx
                .moveTo(a.x, a.y)
                .lineTo(b.x, b.y)
                .stroke({ color: 0x375dfb, alpha, width: 0.8 });
            }
          }
        }
      };

      app.ticker.add(() => {
        const W  = app!.screen.width;
        const H  = app!.screen.height;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        for (const p of particles) {
          const dx   = p.x - mx;
          const dy   = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          p.vx *= 0.97;
          p.vy *= 0.97;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) { p.x = 0;  p.vx = Math.abs(p.vx); }
          if (p.x > W) { p.x = W;  p.vx = -Math.abs(p.vx); }
          if (p.y < 0) { p.y = 0;  p.vy = Math.abs(p.vy); }
          if (p.y > H) { p.y = H;  p.vy = -Math.abs(p.vy); }

          p.gfx.clear();
          p.gfx.circle(0, 0, p.r).fill({ color: p.color, alpha: p.alpha });
          p.gfx.x = p.x;
          p.gfx.y = p.y;
        }

        drawLines();
      });

      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - rect.left) * (app!.screen.width  / rect.width),
          y: (e.clientY - rect.top)  * (app!.screen.height / rect.height),
        };
      };
      const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);

      let prevW = app.screen.width;
      ro = new ResizeObserver(() => {
        const newW = app?.screen.width ?? 0;
        if (Math.abs(newW - prevW) > 200) {
          prevW = newW;
          buildParticles();
        }
      });
      ro.observe(container);
    })();

    return () => {
      destroyed = true;
      ro?.disconnect();
      app?.destroy(true, { children: true, texture: true });
    };
  }, []);

  return (
    <div ref={containerRef} className={s.canvasWrapper}>
      <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
    </div>
  );
}
