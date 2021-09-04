import { Row, T } from "../../../ui";
import React, { useState } from "react";
import { createTheme, TextField, ThemeProvider } from "@material-ui/core";

export function AsciiCalculator(): React.ReactElement {
  const [char, setChar] = useState("A");
  const [num, setNum] = useState("A".charCodeAt(0).toString());

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Row style={{ flex: 1, justifyContent: "center", marginBottom: 6 }}>
        <TextField
          value={char}
          onChange={(e): void => {
            const input = e.target.value.toString();
            const value = input.charAt(input.length - 1);
            setChar(value);
            setNum(value ? value.charCodeAt(0).toString() : "");
          }}
          style={{ width: 16, height: 10, marginTop: -16 }}
          size="small"
        />
        <T size="small" unselectable style={{ marginLeft: 16 }}>
          α↔n
        </T>
        <TextField
          value={num}
          onChange={(e): void => {
            const n = e.target.value.toString().replace(/[^0-9]/, "");
            setNum(n);
            setChar(String.fromCharCode(parseInt(n)));
          }}
          style={{
            marginLeft: 16,
            width: 52,
            height: 12,
            marginTop: -16,
          }}
          size="small"
        />
      </Row>
    </ThemeProvider>
  );
}
