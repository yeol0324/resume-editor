export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 print:border print:border-slate-300 print:bg-transparent">
      {children}
    </span>
  );
};
