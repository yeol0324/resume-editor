import { PreviewPannel } from './preview-pannel';
import { useEditorStore } from '../model/use-editor-store';

export const EditorPage = () => {
  const { sections, addSection, removeSection, toggleVisible, updateHtml } =
    useEditorStore();

  return (
    <div className="page-bg relative flex overflow-hidden">
      <PreviewPannel />

      <main className="ml-10 flex-1 p-10 transition-all duration-500 ease-in-out">
        <div className="mx-auto max-w-a4">
          <header className="mb-section flex items-center justify-between">
            <h1 className="text-3xl font-bold text-text-primary">
              이력서 에디터
            </h1>
            <button onClick={addSection} className="btn-primary">
              섹션 추가하기
            </button>
          </header>

          <div className="flex flex-col gap-4">
            {sections.map((section) => (
              <article
                key={section.id}
                className={`group relative min-h-[100px] w-full bg-paper p-8 shadow-sm transition-opacity ${
                  !section.visible ? 'opacity-50' : ''
                }`}
              >
                {/* 섹션 컨트롤러 */}
                <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => toggleVisible(section.id)}
                    className="btn-ghost"
                    title={section.visible ? '숨기기' : '보이기'}
                  >
                    {section.visible ? '👁️' : '🚫'}
                  </button>
                  <button
                    onClick={() => removeSection(section.id)}
                    className="btn-ghost btn-danger"
                    title="삭제"
                  >
                    🗑️
                  </button>
                </div>

                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateHtml(section.id, e.currentTarget.innerHTML)
                  }
                  dangerouslySetInnerHTML={{ __html: section.html }}
                  className="prose prose-slate max-w-none focus:outline-none"
                />
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
