'use client';

import { useEffect, useRef, useState } from 'react';
import s from './hero-v2.module.scss';

const USER_STACK = new Set(['React', 'TypeScript', 'Next.js', 'CSS', 'GraphQL', 'Node.js']);

interface Job {
  co: string;
  role: string;
  pay: string;
  colorHex: string;
  logoUrl: string;
  skills: string[];
}

const JOBS: Job[] = [
  {
    co: 'GitHub',
    role: 'Senior Frontend Eng.',
    pay: '$160k – $200k',
    colorHex: '#24292e',
    logoUrl: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Docker'],
  },
  {
    co: 'Figma',
    role: 'Product Engineer',
    pay: '$140k – $180k',
    colorHex: '#a259ff',
    logoUrl: 'https://www.google.com/s2/favicons?domain=figma.com&sz=32',
    skills: ['React', 'TypeScript', 'CSS', 'WebGL', 'Node.js'],
  },
  {
    co: 'Shopify',
    role: 'Frontend Dev.',
    pay: '$120k – $160k',
    colorHex: '#5e8e3e',
    logoUrl: 'https://www.google.com/s2/favicons?domain=shopify.com&sz=32',
    skills: ['React', 'TypeScript', 'Ruby', 'GraphQL', 'Testing'],
  },
  {
    co: 'Discord',
    role: 'Web Engineer',
    pay: '$130k – $170k',
    colorHex: '#5865f2',
    logoUrl: 'https://www.google.com/s2/favicons?domain=discord.com&sz=32',
    skills: ['React', 'TypeScript', 'Rust', 'WebRTC', 'Node.js'],
  },
];

const SCAN_DUR = 3400;
const HOLD_DUR = 1800;
const Y_FRACS = [0.1, 0.24, 0.4, 0.56, 0.72] as const;
const BAR_WIDTHS = [0.85, 0.70, 0.90, 0.68, 0.80, 0.75, 0.88, 0.62, 0.78, 0.84];

export function HeroScanner() {
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeJob, setActiveJob] = useState(0);
  const jobIdxRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let app: any = null;
    let ro: ResizeObserver | null = null;
    let destroyed = false;

    void (async () => {
      const { Application, Graphics, Text, Container } = await import('pixi.js');

      const el = canvasWrapRef.current;
      const canvas = canvasRef.current;
      if (!el || !canvas || destroyed) return;

      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      app = new Application();
      await app.init({
        canvas,
        width: rect.width || el.offsetWidth || 320,
        height: rect.height || el.offsetHeight || 260,
        backgroundAlpha: 0,
        antialias: true,
        resolution: dpr,
        autoDensity: true,
      });

      ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry || !app) return;
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) app.renderer.resize(width, height);
      });
      ro.observe(el);
      if (destroyed) {
        await app.destroy(true, { children: true, texture: true });
        return;
      }

      const W = () => app.screen.width as number;
      const H = () => app.screen.height as number;

      const PAD = 16;
      const DOC_TOP = 14;
      const SPLIT = () => W() * 0.50;
      const RIGHT_X = () => W() * 0.54;
      const DOC_H = () => H() - DOC_TOP - 14;

      const barsGfx = new Graphics();
      const divGfx = new Graphics();
      const scanGfx = new Graphics();
      const scoreGfx = new Graphics();

      const tDocLabel = new Text({
        text: 'JOB DESCRIPTION',
        style: { fill: 0xb0b7c3, fontSize: 9, fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: 1 },
      });
      const tSkillsLabel = new Text({
        text: 'SKILLS MATCH',
        style: { fill: 0xb0b7c3, fontSize: 9, fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: 1 },
      });
      const tScoreVal = new Text({
        text: '',
        style: { fill: 0x375dfb, fontSize: 18, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 'bold' },
      });
      const tScoreCaption = new Text({
        text: '',
        style: { fill: 0x9ca3af, fontSize: 10, fontFamily: 'Inter, system-ui, sans-serif' },
      });

      const kwCont = new Container();
      const chipsCont = new Container();
      const scoreCont = new Container();
      scoreCont.addChild(scoreGfx, tScoreVal, tScoreCaption);
      scoreCont.alpha = 0;

      [barsGfx, divGfx, tDocLabel, tSkillsLabel, kwCont, scanGfx, chipsCont, scoreCont]
        .forEach(obj => app.stage.addChild(obj));

      const drawLayout = () => {
        divGfx.clear();
        divGfx.rect(SPLIT() + 1, DOC_TOP, 1, DOC_H()).fill({ color: 0xe5e7eb });
        tDocLabel.x = PAD;
        tDocLabel.y = DOC_TOP;
        tSkillsLabel.x = RIGHT_X();
        tSkillsLabel.y = DOC_TOP;
      };

      interface KwState {
        txt: any;
        matched: boolean;
        name: string;
        activated: boolean;
        brightness: number;
        chipSpawned: boolean;
        yFrac: number;
      }
      interface Chip {
        y: number;
        ty: number;
        alpha: number;
        cont: any;
        arrived: boolean;
      }

      let kwStates: KwState[] = [];
      let chips: Chip[] = [];
      let scanStart = Date.now();
      let holding = false;
      let holdStart = 0;

      const clearKwTexts = () => {
        kwCont.removeChildren();
        kwStates = [];
      };
      const clearChips = () => {
        chipsCont.removeChildren();
        chips = [];
      };

      const setupJob = (job: Job) => {
        drawLayout();
        barsGfx.clear();
        const docW = SPLIT() - PAD - 8;
        let bi = 0;

        for (let row = 0; row < 14; row++) {
          const yFrac = row / 14;
          if (Y_FRACS.some(f => Math.abs(f - yFrac) < 0.05)) continue;
          if (bi < BAR_WIDTHS.length) {
            const ky = DOC_TOP + 14 + yFrac * DOC_H();
            barsGfx.roundRect(PAD, ky, docW * BAR_WIDTHS[bi], 7, 3).fill({ color: 0xeef0f4 });
            bi++;
          }
        }

        kwStates = job.skills.map((name, i) => {
          const matched = USER_STACK.has(name);
          const txt = new Text({
            text: name,
            style: {
              fill: 0xd1d5db,
              fontSize: 11,
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 'bold',
            },
          });
          txt.x = PAD;
          kwCont.addChild(txt);
          return {
            txt,
            matched,
            name,
            activated: false,
            brightness: 0,
            chipSpawned: false,
            yFrac: Y_FRACS[i],
          };
        });

        scoreCont.alpha = 0;
        scoreGfx.clear();
      };

      const spawnChip = (kw: KwState) => {
        if (kw.chipSpawned) return;
        kw.chipSpawned = true;

        const chipIdx = chips.length;
        const ty = DOC_TOP + 14 + chipIdx * 28;

        const cont = new Container();
        const bg = new Graphics();
        const label = new Text({
          text: kw.name,
          style: {
            fill: kw.matched ? 0x15803d : 0xb91c1c,
            fontSize: 11,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 'bold',
          },
        });
        label.x = 8;
        label.y = 5;

        const dot = new Graphics();
        dot.circle(0, 0, 3.5).fill({ color: kw.matched ? 0x22c55e : 0xf87171 });
        dot.x = 8 + (label.width ?? 50) + 10;
        dot.y = 12;

        const chipW = (label.width ?? 50) + 26;
        bg.roundRect(0, 0, chipW, 24, 5).fill({ color: kw.matched ? 0xf0fdf4 : 0xfef2f2 });
        bg.roundRect(0, 0, chipW, 24, 5).stroke({ color: kw.matched ? 0xbbf7d0 : 0xfecaca, width: 1 });

        cont.addChild(bg, label, dot);
        cont.x = RIGHT_X();
        cont.y = ty - 12;
        cont.alpha = 0;
        chipsCont.addChild(cont);

        chips.push({ y: ty - 12, ty, alpha: 0, cont, arrived: false });
      };

      setupJob(JOBS[0]);
      // Render one frame immediately so the initial state is visible while ticker spins up
      app.renderer.render(app.stage);

      app.ticker.add(() => {
        const now = Date.now();

        // Animate chips regardless of phase
        for (const chip of chips) {
          chip.alpha = Math.min(chip.alpha + 0.07, 1);
          if (!chip.arrived) {
            chip.y += (chip.ty - chip.y) * 0.16;
            if (Math.abs(chip.y - chip.ty) < 0.5) {
              chip.y = chip.ty;
              chip.arrived = true;
            }
          }
          chip.cont.y = chip.y;
          chip.cont.alpha = chip.alpha;
        }

        if (holding) {
          if (now - holdStart >= HOLD_DUR) {
            holding = false;
            clearKwTexts();
            clearChips();
            const next = (jobIdxRef.current + 1) % JOBS.length;
            jobIdxRef.current = next;
            setActiveJob(next);
            setupJob(JOBS[next]);
            scanStart = now;
          }
          return;
        }

        const progress = Math.min((now - scanStart) / SCAN_DUR, 1);

        if (progress >= 1) {
          holding = true;
          holdStart = now;
          scanGfx.clear();

          const matchCount = kwStates.filter(k => k.matched).length;
          const total = kwStates.length;
          const pct = Math.round((matchCount / total) * 100);
          const scoreY = DOC_TOP + 14 + chips.length * 32 + 8;

          scoreGfx.clear();
          scoreGfx.roundRect(RIGHT_X() - 2, scoreY, 128, 42, 8).fill({ color: 0xeff4ff });
          scoreGfx.roundRect(RIGHT_X() - 2, scoreY, 128, 42, 8).stroke({ color: 0xdce4ff, width: 1 });
          tScoreVal.text = `${matchCount}/${total}`;
          tScoreVal.x = RIGHT_X() + 10;
          tScoreVal.y = scoreY + 5;
          tScoreCaption.text = `matched · ${pct}%`;
          tScoreCaption.x = RIGHT_X() + 10;
          tScoreCaption.y = scoreY + 26;
          scoreCont.alpha = 1;
          return;
        }

        const scanY = DOC_TOP + progress * DOC_H();

        for (const kw of kwStates) {
          const kwY = DOC_TOP + 14 + kw.yFrac * DOC_H();
          kw.txt.y = kwY - 7;

          if (!kw.activated && scanY > kwY) {
            kw.activated = true;
            spawnChip(kw);
          }
          if (kw.activated) {
            kw.brightness = Math.min(kw.brightness + 0.1, 1);
            kw.txt.style.fill = kw.matched ? 0x375dfb : 0xef4444;
          }
        }

        // Scanner beam
        scanGfx.clear();
        for (let i = 5; i >= 1; i--) {
          const a = 0.03 * i * (1 - Math.abs(progress * 2 - 1) * 0.3);
          scanGfx
            .rect(PAD - 4, scanY - i * 3, SPLIT() - PAD + 4, i * 2)
            .fill({ color: 0x375dfb, alpha: a });
        }
        scanGfx.rect(PAD - 4, scanY - 1, SPLIT() - PAD + 4, 2).fill({ color: 0x6b8eff, alpha: 0.8 });
      });
    })();

    return () => {
      destroyed = true;
      ro?.disconnect();
      void app?.destroy(true, { children: true, texture: true });
    };
  }, []);

  const job = JOBS[activeJob];

  return (
    <div className={s.scannerWrap}>
      <div className={s.scannerHeader}>
        <div className={s.coAvatar} style={{ background: job.colorHex }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={job.logoUrl}
            alt={job.co}
            width={20}
            height={20}
            className={s.coLogo}
          />
        </div>
        <div className={s.coInfo}>
          <span className={s.coName}>{job.co}</span>
          <span className={s.coRole}>{job.role}</span>
        </div>
        <span className={s.coPay}>{job.pay}</span>
      </div>
      <div ref={canvasWrapRef} className={s.scannerCanvas}>
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
    </div>
  );
}
