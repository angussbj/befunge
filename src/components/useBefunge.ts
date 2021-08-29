import { useCallback, useRef, useState, useEffect } from "react";
import { Befunge, CodeEditor } from "../domain";

export function useBefunge(
  width: number,
  height: number
): {
  editor: CodeEditor;
  befunge: Befunge;
} {
  const setRenderHelper = useState(0)[1];
  const render = useCallback(() => {
    setRenderHelper(Math.random());
  }, []);

  const b = useRef(new Befunge(width, height, render)).current;
  const e = useRef(new CodeEditor(b.code, b.limits, render)).current;

  useEffect(() => {
    document.addEventListener("keydown", e.onKeyDown);
    document.addEventListener("cut", e.onCut);
    document.addEventListener("copy", e.onCopy);
    document.addEventListener("paste", e.onPaste);
    return (): void => {
      document.removeEventListener("keydown", e.onKeyDown);
      document.removeEventListener("cut", e.onCut);
      document.removeEventListener("copy", e.onCopy);
      document.removeEventListener("paste", e.onPaste);
    };
  }, []);

  return {
    editor: e,
    befunge: b,
  };
}
