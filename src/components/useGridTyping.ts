import { Coordinate } from "../utilities";
import { useCallback, useEffect, useRef } from "react";

const DIRECTIONS = {
  Left: { x: -1, y: 0 },
  Right: { x: 1, y: 0 },
  Up: { x: 0, y: -1 },
  Down: { x: 0, y: 1 },
};

export function useGridTyping(
  code: string[][],
  limits: Coordinate,
  render: () => void
): {
  code: string[][];
  selection: Coordinate;
  onClick: (x: number, y: number) => () => void;
} {
  const selection = useRef(new Coordinate(0, 0)).current;
  const direction = useRef(new Coordinate(1, 0)).current;
  const depressedCommandKeys = useRef(new Set()).current;

  const moveSelection = useCallback(
    (direction: Coordinate) => {
      selection.add(direction);
      selection.modulo(limits);
    },
    [selection]
  );

  const updateDirectionAndMove = useCallback(
    (dir: "Left" | "Right" | "Up" | "Down") => {
      const { x, y } = DIRECTIONS[dir];
      direction.x = x;
      direction.y = y;
      moveSelection(direction);
    },
    []
  );

  const onKeyDown = useCallback((event) => {
    if (event.key.length === 1) {
      if (depressedCommandKeys.size === 0) {
        code[selection.x][selection.y] = event.key;
        moveSelection(direction);
      }
    } else if (event.key.match(/^Arrow/)) {
      updateDirectionAndMove(event.key.slice(5));
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

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("paste", onPaste);
    document.addEventListener("keyup", onKeyUp);
    return (): void => {
      document.removeEventListener("keydown", onKeyDown);
      document.addEventListener("paste", onPaste);
      document.addEventListener("keyup", onKeyUp);
    };
  }, []);

  const onClick = useCallback(
    (x: number, y: number): (() => void) =>
      (): void => {
        selection.x = x;
        selection.y = y;
        render();
      },
    []
  );

  return {
    code,
    selection,
    onClick,
  };
}
