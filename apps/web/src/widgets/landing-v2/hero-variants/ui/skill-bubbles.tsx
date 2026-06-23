'use client';

import { useEffect, useRef } from 'react';
import s from './hero-variants-page.module.scss';

const MATCHED = ['React', 'TypeScript', 'Next.js', 'Node.js', 'CSS'];
const MISSING = ['GraphQL', 'Docker', 'AWS', 'Redis', 'K8s'];

const COLOR_MATCH = 0x375dfb;
const COLOR_MISS = 0x374151;
const COLOR_MATCH_GLOW = 0x6b8eff;
const COLOR_MISS_GLOW = 0x4b5563;

interface SkillBubblesProps {
  className?: string;
}

export function SkillBubbles({ className }: SkillBubblesProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let app: any = null;
    let destroyed = false;

    void (async () => {
      const { Application, Graphics, Text, Container } = await import('pixi.js');

      const el = wrapRef.current;
      const canvas = canvasRef.current;
      if (!el || !canvas || destroyed) return;

      app = new Application();
      await app.init({
        canvas,
        resizeTo: el,
        backgroundAlpha: 0,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
      });
      if (destroyed) {
        await app.destroy(true, { children: true, texture: true });
        return;
      }

      const W = () => app.screen.width as number;
      const H = () => app.screen.height as number;

      // ── Legend ─────────────────────────────────────────────
      const legend = new Container();
      app.stage.addChild(legend);

      const mkLegendDot = (color: number, x: number) => {
        const g = new Graphics();
        g.circle(0, 0, 5).fill({ color });
        g.x = x; g.y = 20;
        legend.addChild(g);
      };
      const mkLegendTxt = (str: string, x: number) => {
        const t = new Text({ text: str, style: { fill: 0x9ca3af, fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif' } });
        t.x = x; t.y = 13;
        legend.addChild(t);
      };

      mkLegendDot(COLOR_MATCH, 24);
      mkLegendTxt('You have it', 34);
      mkLegendDot(COLOR_MISS, 130);
      mkLegendTxt('You need it', 140);

      // ── Bubbles ────────────────────────────────────────────
      interface Bubble {
        x: number; y: number; vx: number; vy: number;
        r: number; skill: string; matched: boolean;
        cont: any; gfx: any;
        scale: number; targetScale: number;
      }
      const bubbles: Bubble[] = [];

      const allSkills = [
        ...MATCHED.map((s) => ({ skill: s, matched: true })),
        ...MISSING.map((s) => ({ skill: s, matched: false })),
      ];

      for (const { skill, matched } of allSkills) {
        const r = 32 + skill.length * 3.5;
        const cont = new Container();
        const gfx = new Graphics();
        const txt = new Text({
          text: skill,
          style: {
            fill: 0xffffff,
            fontSize: 13,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 'bold',
          },
        });
        txt.anchor.set(0.5);

        cont.addChild(gfx);
        cont.addChild(txt);
        app.stage.addChild(cont);

        bubbles.push({
          x: W() * 0.15 + Math.random() * W() * 0.7,
          y: H() * 0.15 + Math.random() * H() * 0.7,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          r, skill, matched,
          cont, gfx,
          scale: 1, targetScale: 1,
        });
      }

      // ── Mouse ──────────────────────────────────────────────
      const mouse = { x: -9999, y: -9999 };
      canvas.addEventListener('pointermove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) * (W() / rect.width);
        mouse.y = (e.clientY - rect.top) * (H() / rect.height);

        // Hover detection
        for (const b of bubbles) {
          const dx = b.x - mouse.x, dy = b.y - mouse.y;
          b.targetScale = Math.sqrt(dx * dx + dy * dy) < b.r ? 1.12 : 1;
        }
      });
      canvas.addEventListener('pointerleave', () => {
        mouse.x = -9999; mouse.y = -9999;
        for (const b of bubbles) b.targetScale = 1;
      });

      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const cx = (e.clientX - rect.left) * (W() / rect.width);
        const cy = (e.clientY - rect.top) * (H() / rect.height);
        for (const b of bubbles) {
          const dx = b.x - cx, dy = b.y - cy;
          if (Math.sqrt(dx * dx + dy * dy) < b.r) {
            const angle = Math.atan2(dy, dx);
            b.vx += Math.cos(angle) * 10;
            b.vy += Math.sin(angle) * 10;
          }
        }
      });

      // ── Ticker ─────────────────────────────────────────────
      app.ticker.add(() => {
        const cx = W() / 2, cy = H() / 2;

        for (const b of bubbles) {
          // Mouse repulsion
          const mdx = b.x - mouse.x, mdy = b.y - mouse.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 140 && md > 0) {
            const f = (1 - md / 140) * 0.09;
            b.vx += (mdx / md) * f;
            b.vy += (mdy / md) * f;
          }

          // Bubble-bubble separation
          for (const other of bubbles) {
            if (other === b) continue;
            const dx = b.x - other.x, dy = b.y - other.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const minD = b.r + other.r + 8;
            if (d < minD && d > 0) {
              const f = (1 - d / minD) * 0.18;
              b.vx += (dx / d) * f;
              b.vy += (dy / d) * f;
            }
          }

          // Center gravity
          b.vx += (cx - b.x) * 0.0006;
          b.vy += (cy - b.y) * 0.0006;

          // Damping
          b.vx *= 0.91;
          b.vy *= 0.91;

          b.x += b.vx;
          b.y += b.vy;

          // Soft wall
          const pad = b.r + 10;
          if (b.x < pad) { b.vx += (pad - b.x) * 0.1; }
          if (b.x > W() - pad) { b.vx += (W() - pad - b.x) * 0.1; }
          if (b.y < pad + 40) { b.vy += (pad + 40 - b.y) * 0.1; }
          if (b.y > H() - pad) { b.vy += (H() - pad - b.y) * 0.1; }

          // Scale lerp
          b.scale += (b.targetScale - b.scale) * 0.15;
          b.cont.scale.set(b.scale);

          // Draw
          const color = b.matched ? COLOR_MATCH : COLOR_MISS;
          const glowColor = b.matched ? COLOR_MATCH_GLOW : COLOR_MISS_GLOW;

          b.gfx.clear();
          b.gfx.circle(0, 0, b.r + 5).fill({ color: glowColor, alpha: 0.12 });
          b.gfx.circle(0, 0, b.r).fill({ color, alpha: 0.92 });

          b.cont.x = b.x;
          b.cont.y = b.y;
        }
      });
    })();

    return () => {
      destroyed = true;
      void app?.destroy(true, { children: true, texture: true });
    };
  }, []);

  return (
    <div ref={wrapRef} className={className ?? s.canvasWrap}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
