'use client';

import { useState } from 'react';
import MuiTextField from '@mui/material/TextField';

type Props = Omit<React.ComponentProps<typeof MuiTextField>, 'placeholder'> & {
  placeholder?: string;
};

export function FormTextField({ placeholder, onFocus, onBlur, ...props }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <MuiTextField
      {...props}
      placeholder={isFocused ? placeholder : undefined}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
    />
  );
}
