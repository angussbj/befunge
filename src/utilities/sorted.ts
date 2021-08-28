export function sorted<T>(arr: T[]): T[] {
  const copy = [...arr];
  copy.sort();
  return copy;
}
