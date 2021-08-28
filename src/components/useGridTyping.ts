import { Coordinate } from "../utilities";
import { useCallback, useEffect, useRef } from "react";

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
  selectionDimensions: Coordinate;
  onClick: (x: number, y: number) => () => void;
} {
  const selection = useRef(new Coordinate(0, 0)).current;
  const selectionDimensions = useRef(new Coordinate(0, 0)).current;
  const direction = useRef(new Coordinate(1, 0)).current;
  const depressedCommandKeys = useRef(new Set()).current;

  const moveSelection = useCallback((direction: Coordinate) => {
    selection.add(direction);
    selection.modulo(limits);
    selectionDimensions.set(0, 0);
  }, []);

  const onKeyDown = useCallback((event) => {
    if (event.key.length === 1) {
      if (depressedCommandKeys.size === 0) {
        code[selection.x][selection.y] = event.key;
        moveSelection(direction);
      }
    } else if (event.key.match(/^Arrow/)) {
      if (
        depressedCommandKeys.has("Shift") &&
        depressedCommandKeys.size === 1
      ) {
        selectionDimensions.add(
          DIRECTIONS[event.key.slice(5) as DirectionName]
        );
      } else {
        direction.setToCopy(DIRECTIONS[event.key.slice(5) as DirectionName]);
        moveSelection(direction);
        event.preventDefault();
      }
    } else if (event.key === "Backspace") {
      moveSelection(direction.clone().negative());
      code[selection.x][selection.y] = " ";
    } else {
      depressedCommandKeys.add(event.key);
    }
    render();
  }, []);

  const onKeyUp = useCallback((event) => {
    if (
      event.key.length != 1 &&
      !event.key.match(/^Arrow/) &&
      event.key !== "Backspace"
    ) {
      depressedCommandKeys.delete(event.key);
    }
  }, []);

  const onPaste = useCallback((event) => {
    const text = event.clipboardData.getData("Text");
    let x = selection.x;
    let y = selection.y;
    text.split("").forEach((char: string) => {
      if (char === "\n") {
        x = selection.x;
        y++;
      } else {
        code[x][y] = char;
        x++;
      }
    });
    render();
  }, []);

  const onCopy = useCallback((event) => {
    let textToCopy = "";
    for (let y = selection.y; y <= selection.y + selectionDimensions.y; y++) {
      for (let x = selection.x; x <= selection.x + selectionDimensions.x; x++) {
        textToCopy += code[x][y];
      }
      textToCopy += "\n";
    }
    event.clipboardData.setData("text/plain", textToCopy);
    event.preventDefault();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    document.addEventListener("keyup", onKeyUp);
    return (): void => {
      document.removeEventListener("keydown", onKeyDown);
      document.addEventListener("copy", onCopy);
      document.addEventListener("paste", onPaste);
      document.addEventListener("keyup", onKeyUp);
    };
  }, []);

  const onClick = useCallback(
    (x: number, y: number): (() => void) =>
      (): void => {
        if (
          depressedCommandKeys.has("Shift") &&
          depressedCommandKeys.size === 1
        ) {
          selectionDimensions.set(x - selection.x, y - selection.y);
        } else {
          selection.set(x, y);
          selectionDimensions.set(0, 0);
        }
        render();
      },
    []
  );

  return {
    code,
    selection,
    selectionDimensions,
    onClick,
  };
}
