import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export function Property({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-none">
      {children}
    </div>
  );
}

export function Key({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-gray-500">{children}</span>;
}

export function Value({ children }: { children: React.ReactNode }) {
  const isModuleAPI = children === "API";

  return (
    <span className="font-semibold text-gray-900">
      {isModuleAPI ? children : capitalizeFirstLetter(String(children))}
    </span>
  );
}

export const PropertiesPanel = Object.assign(Property, {
  Property,
  Key,
  Value,
});
