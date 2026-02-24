import { create } from 'zustand';

export type BlockType = 'p' | 'h1' | 'h2' | 'h3' | 'li';

export type Block = {
  id: string;
  type: BlockType;
  content: string;
};

export type Section = {
  id: string;
  visible: boolean;
  blocks: Block[];
};

const createBlock = (content = '', type: BlockType = 'p'): Block => ({
  id: crypto.randomUUID(),
  type,
  content,
});

const createSection = (): Section => ({
  id: crypto.randomUUID(),
  visible: true,
  blocks: [createBlock()],
});

const updateBlocksInSection = (
  sections: Section[],
  sectionId: string,
  updater: (blocks: Block[]) => Block[],
): Section[] =>
  sections.map((s) =>
    s.id === sectionId ? { ...s, blocks: updater(s.blocks) } : s,
  );

type EditorStore = {
  sections: Section[];

  addSection: () => void;
  removeSection: (sectionId: string) => void;
  toggleVisible: (sectionId: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;

  updateBlock: (sectionId: string, blockId: string, content: string) => void;
  changeBlockType: (
    sectionId: string,
    blockId: string,
    type: BlockType,
  ) => void;

  splitBlock: (
    sectionId: string,
    blockId: string,
    beforeContent: string,
    afterContent: string,
  ) => string;

  mergeWithPrev: (
    sectionId: string,
    blockId: string,
  ) => { prevBlockId: string; caretOffset: number } | null;

  reorderBlocks: (
    sectionId: string,
    fromIndex: number,
    toIndex: number,
  ) => void;

  removeBlock: (sectionId: string, blockId: string) => void;
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  sections: [
    {
      id: 'section-1',
      visible: true,
      blocks: [
        { id: 'block-1', type: 'p', content: '안녕하세요' },
        { id: 'block-2', type: 'p', content: '반갑습니다' },
      ],
    },
    {
      id: 'section-2',
      visible: true,
      blocks: [
        { id: 'block-3', type: 'h2', content: '경력' },
        { id: 'block-4', type: 'p', content: '회사 A' },
        { id: 'block-5', type: 'p', content: '회사 B' },
      ],
    },
  ],

  addSection: () =>
    set((state) => ({
      sections: [...state.sections, createSection()],
    })),

  removeSection: (sectionId) =>
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== sectionId),
    })),

  toggleVisible: (sectionId) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s,
      ),
    })),

  reorderSections: (fromIndex, toIndex) =>
    set((state) => {
      const result = [...state.sections];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return { sections: result };
    }),

  updateBlock: (sectionId, blockId, content) =>
    set((state) => ({
      sections: updateBlocksInSection(state.sections, sectionId, (blocks) =>
        blocks.map((b) => (b.id === blockId ? { ...b, content } : b)),
      ),
    })),

  changeBlockType: (sectionId, blockId, type) =>
    set((state) => ({
      sections: updateBlocksInSection(state.sections, sectionId, (blocks) =>
        blocks.map((b) => (b.id === blockId ? { ...b, type } : b)),
      ),
    })),

  splitBlock: (sectionId, blockId, beforeContent, afterContent) => {
    const newBlock = createBlock(afterContent);

    set((state) => ({
      sections: updateBlocksInSection(state.sections, sectionId, (blocks) => {
        const idx = blocks.findIndex((b) => b.id === blockId);
        if (idx === -1) return blocks;
        const updated = [...blocks];
        updated[idx] = { ...updated[idx], content: beforeContent };
        updated.splice(idx + 1, 0, newBlock);
        return updated;
      }),
    }));

    return newBlock.id;
  },

  mergeWithPrev: (sectionId, blockId) => {
    const section = get().sections.find((s) => s.id === sectionId);
    if (!section) return null;

    const idx = section.blocks.findIndex((b) => b.id === blockId);
    if (idx <= 0) return null;

    const prevBlock = section.blocks[idx - 1];
    const currentBlock = section.blocks[idx];
    const caretOffset = prevBlock.content.length;

    set((state) => ({
      sections: updateBlocksInSection(state.sections, sectionId, (blocks) => {
        const updated = [...blocks];
        updated[idx - 1] = {
          ...updated[idx - 1],
          content: prevBlock.content + currentBlock.content,
        };
        updated.splice(idx, 1);
        return updated;
      }),
    }));

    return { prevBlockId: prevBlock.id, caretOffset };
  },

  reorderBlocks: (sectionId, fromIndex, toIndex) =>
    set((state) => ({
      sections: updateBlocksInSection(state.sections, sectionId, (blocks) => {
        const result = [...blocks];
        const [removed] = result.splice(fromIndex, 1);
        result.splice(toIndex, 0, removed);
        return result;
      }),
    })),

  removeBlock: (sectionId, blockId) =>
    set((state) => ({
      sections: updateBlocksInSection(state.sections, sectionId, (blocks) => {
        if (blocks.length === 1) return blocks; // 마지막 블록은 삭제 불가
        return blocks.filter((b) => b.id !== blockId);
      }),
    })),
}));
