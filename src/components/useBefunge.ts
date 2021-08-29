import { Coordinate } from "../utilities";
import { useCallback, useRef, useState, MouseEvent } from "react";
import { useGridTyping } from "./useGridTyping";
import { Befunge } from "../Befunge";

export function useBefunge(
  width: number,
  height: number
): {
  code: string[][];
  selection: Coordinate;
  selectionDelta: Coordinate;
  onMouseDown: (x: number, y: number) => (e: MouseEvent) => void;
  onMouseOver: (x: number, y: number) => (e: MouseEvent) => void;
  befunge: Befunge;
} {
  const setRenderHelper = useState(0)[1];
  const render = useCallback(() => {
    setRenderHelper(Math.random());
  }, []);

  const b = useRef(new Befunge(width, height, render)).current;

  const { code, selection, selectionDelta, onMouseDown, onMouseOver } =
    useGridTyping(b.code, b.limits, render);

  return {
    code,
    selection,
    selectionDelta,
    onMouseDown,
    onMouseOver,
    befunge: b,
  };
}
