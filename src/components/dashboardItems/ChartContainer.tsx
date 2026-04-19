export function ChartContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
      {children}
    </div>
  );
}
