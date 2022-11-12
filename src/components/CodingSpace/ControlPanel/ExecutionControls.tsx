import React from "react";
import { Button } from "ui";
import { GlobalBefungeState } from "logic";
import { ControlPanelColumn } from "./ControlPanelColumn";

export function ExecutionControls({
  state,
  style,
}: {
  state: GlobalBefungeState;
  style: React.CSSProperties;
}): React.ReactElement {
  const { core, executor } = state;

  return (
    <ControlPanelColumn style={style}>
      <Button
        label={"Step"}
        onClick={executor.step}
        disabled={!core.canStep()}
      />
      <Button
        label={executor.walking ? "Pause" : "Walk"}
        onClick={executor.walkOrPause}
        style={{ marginTop: 8 }}
        disabled={core.halted}
      />
      <Button
        label={executor.running ? "Pause" : "Run"}
        onClick={executor.runOrPause}
        style={{ marginTop: 8 }}
        disabled={core.halted}
      />
      <Button
        label={"Reset"}
        onClick={executor.reset}
        style={{ marginTop: 8 }}
      />
    </ControlPanelColumn>
  );
}
