export function constArray2<T>(width: number, height: number, value: T): T[][] {
  return Array(width)
    .fill(false)
    .map(() => Array(height).fill(value));
}
