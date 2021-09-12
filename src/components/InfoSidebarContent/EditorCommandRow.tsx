import { Row, T } from "ui";
import React from "react";

interface Props {
  command: React.ReactNode;
  description?: React.ReactNode;
  customCommandStyle?: boolean;
  style: React.CSSProperties;
}

export function EditorCommandRow({
  command,
  description,
  customCommandStyle,
  style,
}: Props): React.ReactElement {
  const commandComponent = customCommandStyle ? (
    command
  ) : (
    <T monospace>{command}</T>
  );

  return (
    <Row style={{ ...style }}>
      <div style={{ width: 68, justifyContent: "center", display: "flex" }}>
        {commandComponent}
      </div>
      <div style={{ marginLeft: 12, flex: 1 }}>{description}</div>
    </Row>
  );
}
