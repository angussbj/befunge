import { MouseEvent } from "react";
import {
  Coordinate,
  Direction,
  DIRECTION_VECTOR,
  DirectionName,
  MajorMinorDirections,
} from "../utilities";
import autoBind from "auto-bind";
import { Code } from "./Code";
import { Befunge } from "./Befunge";

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
  public code: Code;
  public limits: Coordinate;

  public useSelectionDirectionForCutCopyPaste = false;
  public changeDirectionOnDirectionCharacters = false;

  constructor(private executor: Befunge, private render: () => void) {
    this.code = executor.code;
    this.limits = executor.limits;
    autoBind(this);
  }

  public getSelectedCharacter(): string {
    return this.code.get(this.selection.x, this.selection.y);
  }

  public setHistoryPoint(): void {
    this.history.push(this.createHistoryPoint());
    this.future = [];
    this.executor.setHistoryPoint();
  }

  public undo(): void {
    this.future.push(this.createHistoryPoint());
    this.revertToPoint(this.history.pop());
    this.executor.undo();
    this.render();
  }

  public redo(): void {
    this.history.push(this.createHistoryPoint());
    this.revertToPoint(this.future.pop());
    this.executor.redo();
    this.render();
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
      if (event.shiftKey) {
        this.selectionDelta.set(x - this.selection.x, y - this.selection.y);
      } else {
        this.selection.set(x, y);
        this.selectionDelta.set(0, 0);
        this.deleteMode = "delete";
        this.direction = Direction.Right;
      }
      this.render();
    };
  }

  public onMouseOver(x: number, y: number): (event: MouseEvent) => void {
    return (event: MouseEvent): void => {
      if (event.buttons % 2 === 1) {
        this.selectionDelta.set(x - this.selection.x, y - this.selection.y);
        this.render();
      }
    };
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (document.activeElement !== document.body) return;
    if (event.ctrlKey || event.metaKey) {
      this.handleKeyboardShortcuts(event);
    } else if (event.key.length === 1) {
      this.handleEnteredCharacter(event);
    } else if (event.key.match(/^Arrow/)) {
      this.handleSelectionMovement(event);
    } else if (event.key === "Backspace") {
      this.handleDeletion();
    }
    this.render();
  }

  public onCut(event: ClipboardEvent): void {
    if (document.activeElement !== document.body) return;
    this.setHistoryPoint();
    this.onCopy(event);
    this.clearSelection();
    this.render();
  }

  public onCopy(event: ClipboardEvent): void {
    if (document.activeElement !== document.body) return;
    this.setHistoryPoint();
    let textToCopy = "";
    this.selectionForEach({
      cellAction: (x: number, y: number): void => {
        textToCopy += this.code.get(x, y);
      },
      rowEndAction: (): void => {
        textToCopy += "\n";
      },
      directions: this.useSelectionDirectionForCutCopyPaste
        ? this.selectionDelta.getMajorAndMinorDirections()
        : undefined,
    });
    event.clipboardData?.setData("text/plain", textToCopy);
    event.preventDefault();
  }

  public onPaste(event: ClipboardEvent): void {
    if (document.activeElement !== document.body) return;
    this.setHistoryPoint();
    const text = event.clipboardData?.getData("Text");
    const pasteCoords = this.selection.clone();
    const newLineCoord = this.selection.clone();
    const { majorVector, minorVector } = this
      .useSelectionDirectionForCutCopyPaste
      ? this.selectionDelta.getMajorAndMinorDirections()
      : this.getDefaultIterationDirections();
    text?.split("").forEach((char: string) => {
      if (char === "\n") {
        newLineCoord.add(minorVector).modulo(this.limits);
        pasteCoords.setToCopy(newLineCoord);
      } else {
        this.code.userPut(pasteCoords.x, pasteCoords.y, char);
        pasteCoords.add(majorVector).modulo(this.limits);
      }
    });
    this.render();
  }

  private handleKeyboardShortcuts(event: KeyboardEvent): void {
    if (event.key === "a") {
      this.selection.set(0, 0);
      this.selectionDelta.setToCopy(this.limits).add(new Coordinate(-1, -1));
    } else if (event.key === "z" && !event.shiftKey) {
      this.undo();
    } else if ((event.key === "z" && event.shiftKey) || event.key === "y") {
      this.redo();
    } else if (event.key.match(/^Arrow/)) {
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
    console.log(this.changeDirectionOnDirectionCharacters);
    if (this.changeDirectionOnDirectionCharacters) {
      if (character === "<") this.direction = Direction.Left;
      if (character === ">") this.direction = Direction.Right;
      if (character === "^") this.direction = Direction.Up;
      if (character === "v") this.direction = Direction.Down;
    }
  }
}
