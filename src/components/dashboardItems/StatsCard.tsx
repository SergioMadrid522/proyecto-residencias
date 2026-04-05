export function StatsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[350px]">
      {children}
    </div>
  );
}
