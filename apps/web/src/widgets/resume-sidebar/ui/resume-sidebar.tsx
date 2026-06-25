'use client';

import { clsx } from 'clsx';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CreateDraftButton } from '@/features/resume/manage-draft/ui/create-draft-button';
import { DraftCard } from '@/widgets/resume-sidebar/ui/draft-card';
import s from './resume-sidebar.module.scss';

interface ResumeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeSidebar({ isOpen, onClose }: ResumeSidebarProps) {
  const { drafts, activeDraftId } = useResumeStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLoading = false;

  function handleDraftSelect(_id: string) {
    onClose();
  }

  return (
    <aside className={clsx(s.sidebar, isOpen && s.sidebarOpen)} aria-label="Resume drafts">
      {isLoading && isMobile ? (
        <div className={s.sidebarHeader}>
          <Skeleton
            variant="rectangular"
            width={120}
            height={32}
            animation="wave"
            sx={{ borderRadius: '6px' }}
          />
          <Skeleton variant="circular" width={32} height={32} animation="wave" />
        </div>
      ) : (
        <div className={s.sidebarHeader}>
          <h2 className={s.sidebarTitle}>Drafts</h2>
          <button
            type="button"
            className={s.closeBtn}
            onClick={onClose}
            aria-label="Close drafts panel"
          >
            <CloseOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      )}

      {!isLoading && (
        <div className={s.sidebarCreate}>
          <CreateDraftButton />
        </div>
      )}

      <div className={s.draftList} role="list">
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[0, 1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="100%"
                height={isMobile ? 64 : 56}
                animation="wave"
                sx={{ borderRadius: '8px' }}
              />
            ))}
          </Box>
        ) : (
          <>
            {drafts.length === 0 && <p className={s.emptyText}>No drafts yet</p>}
            {drafts.map((draft) => (
              <div key={draft.id} role="listitem">
                <DraftCard
                  draft={draft}
                  isActive={draft.id === activeDraftId}
                  onSelect={handleDraftSelect}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </aside>
  );
}
