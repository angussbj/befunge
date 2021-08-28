import React from "react";
import { Colors } from "../ui";

interface Props {
  output: string;
  style?: React.CSSProperties;
}

export function Output({ output, style }: Props): React.ReactElement {
  return (
    <div
      style={{
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: Colors.LIGHT.toString(),
        padding: 8,
        overflowY: "scroll",
        overflowX: "scroll",
        scrollbarWidth: "none",
        ...style,
      }}
    >
      {output}
    </div>
  );
}
