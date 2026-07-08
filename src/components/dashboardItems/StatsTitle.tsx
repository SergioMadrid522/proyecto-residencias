export function StatsTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl flex items-center justify-between p-1.5 font-semibold">
      {children}
    </h2>
  );
}
