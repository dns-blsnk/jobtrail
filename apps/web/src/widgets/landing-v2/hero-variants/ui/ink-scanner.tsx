'use client';

import { useEffect, useRef } from 'react';
import s from './hero-variants-page.module.scss';

interface Keyword {
  text: string;
  yFrac: number; // 0–1 fraction of the scan area height
  matched: boolean;
}

const KEYWORDS: Keyword[] = [
  { text: 'React', yFrac: 0.14, matched: true },
  { text: 'TypeScript', yFrac: 0.26, matched: true },
  { text: 'Next.js', yFrac: 0.38, matched: true },
  { text: 'GraphQL', yFrac: 0.50, matched: false },
  { text: 'Docker', yFrac: 0.62, matched: true },
  { text: 'AWS', yFrac: 0.74, matched: false },
];

const SCAN_DUR = 4200; // ms to sweep full height
const PAUSE_DUR = 1400; // pause before restart

export function InkScanner() {
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

      // ── Layout constants ────────────────────────────────────
      const PAD = 40;
      const LEFT_W = () => W() * 0.52;
      const RIGHT_X = () => W() * 0.58;
      const DOC_TOP = 56;
      const DOC_BOT = () => H() - 40;
      const DOC_H = () => DOC_BOT() - DOC_TOP;

      // ── Background panels ───────────────────────────────────
      const bgGfx = new Graphics();
      app.stage.addChild(bgGfx);

      const drawBg = () => {
        bgGfx.clear();
        // Left doc panel
        bgGfx.roundRect(PAD - 8, DOC_TOP - 8, LEFT_W() - PAD + 8, DOC_H() + 16, 8)
          .fill({ color: 0x161b22, alpha: 1 });
        // Divider
        bgGfx.rect(LEFT_W() + 8, DOC_TOP, 1, DOC_H())
          .fill({ color: 0xffffff, alpha: 0.06 });
        // Right panel
        bgGfx.roundRect(RIGHT_X() - 8, DOC_TOP - 8, W() - RIGHT_X() - PAD + 8 + 8, DOC_H() + 16, 8)
          .fill({ color: 0x0d1117, alpha: 1 });
      };
      drawBg();

      // ── Left panel labels ───────────────────────────────────
      const mkLabel = (str: string, x: number, y: number, opts?: { size?: number; color?: number; bold?: boolean }) => {
        const t = new Text({
          text: str,
          style: {
            fill: opts?.color ?? 0x8b949e,
            fontSize: opts?.size ?? 11,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: opts?.bold ? 'bold' : 'normal',
          },
        });
        t.x = x; t.y = y;
        app.stage.addChild(t);
        return t;
      };

      mkLabel('JOB DESCRIPTION', PAD, 30, { size: 10, color: 0x30363d });
      mkLabel('Senior Frontend Engineer', PAD, DOC_TOP + 6, { size: 14, color: 0xe6edf3, bold: true });

      // Doc skeleton bars
      const barsGfx = new Graphics();
      app.stage.addChild(barsGfx);

      const BAR_H = 8;
      const BAR_WIDTHS = [0.88, 0.75, 0, 0.92, 0.68, 0, 0.81, 0.60, 0, 0.85, 0.70, 0, 0.78, 0.55, 0, 0.88, 0.62];
      // 0 = skip (keyword row occupies this slot)

      const drawBars = () => {
        barsGfx.clear();
        const docWidth = LEFT_W() - PAD * 2;
        let barIdx = 0;
        let kwIdx = 0;

        for (let row = 0; row < 17; row++) {
          const ky = DOC_TOP + 30 + row * 24;
          // Check if this row is a keyword row
          if (kwIdx < KEYWORDS.length && Math.abs(KEYWORDS[kwIdx].yFrac - (row / 17)) < 0.04) {
            kwIdx++;
            continue; // keyword renders as Text, skip bar
          }
          if (BAR_WIDTHS[barIdx] > 0) {
            barsGfx.roundRect(PAD, ky, docWidth * BAR_WIDTHS[barIdx], BAR_H, 3)
              .fill({ color: 0x21262d, alpha: 1 });
          }
          barIdx++;
          if (barIdx >= BAR_WIDTHS.length) break;
        }
      };
      drawBars();

      // ── Keyword text objects ────────────────────────────────
      interface KwState {
        txt: any;
        activated: boolean;
        brightness: number; // 0 to 1, for glow animation
        keyword: Keyword;
        chipSpawned: boolean;
      }

      const kwStates: KwState[] = KEYWORDS.map((kw) => {
        const t = new Text({
          text: kw.text,
          style: {
            fill: 0x3d444d,
            fontSize: 12,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 'bold',
          },
        });
        t.x = PAD;
        app.stage.addChild(t);
        return { txt: t, activated: false, brightness: 0, keyword: kw, chipSpawned: false };
      });

      // ── Right panel: skill chips ────────────────────────────
      const rightLabel = mkLabel('EXTRACTED SKILLS', RIGHT_X(), 30, { size: 10, color: 0x30363d });
      void rightLabel;

      interface Chip {
        x: number; y: number; tx: number; ty: number;
        alpha: number; text: string; matched: boolean;
        cont: any; arrived: boolean;
      }
      const chips: Chip[] = [];
      const chipsCont = new Container();
      app.stage.addChild(chipsCont);

      const spawnChip = (kw: KwState, kwY: number) => {
        if (kw.chipSpawned) return;
        kw.chipSpawned = true;

        const chipIdx = chips.length;
        const targetY = DOC_TOP + 20 + chipIdx * 38;
        const targetX = RIGHT_X();

        const cont = new Container();
        const bgRect = new Graphics();
        const label = new Text({
          text: kw.keyword.text,
          style: {
            fill: kw.keyword.matched ? 0xffffff : 0x8b949e,
            fontSize: 12,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 'bold',
          },
        });
        label.x = 10; label.y = 7;

        const dotGfx = new Graphics();
        const dotColor = kw.keyword.matched ? 0x3fb950 : 0xff7b72;
        dotGfx.circle(0, 0, 4).fill({ color: dotColor });
        dotGfx.x = 10 + (label.width ?? 60) + 14;
        dotGfx.y = 14;

        const chipW = (label.width ?? 60) + 38;
        bgRect.roundRect(0, 0, chipW, 28, 6)
          .fill({ color: kw.keyword.matched ? 0x1f2937 : 0x1a1f27 });
        bgRect.roundRect(0, 0, chipW, 28, 6)
          .stroke({ color: kw.keyword.matched ? 0x30363d : 0x21262d, width: 1 });

        cont.addChild(bgRect);
        cont.addChild(label);
        cont.addChild(dotGfx);
        chipsCont.addChild(cont);

        const chip: Chip = {
          x: PAD, y: kwY,
          tx: targetX, ty: targetY,
          alpha: 0, text: kw.keyword.text,
          matched: kw.keyword.matched,
          cont, arrived: false,
        };
        chips.push(chip);
      };

      // ── Score display ───────────────────────────────────────
      const scoreCont = new Container();
      app.stage.addChild(scoreCont);
      scoreCont.alpha = 0;

      const scoreGfx = new Graphics();
      const scoreVal = new Text({
        text: '', style: { fill: 0x375dfb, fontSize: 28, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 'bold' }
      });
      const scoreLabel2 = new Text({
        text: 'match score', style: { fill: 0x8b949e, fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif' }
      });

      scoreCont.addChild(scoreGfx);
      scoreCont.addChild(scoreVal);
      scoreCont.addChild(scoreLabel2);

      // ── Scanner line ────────────────────────────────────────
      const scanGfx = new Graphics();
      app.stage.addChild(scanGfx);

      let scanStart = Date.now();
      let scanning = true;
      let pauseStart = 0;

      const resetScan = () => {
        scanning = true;
        scanStart = Date.now();
        // Reset all keyword states
        for (const kw of kwStates) {
          kw.activated = false;
          kw.brightness = 0;
          kw.chipSpawned = false;
          kw.txt.style.fill = 0x3d444d;
        }
        // Remove chips
        for (const chip of chips) chipsCont.removeChild(chip.cont);
        chips.length = 0;
        scoreCont.alpha = 0;
      };

      app.ticker.add(() => {
        const now = Date.now();

        // Pause/restart cycle
        if (!scanning) {
          if (now - pauseStart >= PAUSE_DUR) {
            resetScan();
          }
          return;
        }

        const elapsed = now - scanStart;
        const progress = elapsed / SCAN_DUR; // 0 to 1

        if (progress >= 1) {
          scanning = false;
          pauseStart = now;
          scanGfx.clear();

          // Show score
          const matchCount = KEYWORDS.filter((k) => k.matched).length;
          const pct = Math.round((matchCount / KEYWORDS.length) * 100);
          const scoreY = DOC_TOP + chips.length * 38 + 20;
          scoreGfx.clear();
          scoreGfx.roundRect(RIGHT_X() - 2, scoreY, 120, 54, 8).fill({ color: 0x161b22 });
          scoreVal.text = `${pct}%`;
          scoreVal.x = RIGHT_X() + 10; scoreVal.y = scoreY + 8;
          scoreLabel2.x = RIGHT_X() + 10; scoreLabel2.y = scoreY + 40;
          scoreCont.alpha = 1;
          return;
        }

        const scanY = DOC_TOP + progress * DOC_H();

        // Update keyword text Y positions based on canvas height
        for (const kw of kwStates) {
          const kwY = DOC_TOP + 30 + kw.keyword.yFrac * DOC_H();
          kw.txt.y = kwY - 7;

          // Activate when scanner passes
          if (!kw.activated && scanY > kwY) {
            kw.activated = true;
            spawnChip(kw, kwY);
          }

          // Animate brightness
          if (kw.activated) {
            kw.brightness = Math.min(kw.brightness + 0.08, 1);
            const colorVal = kw.keyword.matched
              ? Math.round(0x375dfb + kw.brightness * 0x0808ff) // blue glow
              : Math.round(0x6b7280);
            kw.txt.style.fill = colorVal;
          }
        }

        // Draw scanner glow
        scanGfx.clear();
        // Outer glow bands
        for (let i = 5; i >= 1; i--) {
          const a = (0.04 * i) * (1 - Math.abs((progress * 2) - 1) * 0.3);
          scanGfx.rect(PAD - 8, scanY - i * 4, LEFT_W() - PAD + 8, i * 2)
            .fill({ color: 0x375dfb, alpha: a });
        }
        // Main line
        scanGfx.rect(PAD - 8, scanY - 1, LEFT_W() - PAD + 8, 2)
          .fill({ color: 0x6b8eff, alpha: 0.9 });

        // Animate chips flying to right panel
        for (const chip of chips) {
          chip.alpha = Math.min(chip.alpha + 0.06, 1);
          if (!chip.arrived) {
            chip.x += (chip.tx - chip.x) * 0.12;
            chip.y += (chip.ty - chip.y) * 0.12;
            if (Math.abs(chip.x - chip.tx) < 1 && Math.abs(chip.y - chip.ty) < 1) {
              chip.x = chip.tx; chip.y = chip.ty; chip.arrived = true;
            }
          }
          chip.cont.x = chip.x;
          chip.cont.y = chip.y;
          chip.cont.alpha = chip.alpha;
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
