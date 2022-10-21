import { Button, Checkbox, Colors, T } from "ui";
import React from "react";
import styled from "styled-components";
import { UnicodeCalculator } from "./UnicodeCalculator";
import { WalkingSpeedControl } from "./WalkingSpeedControl";
import { Direction } from "utilities";
import { ExpandCollapseArrows } from "./ExpandCollapseArrows";
import { useLocalStorageState } from "../../../utilities/useLocalStorageState";
import { GlobalBefungeState } from "../../useGlobalBefungeState";

// TODO: break up components
export function ControlPanel({
  state,
}: {
  state: GlobalBefungeState;
}): React.ReactElement {
  const { limits, code, core, editor, executor } = state;
  const [columns, setColumns] = useLocalStorageState({
    storageKey: "controlPanelColumns",
    initialValue: 2,
  });

  return (
    <Container style={{ flex: 1 }}>
      <Column>
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
      </Column>
      {columns >= 2 && (
        <Column style={{ marginLeft: 16 }}>
          <Row>
            <T size="small">Code input direction:</T>
            <T
              size="small"
              style={{ marginLeft: 4, color: Colors.ACCENT_BLUE.toString() }}
            >
              {DIRECTION_SYMBOL[editor.direction]}
            </T>
          </Row>
          <Row>
            <T size="small">Input cursor value:</T>
            <T
              size="small"
              style={{ marginLeft: 4, color: Colors.ACCENT_BLUE.toString() }}
            >
              {editor.getSelectedCharacter().charCodeAt(0)}
            </T>
          </Row>
          <Row>
            <T size="small">Execution direction:</T>
            <T
              size="small"
              style={{ marginLeft: 4, color: Colors.ACCENT_ORANGE.toString() }}
            >
              {DIRECTION_SYMBOL[core.direction]}
            </T>
          </Row>
          <Row>
            <T size="small">Execution cursor value:</T>
            <T
              size="small"
              style={{ marginLeft: 4, color: Colors.ACCENT_ORANGE.toString() }}
            >
              {core.getCursorCharacter().charCodeAt(0)}
            </T>
          </Row>
          <Row>
            <T size="small">String mode enabled:</T>
            <T size="small" style={{ marginLeft: 4 }}>
              {core.stringMode ? "Yes" : "No"}
            </T>
          </Row>
          <Row style={{ marginTop: 2, marginBottom: 2 }}>
            <WalkingSpeedControl executor={executor} />
          </Row>
          <T size="small">UTF-16 value translator:</T>
          <Row>
            <UnicodeCalculator />
          </Row>
        </Column>
      )}
      {columns >= 3 && (
        <Column style={{ marginLeft: 16, justifyContent: "flex-start" }}>
          <Row>
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
          </Row>
          <Row style={{ marginTop: 4 }}>
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
          </Row>
        </Column>
      )}

      <ExpandCollapseArrows columns={columns} setColumns={setColumns} />
    </Container>
  );
}

const DIRECTION_SYMBOL = {
  [Direction.Left]: "←",
  [Direction.Right]: "→",
  [Direction.Up]: "↑",
  [Direction.Down]: "↓",
};

const Column = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  padding: 12px;
  background-color: ${Colors.DARKER.toString()};
  shadow: -2px 2px 4px rgba(0, 0, 0, 0.3);
`;
