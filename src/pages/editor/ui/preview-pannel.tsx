import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useEditorStore, type Block } from '../model/use-editor-store';

const renderNonLiBlock = (block: Block) => {
  const html = { __html: block.content };
  switch (block.type) {
    case 'h1':
      return <h1 key={block.id} dangerouslySetInnerHTML={html} />;
    case 'h2':
      return <h2 key={block.id} dangerouslySetInnerHTML={html} />;
    case 'h3':
      return <h3 key={block.id} dangerouslySetInnerHTML={html} />;
    default:
      return <p key={block.id} dangerouslySetInnerHTML={html} />;
  }
};

// 연속된 li 블록 ul로 묶어서 렌더링
const renderBlocks = (blocks: Block[]) => {
  const result: React.ReactNode[] = [];
  let liBuffer: Block[] = [];

  const flushLi = () => {
    if (liBuffer.length === 0) return;
    result.push(
      <ul key={liBuffer[0].id + '-ul'}>
        {liBuffer.map((b) => (
          <li key={b.id} dangerouslySetInnerHTML={{ __html: b.content }} />
        ))}
      </ul>,
    );
    liBuffer = [];
  };

  for (const block of blocks) {
    if (block.type === 'li') {
      liBuffer.push(block);
    } else {
      flushLi();
      result.push(renderNonLiBlock(block));
    }
  }

  flushLi();
  return result;
};

export const PreviewPannel = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const sections = useEditorStore((state) => state.sections);
  const visibleSections = sections.filter((s) => s.visible);

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 z-40 flex h-full transition-transform duration-500 ease-in-out ${
        isPreviewOpen ? 'translate-x-0' : '-translate-x-[calc(100%-20px)]'
      }`}
    >
      <div className="h-full w-[850px] overflow-y-auto bg-surface p-10 shadow-2xl">
        <div className="flex flex-col gap-8">
          <h2 className="text-xl font-bold text-text-body">프린트 미리보기</h2>
          <article className="a4-article min-h-a4 w-a4 origin-top scale-[0.9] shadow-md transition-transform">
            {visibleSections.length > 0 ? (
              visibleSections.map((section) => (
                <div key={section.id} className="mb-4">
                  {renderBlocks(section.blocks)}
                </div>
              ))
            ) : (
              <p className="text-center text-text-muted italic">
                보이기 상태인 섹션이 없습니다.
              </p>
            )}
          </article>
        </div>
      </div>

      <button
        onClick={() => setIsPreviewOpen(!isPreviewOpen)}
        className="group relative flex h-full w-10 cursor-pointer items-center justify-center bg-border-default transition-colors hover:bg-text-meta"
      >
        <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-paper shadow-lg transition-transform group-hover:scale-110">
          {isPreviewOpen ? (
            <ChevronLeft className="text-text-sub" />
          ) : (
            <ChevronRight className="text-text-sub" />
          )}
        </div>
        <span
          className="text-xs font-bold whitespace-nowrap text-text-sub uppercase [writing-mode:vertical-lr]"
          style={{ display: isPreviewOpen ? 'none' : 'block' }}
        >
          Preview
        </span>
      </button>
    </div>
  );
};
