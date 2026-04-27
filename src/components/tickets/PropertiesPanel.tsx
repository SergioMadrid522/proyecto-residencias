import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export function Property({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function Key({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function Value({ children }: { children: React.ReactNode }) {
  return <p>{capitalizeFirstLetter(String(children))}</p>;
}

export const PropertiesPanel = Object.assign(Property, {
  Property,
  Key,
  Value,
});
