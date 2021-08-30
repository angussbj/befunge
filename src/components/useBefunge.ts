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
  const e = useRef(new CodeEditor(b, render)).current;

  useEffect(() => {
    document.addEventListener("keydown", e.onKeyDown);
    document.addEventListener("cut", e.onCut);
    document.addEventListener("copy", e.onCopy);
    document.addEventListener("paste", e.onPaste);

    // Default "Hello, world!" program
    e.onPaste({clipboardData: {getData: (): string => "v>v>v>v>v>v>v               \n5 5 5 4 5 5 9               \n6 7-7-2 7 7+8               \n+ +7+22 + +1*               \n3*9*9*2*9*9*>,,,,,,,,,,,,,,@\n*:*:*:*4*9*:                \n * +3+*+3+ *                \n 5 6+6*6+7 5                \n 2 5 5 5 5 2                \n>^>^>^>^>^>^                \n                            \n                            \n                            \n!dlrow ,olleH               \n"}} as unknown as ClipboardEvent); // prettier-ignore

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
