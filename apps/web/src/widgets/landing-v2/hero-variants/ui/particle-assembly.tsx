'use client';

import { useEffect, useRef } from 'react';
import s from './hero-variants-page.module.scss';

const JOBS = [
  { company: 'GitHub', role: 'Senior Frontend Eng.', score: 94, color: 0x24292e },
  { company: 'Figma', role: 'Product Engineer', score: 87, color: 0xa259ff },
  { company: 'Shopify', role: 'Frontend Developer', score: 61, color: 0x5e8e3e },
  { company: 'Discord', role: 'Full-Stack Engineer', score: 43, color: 0x5865f2 },
];

type Phase = 'scatter' | 'converge' | 'hold' | 'disperse';
const DUR: Record<Phase, number> = { scatter: 1800, converge: 1100, hold: 2200, disperse: 600 };

export function ParticleAssembly() {
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

      // ── Particles ──────────────────────────────────────────
      interface Particle {
        x: number; y: number; vx: number; vy: number;
        tx: number; ty: number; r: number; color: number; gfx: any;
      }
      const N = 100;
      const parts: Particle[] = [];
      const pCont = new Container();
      app.stage.addChild(pCont);

      for (let i = 0; i < N; i++) {
        const gfx = new Graphics();
        pCont.addChild(gfx);
        parts.push({
          x: Math.random() * W(), y: Math.random() * H(),
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
          tx: Math.random() * W(), ty: Math.random() * H(),
          r: 1.5 + Math.random() * 2.5,
          color: Math.random() < 0.55 ? 0x375dfb : (Math.random() < 0.5 ? 0x93c5fd : 0x6b8eff),
          gfx,
        });
      }

      const randomTargets = () => {
        for (const p of parts) {
          p.tx = 30 + Math.random() * (W() - 60);
          p.ty = 30 + Math.random() * (H() - 60);
        }
      };
      const centerTargets = () => {
        const cx = W() / 2, cy = H() / 2;
        for (const p of parts) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 10 + Math.random() * 35;
          p.tx = cx + Math.cos(angle) * dist;
          p.ty = cy + Math.sin(angle) * dist;
        }
      };

      // ── Card ──────────────────────────────────────────────
      const cardCont = new Container();
      app.stage.addChild(cardCont);
      cardCont.alpha = 0;

      const cardGfx = new Graphics();
      cardCont.addChild(cardGfx);

      const mkTxt = (str: string, size: number, color: number, bold = false) => {
        const t = new Text({
          text: str,
          style: {
            fill: color, fontSize: size,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: bold ? 'bold' : 'normal',
          },
        });
        cardCont.addChild(t);
        return t;
      };

      const tCompany = mkTxt('', 14, 0x111827, true);
      const tRole = mkTxt('', 11, 0x6b7280);
      const tScore = mkTxt('', 32, 0x375dfb, true);
      const tMatchLabel = mkTxt('match score', 10, 0x9ca3af);
      const tInitial = mkTxt('', 13, 0xffffff, true);

      const drawCard = (job: (typeof JOBS)[0]) => {
        const cw = 230, ch = 148;
        const x = W() / 2 - cw / 2;
        const y = H() / 2 - ch / 2;

        cardGfx.clear();
        cardGfx.roundRect(x + 2, y + 4, cw, ch, 12).fill({ color: 0x000000, alpha: 0.18 });
        cardGfx.roundRect(x, y, cw, ch, 12).fill({ color: 0xffffff });
        cardGfx.roundRect(x, y, cw, ch, 12).stroke({ color: 0xe5e7eb, width: 1 });
        cardGfx.roundRect(x + 16, y + 14, 28, 28, 7).fill({ color: job.color });
        cardGfx.roundRect(x + 16, y + 110, cw - 32, 6, 3).fill({ color: 0xf3f4f6 });
        cardGfx.roundRect(x + 16, y + 110, ((cw - 32) * job.score) / 100, 6, 3).fill({ color: 0x375dfb });

        tCompany.text = job.company; tCompany.x = x + 52; tCompany.y = y + 14;
        tRole.text = job.role; tRole.x = x + 52; tRole.y = y + 33;
        tScore.text = `${job.score}%`; tScore.x = x + 16; tScore.y = y + 58;
        tMatchLabel.x = x + 16; tMatchLabel.y = y + 96;
        tInitial.text = job.company[0]; tInitial.x = x + 23; tInitial.y = y + 20;
      };

      // ── Phase machine ──────────────────────────────────────
      let phase: Phase = 'scatter';
      let phaseStart = Date.now();
      let jobIdx = 0;

      // ── Mouse ──────────────────────────────────────────────
      const mouse = { x: -9999, y: -9999 };
      canvas.addEventListener('pointermove', (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - r.left) * (W() / r.width);
        mouse.y = (e.clientY - r.top) * (H() / r.height);
      });
      canvas.addEventListener('pointerleave', () => {
        mouse.x = -9999; mouse.y = -9999;
      });

      app.ticker.add(() => {
        const now = Date.now();
        const elapsed = now - phaseStart;
        const t = Math.min(elapsed / DUR[phase], 1);

        if (t >= 1) {
          phaseStart = now;
          if (phase === 'scatter') {
            phase = 'converge'; centerTargets(); drawCard(JOBS[jobIdx]);
          } else if (phase === 'converge') {
            phase = 'hold';
          } else if (phase === 'hold') {
            phase = 'disperse'; randomTargets();
          } else {
            phase = 'scatter'; jobIdx = (jobIdx + 1) % JOBS.length;
          }
        }

        // Card alpha
        if (phase === 'converge') cardCont.alpha = t * t; // ease-in
        else if (phase === 'hold') cardCont.alpha = 1;
        else if (phase === 'disperse') cardCont.alpha = 1 - t;
        else cardCont.alpha = 0;

        // Particles
        const lerpStr = phase === 'converge' ? 0.09 : phase === 'hold' ? 0.035 : 0.03;
        const holdFade = phase === 'hold' ? 0.28 : 0.72;
        for (const p of parts) {
          // Mouse repulsion
          const mx = p.x - mouse.x, my = p.y - mouse.y;
          const md = Math.sqrt(mx * mx + my * my);
          if (md < 110 && md > 0) {
            const f = (1 - md / 110) * 0.08;
            p.vx += (mx / md) * f; p.vy += (my / md) * f;
          }
          // Target attraction
          p.vx += (p.tx - p.x) * lerpStr * 0.12;
          p.vy += (p.ty - p.y) * lerpStr * 0.12;
          p.vx *= 0.87; p.vy *= 0.87;
          p.x += p.vx; p.y += p.vy;

          p.gfx.clear();
          p.gfx.circle(0, 0, p.r).fill({ color: p.color, alpha: holdFade });
          p.gfx.x = p.x; p.gfx.y = p.y;
        }
      });
    })();

    return () => {
      destroyed = true;
      void app?.destroy(true, { children: true, texture: true });
    };
  }, []);

  return (
    <div ref={wrapRef} className={s.canvasWrap}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
