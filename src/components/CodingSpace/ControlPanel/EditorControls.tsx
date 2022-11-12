import React from "react";
import { Checkbox, T } from "ui";
import { GlobalBefungeState } from "logic";
import { ControlPanelColumn } from "./ControlPanelColumn";
import { ControlPanelRow } from "./ControlPanelRow";

export function EditorControls({
  state,
  style,
}: {
  state: GlobalBefungeState;
  style: React.CSSProperties;
}): React.ReactElement {
  const { editor } = state;

  return (
    <ControlPanelColumn style={{ ...style, justifyContent: "flex-start" }}>
      <ControlPanelRow>
        <T size="small">
          Change input direction on{" "}
          <span style={{ fontFamily: "monospace" }}>{"<>^v"}</span>:
        </T>
        <Checkbox
          object={editor.options}
          k={"changeDirectionOnDirectionCharacters"}
          ariaLabel={"Change input direction when typing >, <, ^, or v"}
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
          ariaLabel={
            "Use direction of selection to determine the rotation and reflection of text when cutting, copying, and pasting"
          }
          onChange={(newVal: boolean): void =>
            editor.options.setUseSelectionDirectionForCutCopyPaste(newVal)
          }
          style={{ marginLeft: 4 }}
        />
      </ControlPanelRow>
    </ControlPanelColumn>
  );
}
