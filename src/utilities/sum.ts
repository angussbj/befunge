export function sum(numbers: number[]): number {
  return numbers.reduce((partial, n) => partial + n, 0);
}
