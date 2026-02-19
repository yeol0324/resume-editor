import { type RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';

interface PdfSaveButtonProps {
  /**
   * PDF로 변환할 컨텐츠의 Ref
   */
  contentRef: RefObject<HTMLElement | null>;
  /**
   * 저장될 PDF 파일명 (확장자 제외)
   * @default '이력서'
   */
  documentTitle?: string;
}

/**
 * 지정된 영역을 PDF로 저장하는 버튼 컴포넌트입니다.
 * `react-to-print` 라이브러리를 사용하여 인쇄 기능을 구현합니다.
 *
 * @component
 * @example
 * ```tsx
 * <PdfSaveButton contentRef={ref} documentTitle="my-resume" />
 * ```
 */
export const PdfSaveButton = ({
  contentRef,
  documentTitle = '이력서',
}: PdfSaveButtonProps) => {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
    pageStyle: `
    @page {
      size: A4;
      margin: 0mm;
    }
    @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <button
      onClick={() => handlePrint()}
      className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-gray-700 active:scale-95"
    >
      <Download size={16} />
      PDF로 저장
    </button>
  );
};
