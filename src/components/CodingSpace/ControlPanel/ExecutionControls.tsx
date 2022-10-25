import React from "react";
import { Button } from "ui";
import { GlobalBefungeState } from "logic";
import { ControlPanelColumn } from "./ControlPanelColumn";

export function ExecutionControls({
  state,
}: {
  state: GlobalBefungeState;
}): React.ReactElement {
  const { core, executor } = state;

  return (
    <ControlPanelColumn>
      <Button label={"Step"} onClick={core.step} disabled={!core.canStep()} />
      <Button
        label={executor.walking ? "Pause" : "Walk"}
        onClick={executor.walking ? executor.pause : executor.walk}
        style={{ marginTop: 8 }}
        disabled={core.halted}
      />
      <Button
        label={executor.running ? "Pause" : "Run"}
        onClick={executor.running ? executor.pause : executor.run}
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
