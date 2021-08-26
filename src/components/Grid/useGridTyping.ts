import { constArray2, Coordinate } from "../../utilities";
import { useCallback, useEffect, useRef, useState } from "react";

const DIRECTIONS = {
  Left: { x: -1, y: 0 },
  Right: { x: 1, y: 0 },
  Up: { x: 0, y: -1 },
  Down: { x: 0, y: 1 },
};

export function useGridTyping(limits: Coordinate): {
  code: string[][];
  selection: Coordinate;
  onClick: (x: number, y: number) => () => void;
} {
  const code = useRef(constArray2(limits.x, limits.y, " ")).current;
  let selection = useRef(new Coordinate(0, 0)).current;

  let direction = useRef(new Coordinate(1, 0)).current;

  const [_renderHelper, setRenderHelper] = useState(0);

  const moveSelection = useCallback(
    (direction: Coordinate) => {
      selection.add(direction);
      selection.modulo(limits);
    },
    [selection]
  );

  const render = useCallback(() => {
    setRenderHelper(Math.random());
  }, []);

  const updateDirectionAndMove = useCallback(
    (dir: "Left" | "Right" | "Up" | "Down") => {
      const { x, y } = DIRECTIONS[dir];
      direction.x = x;
      direction.y = y;
      moveSelection(direction);
    },
    []
  );

  const onKeyDownEvent = useCallback(
    (event) => {
      if (event.key.length === 1) {
        code[selection.x][selection.y] = event.key;
        moveSelection(direction);
      } else if (event.key.match(/^Arrow/)) {
        updateDirectionAndMove(event.key.slice(5));
      } else if (event.key === "Backspace") {
        moveSelection(direction.clone().negative());
        code[selection.x][selection.y] = " ";
      }
      render();
    },
    [code]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownEvent, false);
    return (): void => {
      document.removeEventListener("keydown", onKeyDownEvent, false);
    };
  }, []);

  const onClick = useCallback(
    (x: number, y: number) => () => {
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
