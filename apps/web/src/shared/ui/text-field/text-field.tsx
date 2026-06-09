'use client';

import { useState } from 'react';
import styles from './text-field.module.scss';

interface TextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  prefix?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

export function TextField({ label, value, placeholder, type = 'text', error, prefix, autoComplete, onChange }: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (visible ? 'text' : 'password') : type;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputRow}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          autoComplete={autoComplete}
          className={`${styles.input} ${error ? styles.hasError : ''}`}
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
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
