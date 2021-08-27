import { Coordinate } from "../utilities";
import { useRef } from "react";
import { useGridTyping } from "./useGridTyping";
import { Befunge } from "../Befunge";

export function useBefunge(
  width: number,
  height: number
): {
  code: string[][];
  selection: Coordinate;
  onClick: (x: number, y: number) => () => void;
  cursor: Coordinate;
  stack: number[];
  step: () => void;
  run: () => void;
  reset: () => void;
  limits: Coordinate;
} {
  const { code, selection, onClick, render } = useGridTyping(width, height);

  const b = useRef(new Befunge(code, render)).current;

  return {
    code,
    selection,
    onClick,
    cursor: b.cursor,
    stack: b.stack,
    step: b.step,
    run: b.run,
    reset: b.reset,
    limits: b.limits,
  };
}
