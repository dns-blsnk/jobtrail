'use client';

import { clsx } from 'clsx';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useResumeStore } from '@/entities/resume/model/resume-store';
import { BlockWrapper } from '@/widgets/resume-block/ui/block-wrapper';
import { AddBlockButton } from '@/widgets/resume-block/ui/add-block-button';
import { TemplatePicker } from '@/widgets/resume-editor/ui/template-picker';
import { BlockHeader } from '@/widgets/resume-block/ui/blocks/block-header';
import { BlockSummary } from '@/widgets/resume-block/ui/blocks/block-summary';
import { BlockExperience } from '@/widgets/resume-block/ui/blocks/block-experience';
import { BlockEducation } from '@/widgets/resume-block/ui/blocks/block-education';
import { BlockSkills } from '@/widgets/resume-block/ui/blocks/block-skills';
import { BlockProjects } from '@/widgets/resume-block/ui/blocks/block-projects';
import { BlockLanguages } from '@/widgets/resume-block/ui/blocks/block-languages';
import { BlockCertifications } from '@/widgets/resume-block/ui/blocks/block-certifications';
import { BlockSocialLinks } from '@/widgets/resume-block/ui/blocks/block-social-links';
import { BlockAwards } from '@/widgets/resume-block/ui/blocks/block-awards';
import { BlockCustom } from '@/widgets/resume-block/ui/blocks/block-custom';
import type { ResumeBlock } from '@/entities/resume/model/types';
import s from './resume-editor.module.scss';

interface ResumeEditorProps {
  isPreview: boolean;
}

function isBlockEmpty(block: ResumeBlock): boolean {
  const bd = block.blockData;
  switch (bd.type) {
    case 'header':
      return !bd.data.firstName && !bd.data.lastName && !bd.data.jobTitle;
    case 'summary':
      return !bd.data.text;
    case 'experience':
      return bd.data.items.length === 0;
    case 'education':
      return bd.data.items.length === 0;
    case 'skills':
      return bd.data.groups.length === 0;
    case 'projects':
      return bd.data.items.length === 0;
    case 'languages':
      return bd.data.items.length === 0;
    case 'certifications':
      return bd.data.items.length === 0;
    case 'social-links':
      return bd.data.items.length === 0;
    case 'awards':
      return bd.data.items.length === 0;
    case 'custom':
      return !bd.data.sectionTitle && !bd.data.content;
  }
}

function renderBlockContent(block: ResumeBlock): React.ReactNode {
  const bd = block.blockData;
  switch (bd.type) {
    case 'header':
      return <BlockHeader data={bd.data} />;
    case 'summary':
      return <BlockSummary data={bd.data} />;
    case 'experience':
      return <BlockExperience data={bd.data} />;
    case 'education':
      return <BlockEducation data={bd.data} />;
    case 'skills':
      return <BlockSkills data={bd.data} />;
    case 'projects':
      return <BlockProjects data={bd.data} />;
    case 'languages':
      return <BlockLanguages data={bd.data} />;
    case 'certifications':
      return <BlockCertifications data={bd.data} />;
    case 'social-links':
      return <BlockSocialLinks data={bd.data} />;
    case 'awards':
      return <BlockAwards data={bd.data} />;
    case 'custom':
      return <BlockCustom data={bd.data} />;
  }
}

export function ResumeEditor({ isPreview }: ResumeEditorProps) {
  const { drafts, activeDraftId, reorderBlocks } = useResumeStore();
  const activeDraft = drafts.find((d) => d.id === activeDraftId) ?? null;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  if (!activeDraft) {
    return (
      <div className={s.editor}>
        <div className={s.emptyState}>
          <p className={s.emptyStateText}>Create your first draft to get started</p>
        </div>
      </div>
    );
  }

  const headerBlock = activeDraft.blocks[0] ?? null;
  const sortableBlocks = activeDraft.blocks.slice(1);
  const sortableIds = sortableBlocks.map((b) => b.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortableIds.indexOf(active.id as string);
    const newIndex = sortableIds.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    const newSortable = [...sortableIds];
    newSortable.splice(oldIndex, 1);
    newSortable.splice(newIndex, 0, active.id as string);

    const newOrder = headerBlock
      ? [headerBlock.id, ...newSortable]
      : newSortable;
    reorderBlocks(newOrder);
  }

  return (
    <div className={s.editor}>
      <TemplatePicker draftId={activeDraft.id} activeTemplate={activeDraft.templateId} />
      <div
        className={clsx(
          s.canvas,
          s[`template_${activeDraft.templateId}`],
          isPreview && s.previewMode
        )}
      >
        {headerBlock && (
          <BlockWrapper
            id={headerBlock.id}
            isHeader
            isPreview={isPreview}
            isEmpty={isBlockEmpty(headerBlock)}
            blockType={headerBlock.blockData.type}
          >
            {renderBlockContent(headerBlock)}
          </BlockWrapper>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
            {sortableBlocks.map((block) => (
              <BlockWrapper
                key={block.id}
                id={block.id}
                isHeader={false}
                isPreview={isPreview}
                isEmpty={isBlockEmpty(block)}
                blockType={block.blockData.type}
              >
                {renderBlockContent(block)}
              </BlockWrapper>
            ))}
          </SortableContext>
        </DndContext>

        {!isPreview && <AddBlockButton />}
      </div>
    </div>
  );
}
