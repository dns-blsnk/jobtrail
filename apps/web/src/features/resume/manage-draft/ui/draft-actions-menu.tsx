'use client';

import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Icon } from '@/shared/ui/icon/icon';
import { useDraftActions } from '@/features/resume/manage-draft/model/use-draft-actions';

interface DraftActionsMenuProps {
  draftId: string;
  onRenameStart: () => void;
}

export function DraftActionsMenu({ draftId, onRenameStart }: DraftActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const actions = useDraftActions(draftId);

  function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleRename() {
    handleClose();
    onRenameStart();
  }

  function handleDuplicate() {
    handleClose();
    actions.duplicate();
  }

  function handleDelete() {
    handleClose();
    actions.delete();
  }

  return (
    <>
      <button
        type="button"
        aria-label="Draft options"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={handleOpen}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ink-3)',
          flexShrink: 0,
          minWidth: '40px',
          height: '40px',
        }}
      >
        <Icon name="moreVertical" size={16} strokeWidth={2} />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        slotProps={{
          paper: {
            sx: {
              minWidth: 160,
              borderRadius: '8px',
              boxShadow: 'var(--sh-pop)',
            },
          },
        }}
      >
        <MenuItem onClick={handleRename}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Icon name="pencil" size={14} strokeWidth={1.9} />
          </ListItemIcon>
          <ListItemText primary="Rename" />
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Icon name="copy" size={14} strokeWidth={1.9} />
          </ListItemIcon>
          <ListItemText primary="Duplicate" />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ minWidth: 32, color: 'error.main' }}>
            <Icon name="trash" size={14} strokeWidth={1.9} />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
}
