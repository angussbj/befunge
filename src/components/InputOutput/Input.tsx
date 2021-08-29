import React, { useState } from "react";
import { Button } from "../../ui";
import { TextField } from "@material-ui/core";

interface Props {
  submitInput: (input: string) => void;
}

export function Input({ submitInput }: Props): React.ReactElement {
  const [input, setInput] = useState("");

  return (
    <>
      <TextField
        value={input}
        onChange={(e): void => {
          setInput(e.target.value);
        }}
        style={{ marginLeft: 8, width: 80, height: 12 }}
        size="small"
      />
      <Button
        label={"Submit"}
        onClick={(): void => {
          submitInput(input);
          setInput("");
        }}
        style={{ marginLeft: 8 }}
        color="secondary"
        disableElevation={false}
      />
    </>
  );
}
