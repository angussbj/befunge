import React from "react";
import { Checkbox, T } from "ui";
import { GlobalBefungeState } from "logic";
import { ControlPanelColumn } from "./ControlPanelColumn";
import { ControlPanelRow } from "./ControlPanelRow";

export function EditorControls({
  state,
}: {
  state: GlobalBefungeState;
}): React.ReactElement {
  const { editor } = state;

  return (
    <ControlPanelColumn
      style={{ marginLeft: 16, justifyContent: "flex-start" }}
    >
      <ControlPanelRow>
        <T size="small" style={{ width: 120 }}>
          Change input direction on{" "}
          <text style={{ fontFamily: "monospace" }}>{"<>^v"}</text>:
        </T>
        <Checkbox
          object={editor.options}
          k={"changeDirectionOnDirectionCharacters"}
          onChange={(newVal: boolean): void =>
            editor.options.setChangeDirectionOnDirectionCharacters(newVal)
          }
          style={{ marginLeft: 4 }}
        />
      </ControlPanelRow>
      <ControlPanelRow style={{ marginTop: 4 }}>
        <T size="small" style={{ width: 120 }}>
          Cut/copy/paste in selection direction:
        </T>
        <Checkbox
          object={editor.options}
          k={"useSelectionDirectionForCutCopyPaste"}
          onChange={(newVal: boolean): void =>
            editor.options.setUseSelectionDirectionForCutCopyPaste(newVal)
          }
          style={{ marginLeft: 4 }}
        />
      </ControlPanelRow>
    </ControlPanelColumn>
  );
}
