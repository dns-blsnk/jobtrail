'use client';

import Popover from '@mui/material/Popover';
import { UserMenuBody } from '@/shared/ui/user-menu/user-menu-body';
import type { AvatarUser } from '@/shared/ui/avatar/avatar';

interface UserMenuPopoverProps {
  anchorEl: HTMLButtonElement | null;
  user: AvatarUser;
  onClose: () => void;
  onLogout: () => void;
}

export function UserMenuPopover({ anchorEl, user, onClose, onLogout }: UserMenuPopoverProps) {
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{ paper: { sx: { width: 288, mt: 1.25, borderRadius: 2 } } }}
      onClose={onClose}
    >
      <UserMenuBody user={user} onClose={onClose} onLogout={onLogout} />
    </Popover>
  );
}
