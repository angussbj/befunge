import { Colors, Row } from "../../../ui";
import React, { useState } from "react";
import { createTheme, TextField, ThemeProvider } from "@material-ui/core";
import styled from "styled-components";

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
            const a = e.target.value.toString().charAt(0);
            setChar(a);
            setNum(a ? a.charCodeAt(0).toString() : "");
          }}
          style={{ width: 16, height: 10, marginTop: -16 }}
          size="small"
        />
        <UnselectableText style={{ marginLeft: 16 }}>α↔n</UnselectableText>
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

const UnselectableText = styled.div`
  margin-bottom: 6px;
  font-size: 11px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
