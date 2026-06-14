'use client';

import { useCallback, useState } from 'react';
import { Icon } from '@/shared/ui/icon/icon';
import { useDismiss } from '@/shared/lib/hooks/use-dismiss';
import styles from './lang-switch.module.scss';

const LANGS = [
  { code: 'EN', name: 'English' },
  { code: 'RU', name: 'Русский' },
  { code: 'KZ', name: 'Қазақша' },
] as const;

type LangCode = (typeof LANGS)[number]['code'];

interface LangSwitchProps {
  up?: boolean;
  tone?: 'light' | 'deep';
}

export function LangSwitch({ up = false, tone = 'light' }: LangSwitchProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>('EN');
  const ref = useDismiss(open, useCallback(() => setOpen(false), []));
  const deep = tone === 'deep';

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${styles.root} ${deep ? styles.deep : ''}`}>
      <button
        className={styles.trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="globe" size={17} strokeWidth={1.9} />
        {current.name}
        <Icon
          className={`${styles.caret} ${open ? styles.caretOpen : ''}`}
          name="chevronDown"
          size={15}
        />
      </button>

      <div className={`${styles.popover} ${open ? styles.popoverOpen : ''} ${up ? styles.up : ''}`}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={`${styles.option} ${l.code === lang ? styles.optionActive : ''}`}
            type="button"
            onClick={() => { setLang(l.code); setOpen(false); }}
          >
            <span className={styles.optionCode}>{l.code}</span>
            {l.name}
            {l.code === lang && <Icon className={styles.check} name="check" size={16} />}
          </button>
        ))}
      </div>
    </div>
  );
}
