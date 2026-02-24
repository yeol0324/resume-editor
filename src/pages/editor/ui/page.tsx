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
import { useEditorStore } from '../model/use-editor-store';
import { PreviewPannel } from './preview-pannel';
import { SortableSection } from './sortable-section';

export const EditorPage = () => {
  const {
    sections,
    addSection,
    removeSection,
    toggleVisible,
    updateHtml,
    reorder,
  } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // 5px 이상 움직여야 드래그 시작
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);

    reorder(oldIndex, newIndex);
  };

  return (
    <div className="relative flex page-bg overflow-hidden">
      <PreviewPannel />
      <main className="ml-10 flex-1 p-10">
        <div className="max-w-a4 mx-auto">
          <header className="mb-section flex items-center justify-between">
            <h1 className="text-3xl font-bold text-text-primary">
              이력서 에디터
            </h1>
            <button onClick={addSection} className="btn-primary">
              섹션 추가하기
            </button>
          </header>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {sections.map((section) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    onToggleVisible={toggleVisible}
                    onRemove={removeSection}
                    onUpdateHtml={updateHtml}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </main>
    </div>
  );
};
