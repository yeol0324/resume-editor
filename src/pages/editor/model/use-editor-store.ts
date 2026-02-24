import { create } from 'zustand';

export type Section = {
  id: string;
  visible: boolean;
  order: number;
  html: string;
};

type EditorStore = {
  sections: Section[];
  addSection: () => void;
  removeSection: (id: string) => void;
  toggleVisible: (id: string) => void;
  updateHtml: (id: string, html: string) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  sections: [
    {
      id: 'uuid-1',
      visible: true,
      order: 0,
      html: '<p>안녕하세요</p>',
    },
    {
      id: 'uuid-2',
      visible: true,
      order: 1,
      html: '<h2>경력</h2><p>회사 A</p>',
    },
  ],

  addSection: () =>
    set((state) => ({
      sections: [
        ...state.sections,
        {
          id: crypto.randomUUID(),
          visible: true,
          order: state.sections.length,
          html: '',
        },
      ],
    })),

  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
    })),

  toggleVisible: (id) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, visible: !s.visible } : s,
      ),
    })),

  updateHtml: (id, html) =>
    set((state) => ({
      sections: state.sections.map((s) => (s.id === id ? { ...s, html } : s)),
    })),

  reorder: (fromIndex, toIndex) =>
    set((state) => {
      const result = [...state.sections];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return {
        sections: result.map((s, idx) => ({ ...s, order: idx })),
      };
    }),
}));
