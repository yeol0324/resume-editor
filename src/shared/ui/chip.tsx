export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="inline-block rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-600">
      {children}
    </span>
  );
};
