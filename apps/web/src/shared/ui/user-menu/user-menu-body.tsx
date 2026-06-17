'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { Icon } from '@/shared/ui/icon/icon';
import { SegmentedControl } from '@/shared/ui/segmented-control/segmented-control';
import { Avatar } from '@/shared/ui/avatar/avatar';
import type { AvatarUser } from '@/shared/ui/avatar/avatar';

interface UserMenuBodyProps {
  user: AvatarUser;
  onClose: () => void;
  onLogout: () => void;
}

export function UserMenuBody({ user, onClose, onLogout }: UserMenuBodyProps) {
  const t = useTranslations('userMenu');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const themeOptions = [
    { label: t('themeLight'), value: 'light' as const },
    { label: t('themeDark'), value: 'dark' as const },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, pt: 1.5, pb: 1.5, minWidth: 260 }}>
        <Avatar loggedIn size={44} user={user} />
        <Box sx={{ minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 600 }} variant="body2">
            {user.name ?? t('fallbackName')}
          </Typography>
          <Typography noWrap color="text.secondary" variant="caption">
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <MenuList disablePadding>
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <Icon name="userCircle" size={18} strokeWidth={1.9} />
          </ListItemIcon>
          {t('profile')}
        </MenuItem>

        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <Icon name="bookmark" size={18} strokeWidth={1.9} />
          </ListItemIcon>
          {t('myApplications')}
          <Typography
            component="span"
            variant="caption"
            sx={{ ml: 'auto', bgcolor: 'primary.main', color: 'primary.contrastText', px: 0.75, py: 0.25, borderRadius: 10, fontWeight: 700 }}
          >
            12
          </Typography>
        </MenuItem>

        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <Icon name="creditCard" size={18} strokeWidth={1.9} />
          </ListItemIcon>
          {t('subscription')}
          <Typography color="text.disabled" variant="caption" sx={{ ml: 'auto' }}>
            {t('subscriptionFree')}
          </Typography>
        </MenuItem>

        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <Icon name="settings" size={18} strokeWidth={1.9} />
          </ListItemIcon>
          {t('settings')}
        </MenuItem>
      </MenuList>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}
        >
          <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={18} strokeWidth={1.9} />
          {t('theme')}
        </Typography>
        <SegmentedControl options={themeOptions} value={theme} onChange={setTheme} />
      </Box>

      <Divider />

      <MenuList disablePadding>
        <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <Icon name="logOut" size={18} strokeWidth={1.9} />
          </ListItemIcon>
          {t('logOut')}
        </MenuItem>
      </MenuList>
    </>
  );
}