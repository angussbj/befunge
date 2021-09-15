import React, { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import MaterialUICheckbox from "@material-ui/core/Checkbox";
import { Colors } from "./Colors";

interface Props<T extends string> {
  object: { [key in T]: boolean };
  k: T;
  onChange: (newValue: boolean) => void;
  style?: React.CSSProperties;
}

export function Checkbox<T extends string>({
  object,
  k,
  onChange,
  style,
}: Props<T>): React.ReactElement {
  const [renderHelper, setRenderHelper] = useState(false);

  return (
    <div style={style}>
      <div style={{ margin: -4 }}>
        <MaterialUICheckbox
          checked={object[k]}
          onChange={(event): void => {
            onChange(event.target.checked);
            setRenderHelper(!renderHelper);
          }}
          icon={
            <ImCheckboxUnchecked
              size={11}
              color={Colors.ACCENT_BLUE.toString()}
            />
          }
          checkedIcon={
            <ImCheckboxChecked
              size={11}
              color={Colors.ACCENT_BLUE.toString()}
            />
          }
        />
      </div>
    </div>
  );
}
