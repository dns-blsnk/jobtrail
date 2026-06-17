'use client';

import Drawer from '@mui/material/Drawer';
import { UserMenuBody } from '@/shared/ui/user-menu/user-menu-body';
import type { AvatarUser } from '@/shared/ui/avatar/avatar';

interface UserMenuDrawerProps {
  open: boolean;
  user: AvatarUser;
  onClose: () => void;
  onLogout: () => void;
}

export function UserMenuDrawer({ open, user, onClose, onLogout }: UserMenuDrawerProps) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      slotProps={{
        paper: { sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '85vh' } },
      }}
      onClose={onClose}
    >
      <UserMenuBody user={user} onClose={onClose} onLogout={onLogout} />
    </Drawer>
  );
}
