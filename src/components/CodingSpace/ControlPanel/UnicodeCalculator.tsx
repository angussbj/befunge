import { Colors, Row, T, TextField } from "ui";
import React, { useState } from "react";

export function UnicodeCalculator(): React.ReactElement {
  const [char, setChar] = useState("A");
  const [num, setNum] = useState("A".charCodeAt(0).toString());

  return (
    <>
      <Row style={{ flex: 1, justifyContent: "center", marginBottom: 6 }}>
        <TextField
          value={char}
          onChange={(newVal): void => {
            const input = newVal;
            const value = input.charAt(input.length - 1);
            setChar(value);
            setNum(value ? value.charCodeAt(0).toString() : "");
          }}
          style={{
            backgroundColor: Colors.DARKER.toString(),
            color: Colors.LIGHT.toString(),
            width: 11,
          }}
        />
        <T size="small" unselectable style={{ marginLeft: 16 }}>
          α↔n
        </T>
        <TextField
          value={num}
          onChange={(newVal): void => {
            const n = newVal.replace(/[^0-9]/, "");
            setNum(n);
            setChar(String.fromCharCode(parseInt(n)));
          }}
          style={{
            backgroundColor: Colors.DARKER.toString(),
            color: Colors.LIGHT.toString(),
            width: 40,
            marginLeft: 16,
          }}
        />
      </Row>
    </>
  );
}
