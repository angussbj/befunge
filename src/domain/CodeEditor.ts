import { MouseEvent } from "react";
import { Coordinate, sorted } from "../utilities";
import autoBind from "auto-bind";
import { Code } from "./Code";

const DIRECTIONS = {
  Left: new Coordinate(-1, 0),
  Right: new Coordinate(1, 0),
  Up: new Coordinate(0, -1),
  Down: new Coordinate(0, 1),
};

type DirectionName = keyof typeof DIRECTIONS;

export class CodeEditor {
  public selection = new Coordinate(0, 0);
  public selectionDelta = new Coordinate(0, 0);
  public direction = DIRECTIONS.Right.clone();
  private deleteMode: "delete" | "backspace" = "delete";

  constructor(
    public code: Code,
    public limits: Coordinate,
    private render: () => void
  ) {
    autoBind(this);
  }

  public onMouseDown(x: number, y: number): (event: MouseEvent) => void {
    return (event: MouseEvent): void => {
      if (event.shiftKey) {
        this.selectionDelta.set(x - this.selection.x, y - this.selection.y);
      } else {
        this.selection.set(x, y);
        this.selectionDelta.set(0, 0);
        this.deleteMode = "delete";
        this.direction.setToCopy(DIRECTIONS.Right);
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
    if (event.ctrlKey || event.metaKey) {
      if (event.key === "a") {
        this.selection.set(0, 0);
        this.selectionDelta.setToCopy(this.limits).add(new Coordinate(-1, -1));
      }
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      this.handleEnteredCharacter(event);
    } else if (event.key.match(/^Arrow/) && !event.ctrlKey && !event.metaKey) {
      this.handleSelectionMovement(event);
    } else if (event.key === "Backspace") {
      this.handleDeletion();
    }
    this.render();
  }

  public onCut(event: ClipboardEvent): void {
    this.onCopy(event);
    this.clearSelection();
  }

  public onCopy(event: ClipboardEvent): void {
    let textToCopy = "";
    this.selectionForEach({
      cellAction: (x: number, y: number): void => {
        textToCopy += this.code.get(x, y);
      },
      rowEndAction: (): void => {
        textToCopy += "\n";
      },
    });
    event.clipboardData?.setData("text/plain", textToCopy);
    event.preventDefault();
  }

  public onPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData("Text");
    const pasteCoords = new Coordinate(this.selection.x, this.selection.y);
    text?.split("").forEach((char: string) => {
      if (char === "\n") {
        pasteCoords
          .set(this.selection.x, pasteCoords.y + 1)
          .modulo(this.limits);
      } else {
        this.code.userPut(pasteCoords.x, pasteCoords.y, char);
        pasteCoords.setX(pasteCoords.x + 1).modulo(this.limits);
      }
    });
    this.render();
  }

  private handleEnteredCharacter(event: KeyboardEvent): void {
    this.fillSelection(event.key);
    this.stepSelection(this.direction);
    this.deleteMode = "backspace";
    event.preventDefault();
  }

  private handleSelectionMovement(event: KeyboardEvent): void {
    if (event.shiftKey) {
      this.selectionDelta.add(DIRECTIONS[event.key.slice(5) as DirectionName]);
    } else {
      this.direction.setToCopy(DIRECTIONS[event.key.slice(5) as DirectionName]);
      this.stepSelection(this.direction);
      this.selectionDelta.set(0, 0);
      event.preventDefault();
    }
    this.deleteMode = "delete";
  }

  private handleDeletion(): void {
    if (this.deleteMode === "backspace") {
      this.stepSelection(this.direction.clone().negative());
      this.code.userPut(this.selection.x, this.selection.y, " ");
    } else if (this.deleteMode === "delete") {
      this.clearSelection();
    }
  }

  private stepSelection(direction: Coordinate): void {
    this.selection.add(direction).modulo(this.limits);
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
  }: {
    cellAction: (x: number, y: number) => void;
    rowEndAction?: () => void;
  }): void {
    const [x0, x1] = sorted([
      this.selection.x,
      this.selection.x + this.selectionDelta.x,
    ]);
    const [y0, y1] = sorted([
      this.selection.y,
      this.selection.y + this.selectionDelta.y,
    ]);
    const iterationCoord = new Coordinate(0, 0);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        iterationCoord.set(x, y).modulo(this.limits);
        cellAction(iterationCoord.x, iterationCoord.y);
      }
      rowEndAction?.();
    }
  }
}
