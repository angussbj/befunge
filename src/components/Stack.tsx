import React from "react";
import { Colors } from "../ui/Colors";

interface Props {
  stack: number[];
  style?: React.CSSProperties;
}

export function Stack({ stack, style }: Props): React.ReactElement {
  return (
    <div
      style={{
        width: 120,
        flex: 1,
        backgroundColor: Colors.LIGHT.toString(),
        padding: 8,
        overflow: "scroll",
        scrollbarWidth: "none",
        ...style,
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
