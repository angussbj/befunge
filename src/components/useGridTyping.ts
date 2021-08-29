import { Coordinate, sorted } from "../utilities";
import { useCallback, useEffect, useRef, MouseEvent } from "react";

const DIRECTIONS = {
  Left: new Coordinate(-1, 0),
  Right: new Coordinate(1, 0),
  Up: new Coordinate(0, -1),
  Down: new Coordinate(0, 1),
};

type DirectionName = keyof typeof DIRECTIONS;

export function useGridTyping(
  code: string[][],
  limits: Coordinate,
  render: () => void
): {
  code: string[][];
  selection: Coordinate;
  selectionDelta: Coordinate;
  onMouseDown: (x: number, y: number) => (e: MouseEvent) => void;
  onMouseOver: (x: number, y: number) => (e: MouseEvent) => void;
} {
  const selection = useRef(new Coordinate(0, 0)).current;
  const selectionDelta = useRef(new Coordinate(0, 0)).current;
  const direction = useRef(new Coordinate(1, 0)).current;
  let deleteMode = useRef<"delete" | "backspace">("delete").current;

  const moveSelection = useCallback((direction: Coordinate) => {
    selection.add(direction);
    selection.modulo(limits);
    selectionDelta.set(0, 0);
  }, []);

  const onKeyDown = useCallback((event) => {
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      code[selection.x][selection.y] = event.key;
      moveSelection(direction);
      deleteMode = "backspace";
    } else if (event.key.match(/^Arrow/) && !event.ctrlKey && !event.metaKey) {
      if (event.shiftKey) {
        selectionDelta.add(DIRECTIONS[event.key.slice(5) as DirectionName]);
      } else {
        direction.setToCopy(DIRECTIONS[event.key.slice(5) as DirectionName]);
        moveSelection(direction);
        event.preventDefault();
      }
      deleteMode = "delete";
    } else if (event.key === "Backspace") {
      console.log(deleteMode);
      if (deleteMode === "backspace") {
        moveSelection(direction.clone().negative());
        code[selection.x][selection.y] = " ";
      } else if (deleteMode === "delete") {
        deleteSelection();
      }
    }
    render();
  }, []);

  const updateCode = useCallback(
    (coords: Coordinate, modification: (char: string) => string): void => {
      code[coords.x][coords.y] = modification(code[coords.x][coords.y]);
    },
    []
  );

  const deleteSelection = useCallback((): void => {
    const [x0, x1] = sorted([selection.x, selection.x + selectionDelta.x]);
    const [y0, y1] = sorted([selection.y, selection.y + selectionDelta.y]);
    const iterationCoord = new Coordinate(0, 0);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        iterationCoord.set(x, y).modulo(limits);
        code[iterationCoord.x][iterationCoord.y] = " ";
      }
    }
  }, []);

  const copyWithModify = useCallback(
    (modification?: (char: string) => string) =>
      (event: ClipboardEvent): void => {
        let textToCopy = "";
        const [x0, x1] = sorted([selection.x, selection.x + selectionDelta.x]);
        const [y0, y1] = sorted([selection.y, selection.y + selectionDelta.y]);
        const copyCoords = new Coordinate(0, 0);
        for (let y = y0; y <= y1; y++) {
          for (let x = x0; x <= x1; x++) {
            copyCoords.set(x, y).modulo(limits);
            textToCopy += code[copyCoords.x][copyCoords.y];
            if (modification) updateCode(copyCoords, modification);
          }
          textToCopy += "\n";
        }
        event.clipboardData?.setData("text/plain", textToCopy);
        event.preventDefault();
        if (modification) render();
      },
    []
  );

  const onCut = useCallback(
    copyWithModify(() => " "),
    []
  );

  const onCopy = useCallback(copyWithModify(undefined), []);

  const onPaste = useCallback((event: ClipboardEvent): void => {
    const text = event.clipboardData?.getData("Text");
    const pasteCoords = new Coordinate(selection.x, selection.y);
    text?.split("").forEach((char: string) => {
      if (char === "\n") {
        pasteCoords.setX(selection.x);
        pasteCoords.setY(pasteCoords.y + 1);
        pasteCoords.modulo(limits);
      } else {
        code[pasteCoords.x][pasteCoords.y] = char;
        pasteCoords.setX(pasteCoords.x + 1);
        pasteCoords.modulo(limits);
      }
    });
    render();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("cut", onCut);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    return (): void => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onPaste);
    };
  }, []);

  const onMouseDown = useCallback(
    (x: number, y: number): ((event: MouseEvent) => void) =>
      (event: MouseEvent): void => {
        if (event.shiftKey) {
          selectionDelta.set(x - selection.x, y - selection.y);
        } else {
          selection.set(x, y);
          selectionDelta.set(0, 0);
          deleteMode = "delete";
          direction.setToCopy(DIRECTIONS.Right);
        }
        render();
      },
    []
  );

  const onMouseOver = useCallback(
    (x: number, y: number): ((event: MouseEvent) => void) =>
      (event: MouseEvent): void => {
        if (event.buttons % 2 === 1) {
          selectionDelta.set(x - selection.x, y - selection.y);
          render();
        }
      },
    []
  );

  return {
    code,
    selection,
    selectionDelta,
    onMouseDown,
    onMouseOver,
  };
}
