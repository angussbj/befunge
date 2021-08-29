import { constArray2 } from "../utilities";

export class Code {
  public code: string[][];
  // private resetPointWithEdits?: string[][];
  // private resetPointWithoutEdits?: string[][];

  constructor(width: number, height: number) {
    this.code = constArray2(width, height, " ");
  }

  public get(x: number, y: number): string {
    return this.code[x][y];
  }

  public userPut(x: number, y: number, val: string): void {
    this.code[x][y] = val;
  }

  public executionPut(x: number, y: number, val: string): void {
    this.code[x][y] = val;
  }
}
