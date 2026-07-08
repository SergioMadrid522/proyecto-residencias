import { getRolText } from "./getFunctions";

export function capitalizeFirstLetter(text: string | number): string {
  if (typeof text === "number") {
    const value = getRolText(text);
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
