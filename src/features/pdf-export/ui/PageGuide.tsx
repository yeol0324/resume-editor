import { type FC } from 'react';

/**
 * A4 Height in mm
 */
/**
 * A4 Height in mm
 */
const PAGE_HEIGHT_MM = 297;

interface PageGuideProps {
  /**
   * 가이드 라인 표시 여부
   */
  show: boolean;
  /**
   * 가이드를 표시할 페이지 수 (기본값: 5)
   */
  pageCount?: number;
}

/**
 * A4 용지 기준 페이지 구분선을 표시하는 가이드 컴포넌트입니다.
 *
 * @component
 * @example
 * ```tsx
 * <PageGuide show={true} pageCount={3} />
 * ```
 */
export const PageGuide: FC<PageGuideProps> = ({ show, pageCount = 5 }) => {
  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 print:hidden">
      {Array.from({ length: pageCount }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 w-full border-b-2 border-dashed border-red-500 opacity-50"
          style={{
            top: `${(i + 1) * PAGE_HEIGHT_MM}mm`,
          }}
        >
          <span className="absolute -top-6 right-0 bg-red-100 px-2 py-1 text-xs font-bold text-red-500">
            Page {i + 1} End ({PAGE_HEIGHT_MM * (i + 1)}mm)
          </span>
        </div>
      ))}
    </div>
  );
};
