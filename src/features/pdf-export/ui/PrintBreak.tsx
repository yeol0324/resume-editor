import { type FC } from 'react';

interface PrintBreakProps {
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
 *
 * @component
 * @example
 * ```tsx
 * <PrintBreak marginTop="20px" />
 * ```
 */
export const PrintBreak: FC<PrintBreakProps> = ({
  marginTop = 0,
  marginBottom = 0,
}) => {
  return (
    <>
      {/* Screen view */}
      <div
        className="my-4 flex items-center gap-2 border-t border-dashed border-gray-300 py-4 text-xs text-gray-400 print:hidden"
        style={{
          marginTop,
          marginBottom,
        }}
      >
        <div className="h-px flex-1 bg-gray-200" />
        <span>Page Break</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Print view */}
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
