import { type RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';

interface PdfSaveButtonProps {
  contentRef: RefObject<HTMLElement | null>;
  documentTitle?: string;
}

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
        margin: 0;
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
