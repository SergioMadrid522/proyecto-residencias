export function Card({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}

export function TitleSection({ children }: { children: React.ReactNode }) {
  return <div className="bg-black/20 w-full p-4">{children}</div>;
}

export function Title({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}
export function Subtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm">{children}</p>;
}
export const ConfigurationCard = Object.assign(Card, {
  Card,
  TitleSection,
  Title,
  Subtitle,
});
