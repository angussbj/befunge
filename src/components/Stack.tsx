import React from "react";
import { Colors } from "../ui/Colors";

export function Stack({ stack }: { stack: number[] }): React.ReactElement {
  return (
    <div
      style={{
        minWidth: 120,
        height: 240,
        backgroundColor: Colors.LIGHT.toString(),
        padding: 8,
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      {stack
        .slice()
        .reverse()
        .map((value, index) => (
          <div key={index}>{value}</div>
        ))}
    </div>
  );
}
