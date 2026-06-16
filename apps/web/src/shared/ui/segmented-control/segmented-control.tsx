'use client';

import { clsx } from 'clsx';
import s from './segmented-control.module.scss';

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
    <div className={s.root} role="tablist">
      {options.map((option) => (
        <button
          key={option.value}
          aria-selected={value === option.value}
          className={clsx(s.option, value === option.value && s.active)}
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
