'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next/client';
import { Icon } from '@/shared/ui/icon/icon';
import { useDismiss } from '@/shared/lib/hooks/use-dismiss';
import { clsx } from 'clsx';
import s from './lang-switch.module.scss';

const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  // { code: 'ua', label: 'UA', name: 'Українська' },
  // { code: 'ru', label: 'RU', name: 'Русский' },
] as const;

type LangCode = (typeof LANGS)[number]['code'];

interface LangSwitchProps {
  up?: boolean;
  tone?: 'light' | 'deep';
}

export function LangSwitch({ up = false, tone = 'light' }: LangSwitchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>('en');
  const ref = useDismiss(open, useCallback(() => setOpen(false), []));
  const deep = tone === 'deep';

  const current = LANGS.find((l) => l.code === lang)!;

  const handleSelect = (code: LangCode) => {
    setLang(code);
    setOpen(false);
    setCookie('NEXT_LOCALE', code, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    router.refresh();
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={clsx(s.root, deep && s.deep)}>
      <button
        className={s.trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="globe" size={17} strokeWidth={1.9} />
        {current.name}
        <Icon
          className={clsx(s.caret, open && s.caretOpen)}
          name="chevronDown"
          size={15}
        />
      </button>

      <div className={clsx(s.popover, open && s.popoverOpen, up && s.up)}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={clsx(s.option, l.code === lang && s.optionActive)}
            type="button"
            onClick={() => handleSelect(l.code)}
          >
            <span className={s.optionCode}>{l.label}</span>
            {l.name}
            {l.code === lang && <Icon className={s.check} name="check" size={16} />}
          </button>
        ))}
      </div>
    </div>
  );
}
