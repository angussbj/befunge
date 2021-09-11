import { Row } from "../../ui";
import React from "react";
import { SquareBackground } from "./SquareBackground";

interface Props {
  command: React.ReactNode;
  description?: React.ReactElement;
  customCommandStyle?: boolean;
  style: React.CSSProperties;
}

export function CommandRow({
  command,
  description,
  customCommandStyle,
  style,
}: Props): React.ReactElement {
  const commandComponent = customCommandStyle ? (
    command
  ) : (
    <SquareBackground style={{ marginTop: 0 }}>{command}</SquareBackground>
  );

  return (
    <Row style={{ alignItems: "flex-start", ...style }}>
      {commandComponent}
      <div style={{ marginLeft: 12, flex: 1 }}>{description}</div>
    </Row>
  );
}
