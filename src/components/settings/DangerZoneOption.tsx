export function Card({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
export function Option({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 items-center gap-4 p-4 ">{children}</div>
  );
}
export function TitleSection({ children }: { children: React.ReactNode }) {
  return <div className="bg-red-300 w-full p-4">{children}</div>;
}

export function Title({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function Action({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end w-full">{children}</div>;
}
export const DangerZoneOption = Object.assign(Card, {
  Card,
  Option,
  TitleSection,
  Title,
  Subtitle,
  Action,
});
