import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export function Property({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}

export function Key({ children }: { children: React.ReactNode }) {
  return <p className="">{children}</p>;
}

export function Value({ children }: { children: React.ReactNode }) {
  return <p className="py-2">{capitalizeFirstLetter(String(children))}</p>;
}

export const PropertiesPanel = Object.assign(Property, {
  Property,
  Key,
  Value,
});
