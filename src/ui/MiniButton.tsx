import React from "react";
import { Colors } from "./Colors";
import { Button } from "./Button";
import Color from "color";

interface Props {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  color?: string;
  disableElevation?: boolean;
}

export function MiniButton({
  label,
  color,
  disabled,
  style,
  ...rest
}: Props): React.ReactElement {
  const finalColor = (color ? Color(color) : Colors.LIGHT.fade(0.2))
    .fade(disabled === true ? 0.6 : 0)
    .toString();

  return (
    <Button
      label={<div style={{ marginBottom: 2.4 }}>{label}</div>}
      variant="outlined"
      style={{
        minWidth: 16,
        maxWidth: 16,
        minHeight: 16,
        maxHeight: 16,
        color: finalColor,
        borderColor: finalColor,
        ...style,
      }}
      disabled={disabled}
      {...rest}
    />
  );
}
