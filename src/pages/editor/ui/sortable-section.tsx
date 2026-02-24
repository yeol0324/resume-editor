import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Eye, EyeClosed, GripVertical, Trash } from 'lucide-react';
import type { Section, Block, BlockType } from '../model/use-editor-store';
import { useEditorStore } from '../model/use-editor-store';
import { SortableBlock } from './sortable-block';

// 연속된 li 블록을 그룹으로 묶기
type BlockGroup =
  | { type: 'single'; block: Block }
  | { type: 'li-group'; blocks: Block[] };

const groupBlocks = (blocks: Block[]): BlockGroup[] => {
  const groups: BlockGroup[] = [];
  let liBuffer: Block[] = [];

  const flushLi = () => {
    if (liBuffer.length === 0) return;
    groups.push({ type: 'li-group', blocks: [...liBuffer] });
    liBuffer = [];
  };

  for (const block of blocks) {
    if (block.type === 'li') {
      liBuffer.push(block);
    } else {
      flushLi();
      groups.push({ type: 'single', block });
    }
  }
  flushLi();
  return groups;
};

interface Props {
  section: Section;
  onToggleVisible: (id: string) => void;
  onRemove: (id: string) => void;
}

export const SortableSection = ({
  section,
  onToggleVisible,
  onRemove,
}: Props) => {
  const {
    updateBlock,
    changeBlockType,
    splitBlock,
    mergeWithPrev,
    reorderBlocks,
  } = useEditorStore();

  const [newBlockId, setNewBlockId] = useState<string | null>(null);
  const [mergeTarget, setMergeTarget] = useState<{
    blockId: string;
    caretOffset: number;
  } | null>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = section.blocks.findIndex((b) => b.id === active.id);
    const newIndex = section.blocks.findIndex((b) => b.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      reorderBlocks(section.id, oldIndex, newIndex);
    }
  };

  const handleSplit = (blockId: string, before: string, after: string) => {
    const newId = splitBlock(section.id, blockId, before, after);
    setNewBlockId(newId);
    setMergeTarget(null);
  };

  const handleMerge = (blockId: string) => {
    const result = mergeWithPrev(section.id, blockId);
    if (result) {
      setMergeTarget({
        blockId: result.prevBlockId,
        caretOffset: result.caretOffset,
      });
      setNewBlockId(null);
    }
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`group/section relative w-full bg-paper p-6 pt-section shadow-sm transition-opacity ${!section.visible ? 'opacity-50' : ''} ${isDragging ? 'z-50 shadow-xl ring-2 ring-accent' : ''} `}
    >
      <div className="absolute top-1 left-1 flex items-center gap-1 opacity-0 transition-opacity group-hover/section:opacity-100">
        <button
          onClick={() => onToggleVisible(section.id)}
          className="btn-ghost"
          title={section.visible ? '숨기기' : '보이기'}
        >
          {section.visible ? <Eye size={14} /> : <EyeClosed size={14} />}
        </button>

        <button
          onClick={() => onRemove(section.id)}
          className="btn-ghost btn-danger"
          title="삭제"
        >
          <Trash size={14} />
        </button>

        <button
          className="btn-ghost cursor-grab active:cursor-grabbing"
          title="섹션 이동"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={14} />
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={section.blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-1">
            {groupBlocks(section.blocks).map((group) => {
              if (group.type === 'li-group') {
                return (
                  <ul key={group.blocks[0].id + '-ul'} className="bullet-list">
                    {group.blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        sectionId={section.id}
                        autoFocus={block.id === newBlockId}
                        caretOffset={
                          mergeTarget?.blockId === block.id
                            ? mergeTarget.caretOffset
                            : undefined
                        }
                        onUpdate={(content) =>
                          updateBlock(section.id, block.id, content)
                        }
                        onSplit={(before, after) =>
                          handleSplit(block.id, before, after)
                        }
                        onMergeWithPrev={() => handleMerge(block.id)}
                        onChangeType={(type: BlockType) =>
                          changeBlockType(section.id, block.id, type)
                        }
                      />
                    ))}
                  </ul>
                );
              }

              const block = group.block;
              return (
                <SortableBlock
                  key={block.id}
                  block={block}
                  sectionId={section.id}
                  autoFocus={block.id === newBlockId}
                  caretOffset={
                    mergeTarget?.blockId === block.id
                      ? mergeTarget.caretOffset
                      : undefined
                  }
                  onUpdate={(content) =>
                    updateBlock(section.id, block.id, content)
                  }
                  onSplit={(before, after) =>
                    handleSplit(block.id, before, after)
                  }
                  onMergeWithPrev={() => handleMerge(block.id)}
                  onChangeType={(type: BlockType) =>
                    changeBlockType(section.id, block.id, type)
                  }
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </article>
  );
};
