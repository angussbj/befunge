import React from "react";
import { Colors, T } from "ui";
import { Direction } from "utilities";
import { GlobalBefungeState } from "logic";
import { UnicodeCalculator } from "./UnicodeCalculator";
import { WalkingSpeedControl } from "./WalkingSpeedControl";
import { ControlPanelRow } from "./ControlPanelRow";
import { ControlPanelColumn } from "./ControlPanelColumn";

export function StateAndSpeed({
  state,
}: {
  state: GlobalBefungeState;
}): React.ReactElement {
  const { editor, core, executor } = state;

  return (
    <ControlPanelColumn style={{ marginLeft: 16, width: 148 }}>
      <ControlPanelRow>
        <T size="small">Code input direction:</T>
        <T
          size="small"
          style={{ marginLeft: 4, color: Colors.ACCENT_BLUE.toString() }}
        >
          {DIRECTION_SYMBOL[editor.direction]}
        </T>
      </ControlPanelRow>
      <ControlPanelRow>
        <T size="small">Input cursor value:</T>
        <T
          size="small"
          style={{ marginLeft: 4, color: Colors.ACCENT_BLUE.toString() }}
        >
          {editor.getSelectedCharacter().charCodeAt(0)}
        </T>
      </ControlPanelRow>
      <ControlPanelRow>
        <T size="small">Execution direction:</T>
        <T
          size="small"
          style={{ marginLeft: 4, color: Colors.ACCENT_ORANGE.toString() }}
        >
          {DIRECTION_SYMBOL[core.direction]}
        </T>
      </ControlPanelRow>
      <ControlPanelRow>
        <T size="small">Execution cursor value:</T>
        <T
          size="small"
          style={{ marginLeft: 4, color: Colors.ACCENT_ORANGE.toString() }}
        >
          {core.getCursorCharacter().charCodeAt(0)}
        </T>
      </ControlPanelRow>
      <ControlPanelRow>
        <T size="small">String mode enabled:</T>
        <T size="small" style={{ marginLeft: 4 }}>
          {core.stringMode ? "Yes" : "No"}
        </T>
      </ControlPanelRow>
      <ControlPanelRow style={{ marginTop: 2, marginBottom: 2 }}>
        <WalkingSpeedControl executor={executor} />
      </ControlPanelRow>
      <T size="small">UTF-16 value translator:</T>
      <ControlPanelRow>
        <UnicodeCalculator />
      </ControlPanelRow>
    </ControlPanelColumn>
  );
}

const DIRECTION_SYMBOL = {
  [Direction.Left]: "←",
  [Direction.Right]: "→",
  [Direction.Up]: "↑",
  [Direction.Down]: "↓",
};
