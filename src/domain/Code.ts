import { cloneDeep, isEqual } from "lodash";
import { constArray2 } from "../utilities";

export class Code {
  public code: string[][];
  private resetPointWithEdits?: string[][];
  private resetPointWithoutEdits?: string[][];

  constructor(width: number, height: number) {
    this.code = constArray2(width, height, " ");
  }

  public get(x: number, y: number): string {
    return this.code[x][y];
  }

  public userPut(x: number, y: number, val: string): void {
    this.code[x][y] = val;
    if (this.resetPointWithEdits) this.resetPointWithEdits[x][y] = val;
  }

  public executionPut(x: number, y: number, val: string): void {
    this.code[x][y] = val;
  }

  public makeResetable(): void {
    if (!this.isResetable()) {
      this.resetPointWithEdits = cloneDeep(this.code);
      this.resetPointWithoutEdits = cloneDeep(this.code);
    }
  }

  public reset(withEdits: boolean): void {
    const resetPoint = withEdits
      ? this.resetPointWithEdits
      : this.resetPointWithoutEdits;
    if (resetPoint) this.code = resetPoint;
    this.resetPointWithEdits = undefined;
    this.resetPointWithoutEdits = undefined;
  }

  public resetRequiresClarification(): boolean {
    return !isEqual(this.resetPointWithEdits, this.resetPointWithoutEdits);
  }

  private isResetable(): boolean {
    return !!this.resetPointWithEdits;
  }
}
