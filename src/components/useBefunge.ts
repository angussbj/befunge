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

    // Paste from either url or default "Hello, world!" program
    const cookieCode = localStorage.getItem("code");
    if (cookieCode) e.code.set(JSON.parse(cookieCode));
    else e.onPaste({clipboardData: {getData: (): string => "v>v>v>v>v>v>v               \n5 5 5 4 5 5 9               \n6 7-7-2 7 7+8               \n+ +7+22 + +1*               \n3*9*9*2*9*9*>,,,,,,,,,,,,,,@\n*:*:*:*4*9*:                \n * +3+*+3+ *                \n 5 6+6*6+7 5                \n 2 5 5 5 5 2                \n>^>^>^>^>^>^                \n                            \n                            \n                            \n!dlrow ,olleH               \n"}} as unknown as ClipboardEvent); // prettier-ignore

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
