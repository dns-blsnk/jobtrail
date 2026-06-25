'use client';

import { useState } from 'react';
import s from './text-field.module.scss';

interface TextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

export function TextField({
  label,
  value,
  placeholder,
  type = 'text',
  error,
  autoComplete,
  onChange,
}: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (visible ? 'text' : 'password') : type;

  const inputClass = [s.input, error ? s.hasError : '', isPassword ? s.withToggle : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={s.wrapper}>
      <label className={s.label}>{label}</label>
      <div className={s.inputRow}>
        <input
          autoComplete={autoComplete}
          className={inputClass}
          placeholder={placeholder}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && (
          <button
            className={s.toggle}
            tabIndex={-1}
            type="button"
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      <div className={s.errorSlot}>{error && <span className={s.error}>{error}</span>}</div>
    </div>
  );
}
