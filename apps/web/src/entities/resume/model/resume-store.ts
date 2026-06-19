'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Draft,
  BlockType,
  BlockData,
  TemplateId,
} from '@/entities/resume/model/types';

interface ResumeStore {
  drafts: Draft[];
  activeDraftId: string | null;
  createDraft: (name?: string) => void;
  deleteDraft: (id: string) => void;
  duplicateDraft: (id: string) => void;
  renameDraft: (id: string, name: string) => void;
  setActiveDraft: (id: string) => void;
  setDraftTemplate: (id: string, templateId: TemplateId) => void;
  addBlock: (type: BlockType) => string;
  addBlockWithData: (blockData: BlockData) => string;
  updateBlock: (blockId: string, blockData: BlockData) => void;
  removeBlock: (blockId: string) => void;
  reorderBlocks: (newOrder: string[]) => void;
}

function createDefaultBlockData(type: BlockType): BlockData {
  switch (type) {
    case 'header':
      return {
        type: 'header',
        data: {
          firstName: '',
          lastName: '',
          jobTitle: '',
          email: '',
          photoShape: 'circle',
        },
      };
    case 'summary':
      return { type: 'summary', data: { sectionTitle: '', text: '' } };
    case 'experience':
      return { type: 'experience', data: { items: [] } };
    case 'education':
      return { type: 'education', data: { items: [] } };
    case 'skills':
      return { type: 'skills', data: { groups: [] } };
    case 'projects':
      return { type: 'projects', data: { items: [] } };
    case 'languages':
      return { type: 'languages', data: { items: [] } };
    case 'certifications':
      return { type: 'certifications', data: { items: [] } };
    case 'social-links':
      return { type: 'social-links', data: { items: [] } };
    case 'awards':
      return { type: 'awards', data: { items: [] } };
    case 'custom':
      return { type: 'custom', data: { sectionTitle: '', content: '' } };
  }
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      drafts: [],
      activeDraftId: null,

      createDraft: (name?: string) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const headerBlockId = crypto.randomUUID();
        const draft: Draft = {
          id,
          name: name ?? 'Untitled Resume',
          templateId: 'classic',
          createdAt: now,
          updatedAt: now,
          blocks: [
            {
              id: headerBlockId,
              blockData: createDefaultBlockData('header'),
            },
          ],
        };
        set((state) => ({
          drafts: [...state.drafts, draft],
          activeDraftId: id,
        }));
      },

      deleteDraft: (id: string) => {
        set((state) => {
          const remaining = state.drafts.filter((d) => d.id !== id);
          const newActiveId =
            state.activeDraftId === id
              ? (remaining[remaining.length - 1]?.id ?? null)
              : state.activeDraftId;
          return { drafts: remaining, activeDraftId: newActiveId };
        });
      },

      duplicateDraft: (id: string) => {
        const { drafts } = get();
        const source = drafts.find((d) => d.id === id);
        if (!source) return;
        const newId = crypto.randomUUID();
        const now = new Date().toISOString();
        const duplicate: Draft = {
          ...source,
          id: newId,
          name: `${source.name} (copy)`,
          createdAt: now,
          updatedAt: now,
          blocks: source.blocks.map((b) => ({
            ...b,
            id: crypto.randomUUID(),
          })),
        };
        set((state) => ({
          drafts: [...state.drafts, duplicate],
          activeDraftId: newId,
        }));
      },

      renameDraft: (id: string, name: string) => {
        set((state) => ({
          drafts: state.drafts.map((d) =>
            d.id === id ? { ...d, name, updatedAt: new Date().toISOString() } : d
          ),
        }));
      },

      setActiveDraft: (id: string) => {
        set({ activeDraftId: id });
      },

      setDraftTemplate: (id: string, templateId: TemplateId) => {
        set((state) => ({
          drafts: state.drafts.map((d) =>
            d.id === id
              ? { ...d, templateId, updatedAt: new Date().toISOString() }
              : d
          ),
        }));
      },

      addBlock: (type: BlockType): string => {
        const { drafts, activeDraftId } = get();
        if (!activeDraftId) return '';
        const blockId = crypto.randomUUID();
        const blockData = createDefaultBlockData(type);
        set((state) => ({
          drafts: state.drafts.map((d) =>
            d.id === activeDraftId
              ? {
                  ...d,
                  updatedAt: new Date().toISOString(),
                  blocks: [...d.blocks, { id: blockId, blockData }],
                }
              : d
          ),
        }));
        void drafts;
        return blockId;
      },

      addBlockWithData: (blockData: BlockData): string => {
        const { activeDraftId } = get();
        if (!activeDraftId) return '';
        const blockId = crypto.randomUUID();
        set((state) => ({
          drafts: state.drafts.map((d) =>
            d.id === activeDraftId
              ? {
                  ...d,
                  updatedAt: new Date().toISOString(),
                  blocks: [...d.blocks, { id: blockId, blockData }],
                }
              : d
          ),
        }));
        return blockId;
      },

      updateBlock: (blockId: string, blockData: BlockData) => {
        const { activeDraftId } = get();
        if (!activeDraftId) return;
        set((state) => ({
          drafts: state.drafts.map((d) =>
            d.id === activeDraftId
              ? {
                  ...d,
                  updatedAt: new Date().toISOString(),
                  blocks: d.blocks.map((b) =>
                    b.id === blockId ? { ...b, blockData } : b
                  ),
                }
              : d
          ),
        }));
      },

      removeBlock: (blockId: string) => {
        const { activeDraftId } = get();
        if (!activeDraftId) return;
        set((state) => ({
          drafts: state.drafts.map((d) =>
            d.id === activeDraftId
              ? {
                  ...d,
                  updatedAt: new Date().toISOString(),
                  blocks: d.blocks.filter((b) => b.id !== blockId),
                }
              : d
          ),
        }));
      },

      reorderBlocks: (newOrder: string[]) => {
        const { activeDraftId } = get();
        if (!activeDraftId) return;
        set((state) => ({
          drafts: state.drafts.map((d) => {
            if (d.id !== activeDraftId) return d;
            const blockMap = new Map(d.blocks.map((b) => [b.id, b]));
            const reordered = newOrder
              .map((id) => blockMap.get(id))
              .filter((b): b is (typeof d.blocks)[number] => b !== undefined);
            return {
              ...d,
              updatedAt: new Date().toISOString(),
              blocks: reordered,
            };
          }),
        }));
      },
    }),
    { name: 'job-tracker-resume' }
  )
);
