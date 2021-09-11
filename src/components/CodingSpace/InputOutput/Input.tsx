import React, { useCallback, useMemo, useState } from "react";
import { TextField, Button } from "ui";

interface Props {
  submitInput: (input: string) => void;
  inputType: "number" | "character";
}

export function Input({ submitInput, inputType }: Props): React.ReactElement {
  const [input, setInput] = useState("");

  const parseInput = useMemo(
    () =>
      inputType === "character"
        ? (input: string): string => input.charAt(input.length - 1)
        : inputType === "number"
        ? (input: string): string => input.replace(/[^0-9]/, "")
        : (input: string): string => input,
    [inputType]
  );

  const onSubmit = useCallback((): void => {
    submitInput(input);
    setInput("");
  }, [input]);

  return (
    <>
      <TextField
        value={input}
        onChange={(newVal): void => setInput(parseInput(newVal))}
        style={{ width: 80 }}
        focusFirstRender
        onSubmit={onSubmit}
      />
      <Button
        label={"Submit"}
        onClick={onSubmit}
        style={{ marginLeft: 8 }}
        color="secondary"
        disableElevation={false}
      />
    </>
  );
}
