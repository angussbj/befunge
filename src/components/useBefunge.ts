import { useCallback, useRef, useEffect } from "react";
import { Befunge, CodeEditor } from "logic";

export function useBefunge(
  render: () => void,
  width = 80,
  height = 25
): {
  editor: CodeEditor;
  befunge: Befunge;
} {
  const onChange = useCallback((code?: string): void => {
    if (code) localStorage.setItem("code", code);
    render();
  }, []);

  const b = useRef(new Befunge(width, height, onChange)).current;
  const e = useRef(new CodeEditor(b, onChange)).current;

  useEffect(() => {
    document.addEventListener("keydown", e.onKeyDown);
    document.addEventListener("cut", e.onCut);
    document.addEventListener("copy", e.onCopy);
    document.addEventListener("paste", e.onPaste);

    // Paste from local storage
    const cookieCode = localStorage.getItem("code");
    if (cookieCode) e.code.set(JSON.parse(cookieCode));

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
