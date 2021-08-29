import React, { FC } from "react";
import MaterialButton from "@material-ui/core/Button";

interface Props {
  label: string | FC<{ color?: string }>;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  color?: "secondary";
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
