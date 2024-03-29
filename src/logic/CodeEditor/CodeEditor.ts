import { MouseEvent } from "react";
import {
  Coordinate,
  Direction,
  DIRECTION_VECTOR,
  DirectionName,
  MajorMinorDirections,
} from "utilities";
import autoBind from "auto-bind";
import { Code } from "../Code";
import { BefungeRunner } from "../Befunge";
import { CodeEditorOptions } from "./CodeEditorOptions";

type DeleteMode = "delete" | "backspace";

interface CodeEditorHistoryPoint {
  selection: Coordinate;
  selectionDelta: Coordinate;
  direction: Direction;
  deleteMode: DeleteMode;
}

export class CodeEditor {
  public selection = new Coordinate(0, 0);
  public selectionDelta = new Coordinate(0, 0);
  public direction = Direction.Right;
  private deleteMode: DeleteMode = "delete";
  private history: CodeEditorHistoryPoint[] = [];
  private future: CodeEditorHistoryPoint[] = [];

  public focus?: () => void;
  public hasFocus = false;
  public options = new CodeEditorOptions();

  constructor(
    private code: Code,
    private limits: Coordinate,
    private executor: BefungeRunner,
    private externalOnChange: (code: string) => void
  ) {
    autoBind(this);
  }

  private onChange(): void {
    this.externalOnChange(JSON.stringify(this.code.code));
  }

  public setFocusMethod(newFocusMethod: () => void): void {
    this.focus = newFocusMethod;
  }

  public setCode(code: string): void {
    this.setHistoryPoint();
    this.executor.reset();
    this.selection = new Coordinate(0, 0);
    this.selectionDelta = new Coordinate(0, 0);
    this.clearAll();
    this.paste(code);
    setTimeout(this.onChange, 100);
  }

  public getSelectedCharacter(): string {
    return this.code.get(this.selection.x, this.selection.y);
  }

  public getSelectedText(): string {
    let text = "";
    this.selectionForEach({
      cellAction: (x: number, y: number): void => {
        text += this.code.get(x, y);
      },
      rowEndAction: (): void => {
        text += "\n";
      },
      directions: this.options.useSelectionDirectionForCutCopyPaste
        ? this.selectionDelta.getMajorAndMinorDirections()
        : undefined,
    });
    return text;
  }

  public setHistoryPoint(): void {
    this.history.push(this.createHistoryPoint());
    this.future = [];
    this.executor.setHistoryPoint();
  }

  public undo(): void {
    const historyPointToGoBackTo = this.history.pop();
    if (historyPointToGoBackTo) {
      this.future.push(this.createHistoryPoint());
      this.revertToPoint(historyPointToGoBackTo);
      this.executor.undo();
      this.onChange();
    }
  }

  public redo(): void {
    const futurePointToGoBackTo = this.future.pop();
    if (futurePointToGoBackTo) {
      this.history.push(this.createHistoryPoint());
      this.revertToPoint(futurePointToGoBackTo);
      this.executor.redo();
      this.onChange();
    }
  }

  private createHistoryPoint(): CodeEditorHistoryPoint {
    return {
      selection: this.selection.clone(),
      selectionDelta: this.selectionDelta.clone(),
      direction: this.direction,
      deleteMode: this.deleteMode,
    };
  }

  private revertToPoint(point?: CodeEditorHistoryPoint): void {
    if (!point) return;
    this.selection = point.selection;
    this.selectionDelta = point.selectionDelta;
    this.direction = point.direction;
    this.deleteMode = point.deleteMode;
  }

  public onMouseDown(x: number, y: number): (event: MouseEvent) => void {
    return (event: MouseEvent): void => {
      if (event.buttons % 2 === 1) {
        if (event.shiftKey) {
          this.selectionDelta.set(x - this.selection.x, y - this.selection.y);
        } else {
          this.selection.set(x, y);
          this.selectionDelta.set(0, 0);
          this.deleteMode = "delete";
          this.direction = Direction.Right;
        }
        this.onChange();
      }
    };
  }

  public onDoubleClick(x: number, y: number): () => void {
    return (): void => {
      this.code.breakpoints[x][y] = !this.code.breakpoints[x][y];
      this.onChange();
    };
  }

  public onMouseOver(x: number, y: number): (event: MouseEvent) => void {
    return (event: MouseEvent): void => {
      if (event.buttons % 2 === 1) {
        this.selectionDelta.set(x - this.selection.x, y - this.selection.y);
        this.onChange();
      }
    };
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) {
      this.handleKeyboardShortcuts(event);
    } else if (!this.hasFocus) {
      return;
    } else if (event.key.length === 1) {
      this.handleEnteredCharacter(event);
    } else if (event.key.match(/^Arrow/)) {
      this.handleSelectionMovement(event);
    } else if (event.key === "Backspace") {
      this.handleDeletion();
    }
    this.onChange();
  }

  public onCut(event: ClipboardEvent): void {
    if (!this.hasFocus) return;
    this.setHistoryPoint();
    event.clipboardData?.setData("text/plain", this.getSelectedText());
    event.preventDefault();
    this.clearSelection();
    this.onChange();
  }

  public onCopy(event: ClipboardEvent): void {
    if (!this.hasFocus) return;
    this.setHistoryPoint();
    event.clipboardData?.setData("text/plain", this.getSelectedText());
    event.preventDefault();
  }

  public onPaste(event: ClipboardEvent): void {
    if (!this.hasFocus) return;
    this.setHistoryPoint();
    const text = event.clipboardData?.getData("Text");
    if (text) this.paste(text);
    this.onChange();
  }

  private paste(text: string): void {
    const pasteCoords = this.selection.clone();
    const newLineCoord = this.selection.clone();
    const { majorVector, minorVector } = this.options
      .useSelectionDirectionForCutCopyPaste
      ? this.selectionDelta.getMajorAndMinorDirections()
      : this.getDefaultIterationDirections();
    text.split("").forEach((char: string) => {
      if (char === "\n") {
        newLineCoord.add(minorVector).modulo(this.limits);
        pasteCoords.setToCopy(newLineCoord);
      } else {
        this.code.userPut(pasteCoords.x, pasteCoords.y, char);
        pasteCoords.add(majorVector).modulo(this.limits);
      }
    });
  }

  // TOOD: should execution related keyboard interactions be handled somewhere else?
  private handleKeyboardShortcuts(event: KeyboardEvent): void {
    if (event.key === "a") {
      this.selection.set(0, 0);
      this.selectionDelta.setToCopy(this.limits).add(new Coordinate(-1, -1));
      this.focus?.();
    } else if (event.key === "z" && !event.shiftKey) {
      this.undo();
      this.focus?.();
    } else if ((event.key === "z" && event.shiftKey) || event.key === "y") {
      this.redo();
      this.focus?.();
    } else if (event.key === "j") {
      this.executor.step();
    } else if (event.key === "k") {
      this.executor.walkOrPause();
    } else if (event.key === "l") {
      this.executor.runOrPause();
    } else if (event.key === ";") {
      this.executor.reset();
    } else if (event.key.match(/^Arrow/)) {
      if (this.hasFocus)
        this.direction = Direction[event.key.slice(5) as DirectionName];
    } else {
      return;
    }
    event.preventDefault();
  }

  private handleEnteredCharacter(event: KeyboardEvent): void {
    this.setHistoryPoint();
    this.fillSelection(event.key);
    this.changeTypingDirectionIfNeeded(event.key);
    this.stepSelection(DIRECTION_VECTOR[this.direction]);
    this.deleteMode = "backspace";
    event.preventDefault();
  }

  private handleSelectionMovement(event: KeyboardEvent): void {
    const movementDirection = Direction[event.key.slice(5) as DirectionName];
    if (event.shiftKey) {
      this.selectionDelta.add(DIRECTION_VECTOR[movementDirection]);
    } else {
      this.stepSelection(DIRECTION_VECTOR[movementDirection]);
      this.selectionDelta.set(0, 0);
      event.preventDefault();
    }
    this.deleteMode = "delete";
  }

  private handleDeletion(): void {
    this.setHistoryPoint();
    if (this.deleteMode === "backspace") {
      this.stepSelection(DIRECTION_VECTOR[this.direction].clone().negative());
      this.clearSelection();
    } else if (this.deleteMode === "delete") {
      this.clearSelection();
    }
  }

  private stepSelection(directionVector: Coordinate): void {
    this.selection.add(directionVector).modulo(this.limits);
  }

  private clearSelection(): void {
    this.fillSelection(" ");
  }

  private clearAll(): void {
    this.forEach({
      cellAction: (x: number, y: number): void => {
        this.code.userPut(x, y, " ");
      },
    });
  }

  private fillSelection(char: string): void {
    this.selectionForEach({
      cellAction: (x: number, y: number): void => {
        this.code.userPut(x, y, char);
      },
    });
  }

  private selectionForEach({
    cellAction,
    rowEndAction,
    directions,
  }: {
    cellAction: (x: number, y: number) => void;
    rowEndAction?: () => void;
    directions?: MajorMinorDirections;
  }): void {
    const { start, majorVector, majorMax, minorVector, minorMax } = directions
      ? { start: this.selection, ...directions }
      : this.getDefaultIterationDirections();
    const iterationCoord = start.clone();
    for (let minor = 0; minor <= minorMax; minor++) {
      iterationCoord.setToCopy(start);
      iterationCoord.add(minorVector.clone().times(minor)).modulo(this.limits);
      for (let major = 0; major <= majorMax; major++) {
        cellAction(iterationCoord.x, iterationCoord.y);
        iterationCoord.add(majorVector).modulo(this.limits);
      }
      rowEndAction?.();
    }
  }

  private forEach({
    cellAction,
    rowEndAction,
  }: {
    cellAction: (x: number, y: number) => void;
    rowEndAction?: () => void;
  }): void {
    for (let x = 0; x < this.limits.x; x++) {
      for (let y = 0; y < this.limits.y; y++) {
        cellAction(x, y);
      }
      rowEndAction?.();
    }
  }

  private getDefaultIterationDirections(): {
    start: Coordinate;
  } & MajorMinorDirections {
    const x0 = Math.min(
      this.selection.x,
      this.selection.x + this.selectionDelta.x
    );
    const y0 = Math.min(
      this.selection.y,
      this.selection.y + this.selectionDelta.y
    );
    return {
      start: new Coordinate(x0, y0),
      majorVector: DIRECTION_VECTOR[Direction.Right],
      majorMax: Math.abs(this.selectionDelta.x),
      minorVector: DIRECTION_VECTOR[Direction.Down],
      minorMax: Math.abs(this.selectionDelta.y),
    };
  }

  private changeTypingDirectionIfNeeded(character: string): void {
    if (this.options.changeDirectionOnDirectionCharacters) {
      if (character === "<") this.direction = Direction.Left;
      if (character === ">") this.direction = Direction.Right;
      if (character === "^") this.direction = Direction.Up;
      if (character === "v") this.direction = Direction.Down;
    }
  }
}
