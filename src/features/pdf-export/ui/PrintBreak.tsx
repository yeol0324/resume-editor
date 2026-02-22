import { type FC, useLayoutEffect, useRef, useState } from 'react';

interface PrintBreakProps {
  /**
   * 가이드 라인 표시 여부와 연동되어 화면상 공간 차지 여부를 결정합니다.
   * @default true
   */
  show?: boolean;
  /**
   * 인쇄 시 적용할 상단 여백 (예: '20px', '2rem')
   * @default 0
   */
  marginTop?: string | number;
  /**
   * 인쇄 시 적용할 하단 여백 (예: '20px', '2rem')
   * @default 0
   */
  marginBottom?: string | number;
}

/**
 * 강제로 페이지를 나누고 여백을 조절할 수 있는 컴포넌트입니다.
 * 화면에서는 점선으로 표시되며, 인쇄 시에는 페이지가 나뉩니다.
 * `show`가 true이고 가이드가 활성화된 경우 화면 뷰에서도 실제 인쇄 시와 동일한 공간을 차지하도록 높이를 자동 계산합니다.
 *
 * @component
 * @example
 * ```tsx
 * <PrintBreak show={showGuide} marginTop="20px" />
 * ```
 */
export const PrintBreak: FC<PrintBreakProps> = ({
  show = true,
  marginTop = 0,
  marginBottom = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paddingHeight, setPaddingHeight] = useState(0);

  useLayoutEffect(() => {
    const calculatePadding = () => {
      if (!show) {
        if (paddingHeight !== 0) {
          setPaddingHeight(0);
        }
        return;
      }

      if (!containerRef.current) return;

      // 297mm를 픽셀로 정확히 측정하기 위해 더미 엘리먼트 사용
      const dummy = document.createElement('div');
      dummy.style.height = '297mm';
      dummy.style.visibility = 'hidden';
      dummy.style.position = 'absolute';
      document.body.appendChild(dummy);
      const pageHeightPx = dummy.offsetHeight || (297 * 96) / 25.4;
      document.body.removeChild(dummy);

      // PrintBreak의 상단 위치 (article 기준)
      const offsetTop = containerRef.current.offsetTop;

      // 현재 페이지에서 사용 중인 공간 계산
      const spaceUsed = offsetTop % pageHeightPx;

      // 다음 페이지 시작점까지 필요한 높이 계산
      const newPadding = spaceUsed > 0 ? pageHeightPx - spaceUsed : 0;

      if (Math.abs(paddingHeight - newPadding) > 1) {
        setPaddingHeight(newPadding);
      }
    };

    // 초기 계산 또는 상태 변경 시 실행 (Next Frame에서 실행하여 동기 setState 경고 회피)
    const rafId = requestAnimationFrame(calculatePadding);

    window.addEventListener('resize', calculatePadding);

    // 이미지 로드 등으로 높이가 변할 수 있으므로 지연 후 재계산
    const timer = setTimeout(calculatePadding, 500);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', calculatePadding);
      clearTimeout(timer);
    };
  }, [marginTop, show, paddingHeight]);

  return (
    <>
      {/* Screen view - Visual indicator */}
      <div
        ref={containerRef}
        className={`my-4 flex-col items-center justify-center gap-2 text-xs text-gray-400 print:hidden ${
          show ? 'flex' : 'hidden'
        }`}
        style={{
          marginTop,
          marginBottom,
        }}
      >
        <div className="flex w-full items-center gap-2">
          <div className="h-px w-full flex-1 border-b border-dashed border-gray-300" />
          <span className="shrink-0">Page Break</span>
          <div className="h-px w-full flex-1 border-b border-dashed border-gray-300" />
        </div>

        {/* Filler space ONLY on screen */}
        {show && (
          <div
            style={{
              height: paddingHeight > 0 ? Math.max(0, paddingHeight - 24) : 0,
            }}
          />
        )}
      </div>

      {/* Print view - Invisible break element */}
      <div
        className="hidden h-0 w-full print:block"
        style={{
          breakBefore: 'page',
          marginTop,
          marginBottom,
        }}
      />
    </>
  );
};
