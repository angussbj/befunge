import { cloneDeep, isEqual } from "lodash";
import { constArray2 } from "utilities";

export class Code {
  public code: string[][];
  protected resetPointWithEdits?: string[][];
  protected resetPointWithoutEdits?: string[][];
  public breakpoints: boolean[][];

  constructor(private width: number, private height: number) {
    this.code = constArray2(width, height, " ");
    this.breakpoints = constArray2(width, height, false);
  }

  public clone(): Code {
    const clone = new Code(this.width, this.height);
    clone.setToCopy(this);
    return clone;
  }

  public set(code: string[][]): void {
    this.code.forEach((col, x) =>
      col.forEach((_element, y) => {
        if (code[x]?.[y]) this.code[x][y] = code[x][y];
      })
    );
    this.resetPointWithEdits = undefined;
    this.resetPointWithoutEdits = undefined;
  }

  public setToCopy(other: Code): void {
    this.code = cloneDeep(other.code);
    this.resetPointWithEdits = cloneDeep(other.resetPointWithEdits);
    this.resetPointWithoutEdits = cloneDeep(other.resetPointWithoutEdits);
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
