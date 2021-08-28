import { Coordinate } from "../utilities";
import { useCallback, useRef, useState } from "react";
import { useGridTyping } from "./useGridTyping";
import { Befunge } from "../Befunge";

export function useBefunge(
  width: number,
  height: number
): {
  code: string[][];
  selection: Coordinate;
  selectionDimensions: Coordinate;
  onClick: (x: number, y: number) => () => void;
  befunge: Befunge;
} {
  const setRenderHelper = useState(0)[1];
  const render = useCallback(() => {
    setRenderHelper(Math.random());
  }, []);

  const b = useRef(new Befunge(width, height, render)).current;

  const { code, selection, selectionDimensions, onClick } = useGridTyping(
    b.code,
    b.limits,
    render
  );

  return {
    code,
    selection,
    selectionDimensions,
    onClick,
    befunge: b,
  };
}
