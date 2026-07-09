export function getStatusNumber(status: string): number {
  const statusBoolean: Record<string, number> = {
    true: 0,
    false: 1,
  };
  return statusBoolean[status] ?? 0;
}
