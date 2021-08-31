import React from "react";
import MaterialButton from "@material-ui/core/Button";

interface Props {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  color?: "primary" | "secondary";
  variant?: "text" | "outlined";
  disableElevation?: boolean;
}

export function Button({ label, onClick, ...rest }: Props): React.ReactElement {
  return (
    <MaterialButton
      variant="contained"
      size="small"
      disableElevation
      onClick={onClick}
      {...rest}
    >
      {label}
    </MaterialButton>
  );
}
