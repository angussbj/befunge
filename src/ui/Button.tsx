import React, { FC } from "react";
import { Colors } from "./Colors";
import Color from "color";
import MaterialButton from "@material-ui/core/Button";

interface Props {
  label: string | FC<{ color?: string }>;
  onClick: () => void;
  color?: Color;
  disabled?: boolean;
}

export function Button({ label, onClick }: Props): React.ReactElement {
  return (
    <MaterialButton
      variant="contained"
      size="small"
      disableElevation
      onClick={onClick}
    >
      {label}
    </MaterialButton>
  );
}
