export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {children}
    </div>
  );
}

export function TitleSection({ children }: { children: React.ReactNode }) {
  return (
    <div className=" border-b border-gray-200 bg-gray-50 px-6 py-5">
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-gray-900">{children}</h2>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-gray-500">{children}</p>;
}

export const ConfigurationCard = Object.assign(Card, {
  Card,
  TitleSection,
  Title,
  Subtitle,
});
