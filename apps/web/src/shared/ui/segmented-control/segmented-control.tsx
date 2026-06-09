'use client';

import styles from './segmented-control.module.scss';

interface Option<T extends string> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <div className={styles.root} role="tablist">
      {options.map((option) => (
        <button
          key={option.value}
          aria-selected={value === option.value}
          className={`${styles.option} ${value === option.value ? styles.active : ''}`}
          role="tab"
          type="button"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
