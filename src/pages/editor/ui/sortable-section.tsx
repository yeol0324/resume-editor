import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Eye, EyeClosed, ListChevronsUpDown, Trash } from 'lucide-react';
import type { Section } from '../model/use-editor-store';

interface Props {
  section: Section;
  onToggleVisible: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateHtml: (id: string, html: string) => void;
}

export const SortableSection = ({
  section,
  onToggleVisible,
  onRemove,
  onUpdateHtml,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`group relative min-h-[100px] w-full bg-paper p-8 shadow-sm transition-opacity ${
        !section.visible ? 'opacity-50' : ''
      } ${isDragging ? 'z-50 shadow-xl ring-2 ring-blue-300' : ''}`}
    >
      <div className="absolute top-0 left-0 flex items-center gap-2">
        <button
          onClick={() => onToggleVisible(section.id)}
          className="btn-ghost"
          title={section.visible ? '숨기기' : '보이기'}
        >
          {section.visible ? <Eye /> : <EyeClosed />}
        </button>
        <button
          onClick={() => onRemove(section.id)}
          className="btn-ghost btn-danger"
          title="삭제"
        >
          <Trash />
        </button>

        <button
          className="btn-ghost cursor-grab active:cursor-grabbing"
          title="이동"
          {...attributes}
          {...listeners}
        >
          <ListChevronsUpDown />
        </button>
      </div>

      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdateHtml(section.id, e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: section.html }}
        className="prose prose-slate max-w-none focus:outline-none"
      />
    </article>
  );
};
