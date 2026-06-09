'use client';

import { useState } from 'react';
import styles from './text-field.module.scss';

interface TextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

export function TextField({ label, value, placeholder, type = 'text', error, autoComplete, onChange }: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (visible ? 'text' : 'password') : type;

  const inputClass = [
    styles.input,
    error ? styles.hasError : '',
    isPassword ? styles.withToggle : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputRow}>
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
            className={styles.toggle}
            tabIndex={-1}
            type="button"
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      <div className={styles.errorSlot}>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
}
