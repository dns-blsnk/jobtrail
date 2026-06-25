'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next/client';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
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
  const listboxId = useId();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>('en');
  const deep = tone === 'deep';

  const current = LANGS.find((l) => l.code === lang)!;

  const handleSelect = (code: LangCode) => {
    setLang(code);
    setOpen(false);
    setCookie('NEXT_LOCALE', code, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    router.refresh();
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className={clsx(s.root, deep && s.deep)} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <button
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={s.trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <LanguageOutlinedIcon sx={{ fontSize: 17 }} />
        {current.name}
        <KeyboardArrowDownOutlinedIcon
          className={clsx(s.caret, open && s.caretOpen)}
          sx={{ fontSize: 15 }}
        />
      </button>

      <ul
        id={listboxId}
        aria-label="Language"
        className={clsx(s.popover, open && s.popoverOpen, up && s.up)}
        role="listbox"
      >
        {LANGS.map((l) => (
          <li key={l.code} role="option" aria-selected={l.code === lang}>
            <button
              className={clsx(s.option, l.code === lang && s.optionActive)}
              type="button"
              onClick={() => handleSelect(l.code)}
            >
              <span className={s.optionCode}>{l.label}</span>
              {l.name}
              {l.code === lang && <CheckOutlinedIcon className={s.check} sx={{ fontSize: 16 }} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
