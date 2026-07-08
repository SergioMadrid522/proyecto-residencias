export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden border border-red-200 bg-red-50">
      {children}
    </div>
  );
}

export function TitleSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-red-200 bg-red-100 px-6 py-5">
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-red-700">{children}</h2>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-red-600">{children}</p>;
}

export function Option({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-6 border-b border-red-200 px-6 py-5 last:border-b-0">
      {children}
    </div>
  );
}

export function Action({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end">{children}</div>;
}

export const DangerZoneOption = Object.assign(Card, {
  Card,
  Option,
  TitleSection,
  Title,
  Subtitle,
  Action,
});
