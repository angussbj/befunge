import { useCallback, useRef, useEffect } from "react";
import {
  BefungeRunner,
  BefungeCore,
  Code,
  CodeEditor,
  GlobalBefungeState,
} from "logic";
import { Coordinate } from "utilities";

export function useGlobalBefungeState(
  render: () => void,
  width = 80,
  height = 25
): GlobalBefungeState {
  const onChange = useCallback((code?: string): void => {
    if (code) localStorage.setItem("code", code);
    render();
  }, []);

  const limits = useRef(new Coordinate(width, height)).current;
  const code = useRef(new Code(width, height)).current;
  const core = useRef(new BefungeCore(limits, code)).current;
  const executor = useRef(
    new BefungeRunner(limits, code, core, onChange)
  ).current;
  const editor = useRef(
    new CodeEditor(code, limits, executor, onChange)
  ).current;

  useEffect(() => {
    document.addEventListener("keydown", editor.onKeyDown);
    document.addEventListener("cut", editor.onCut);
    document.addEventListener("copy", editor.onCopy);
    document.addEventListener("paste", editor.onPaste);

    // Load code from local storage
    const cookieCode = localStorage.getItem("code");
    if (cookieCode) code.set(JSON.parse(cookieCode));

    return (): void => {
      document.removeEventListener("keydown", editor.onKeyDown);
      document.removeEventListener("cut", editor.onCut);
      document.removeEventListener("copy", editor.onCopy);
      document.removeEventListener("paste", editor.onPaste);
    };
  }, []);

  return { limits, code, core, editor, executor };
}
