import { useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { Block, BlockType } from '../model/use-editor-store';

interface Props {
  block: Block;
  sectionId: string;
  onUpdate: (content: string) => void;
  onSplit: (beforeContent: string, afterContent: string) => void;
  onMergeWithPrev: () => void;
  onChangeType: (type: BlockType) => void;
  autoFocus?: boolean;
  caretOffset?: number;
}

const getCaretOffset = (el: HTMLElement): number => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return 0;
  const range = sel.getRangeAt(0).cloneRange();
  range.selectNodeContents(el);
  range.setEnd(sel.getRangeAt(0).startContainer, sel.getRangeAt(0).startOffset);
  return range.toString().length;
};

const setCaretAtOffset = (el: HTMLElement, offset: number) => {
  const sel = window.getSelection();
  if (!sel) return;

  const range = document.createRange();
  let remaining = offset;
  let found = false;

  const walk = (node: Node) => {
    if (found) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const len = node.textContent?.length ?? 0;
      if (remaining <= len) {
        range.setStart(node, remaining);
        range.collapse(true);
        found = true;
      } else {
        remaining -= len;
      }
    } else {
      node.childNodes.forEach(walk);
    }
  };

  walk(el);
  if (!found) range.selectNodeContents(el);

  sel.removeAllRanges();
  sel.addRange(range);
};

const isCaretAtStart = (el: HTMLElement): boolean => {
  return getCaretOffset(el) === 0;
};

const splitAtCaret = (el: HTMLElement): { before: string; after: string } => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) {
    return { before: el.innerHTML, after: '' };
  }

  const range = sel.getRangeAt(0);

  const beforeRange = document.createRange();
  beforeRange.selectNodeContents(el);
  beforeRange.setEnd(range.startContainer, range.startOffset);
  const beforeFrag = beforeRange.cloneContents();
  const beforeDiv = document.createElement('div');
  beforeDiv.appendChild(beforeFrag);

  const afterRange = document.createRange();
  afterRange.selectNodeContents(el);
  afterRange.setStart(range.startContainer, range.startOffset);
  const afterFrag = afterRange.cloneContents();
  const afterDiv = document.createElement('div');
  afterDiv.appendChild(afterFrag);

  return { before: beforeDiv.innerHTML, after: afterDiv.innerHTML };
};

export const SortableBlock = ({
  block,
  onUpdate,
  onSplit,
  onMergeWithPrev,
  onChangeType,
  autoFocus,
  caretOffset,
}: Props) => {
  const ref = useRef<HTMLElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
      setCaretAtOffset(ref.current, 0);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (caretOffset !== undefined && ref.current) {
      ref.current.focus();
      setCaretAtOffset(ref.current, caretOffset);
    }
  }, [caretOffset]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { before, after } = splitAtCaret(ref.current!);
      onSplit(before, after);
    }

    if (e.key === 'Backspace' && ref.current && isCaretAtStart(ref.current)) {
      e.preventDefault();
      onMergeWithPrev();
    }
  };

  const sharedClassName = 'min-w-0 flex-1 focus:outline-none';
  const sharedEvents = {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (e: React.FocusEvent<HTMLElement>) =>
      onUpdate(e.currentTarget.innerHTML),
    onKeyDown: handleKeyDown,
    onPaste: (e: React.ClipboardEvent<HTMLElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    },
  };

  const renderEditable = () => {
    const html = { __html: block.content };
    switch (block.type) {
      case 'h1':
        return (
          <h1
            ref={ref as React.RefObject<HTMLHeadingElement>}
            {...sharedEvents}
            dangerouslySetInnerHTML={html}
            className={sharedClassName}
          />
        );
      case 'h2':
        return (
          <h2
            ref={ref as React.RefObject<HTMLHeadingElement>}
            {...sharedEvents}
            dangerouslySetInnerHTML={html}
            className={sharedClassName}
          />
        );
      case 'h3':
        return (
          <h3
            ref={ref as React.RefObject<HTMLHeadingElement>}
            {...sharedEvents}
            dangerouslySetInnerHTML={html}
            className={sharedClassName}
          />
        );
      case 'li':
        return (
          <li
            ref={ref as React.RefObject<HTMLLIElement>}
            {...sharedEvents}
            dangerouslySetInnerHTML={html}
            className={sharedClassName}
          />
        );
      default:
        return (
          <p
            ref={ref as React.RefObject<HTMLParagraphElement>}
            {...sharedEvents}
            dangerouslySetInnerHTML={html}
            className={sharedClassName}
          />
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group/block relative flex items-start gap-1 ${isDragging ? 'opacity-50' : ''} `}
    >
      {/* 블록 드래그 핸들 */}
      <button
        className="mt-1 flex-shrink-0 cursor-grab opacity-0 transition-opacity group-hover/block:opacity-100 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} className="text-text-muted" />
      </button>

      {/* 블록 타입 선택 */}
      <select
        value={block.type}
        onChange={(e) => onChangeType(e.target.value as BlockType)}
        className="mt-1 flex-shrink-0 cursor-pointer rounded border-none bg-transparent text-meta opacity-0 transition-opacity group-hover/block:opacity-100 focus:outline-none"
      >
        <option value="p">P</option>
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="li">LI</option>
      </select>

      {renderEditable()}
    </div>
  );
};
