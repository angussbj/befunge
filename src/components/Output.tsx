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
        flexBasis: 0,
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        alignSelf: "stretch",
        backgroundColor: Colors.LIGHT.toString(),
        padding: 8,
        overflow: "scroll",
        scrollbarWidth: "none",
        ...style,
      }}
    >
      {output}
    </div>
  );
}
