export function sorted(arr: number[]): number[] {
  const copy = [...arr];
  copy.sort((a, b) => a - b);
  return copy;
}
