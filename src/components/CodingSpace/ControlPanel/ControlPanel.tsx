import { Button, Colors, Checkbox, T } from "ui";
import React from "react";
import styled from "styled-components";
import { Befunge, CodeEditor } from "logic";
import { UnicodeCalculator } from "./UnicodeCalculator";
import { WalkingSpeedControl } from "./WalkingSpeedControl";
import { Direction } from "utilities";
import { ExpandCollapseArrows } from "./ExpandCollapseArrows";
import { useLocalStorageAsState } from "../../../utilities/useLocalStorageAsState";

export function ControlPanel({
  befunge: b,
  editor: e,
}: {
  befunge: Befunge;
  editor: CodeEditor;
}): React.ReactElement {
  const [columns, setColumns] = useLocalStorageAsState({
    storageKey: "controlPanelColumns",
    initialValue: 2,
  });

  return (
    <Container style={{ flex: 1 }}>
      <Column>
        <Button
          label={"Step"}
          onClick={b.step}
          disabled={!!b.requestingInput || b.halted}
        />
        <Button
          label={b.walking ? "Pause" : "Walk"}
          onClick={b.walking ? b.pause : b.walk}
          style={{ marginTop: 8 }}
          disabled={b.halted}
        />
        <Button
          label={b.running ? "Pause" : "Run"}
          onClick={b.running ? b.pause : b.run}
          style={{ marginTop: 8 }}
          disabled={b.halted}
        />
        <Button label={"Reset"} onClick={b.reset} style={{ marginTop: 8 }} />
      </Column>
      {columns >= 2 && (
        <Column style={{ marginLeft: 16 }}>
          <Row>
            <T size="small">Code input direction:</T>
            <T
              size="small"
              style={{ marginLeft: 4, color: Colors.ACCENT_BLUE.toString() }}
            >
              {DIRECTION_SYMBOL[e.direction]}
            </T>
          </Row>
          <Row>
            <T size="small">Input cursor value:</T>
            <T
              size="small"
              style={{ marginLeft: 4, color: Colors.ACCENT_BLUE.toString() }}
            >
              {e.getSelectedCharacter().charCodeAt(0)}
            </T>
          </Row>
          <Row>
            <T size="small">Execution direction:</T>
            <T
              size="small"
              style={{ marginLeft: 4, color: Colors.ACCENT_ORANGE.toString() }}
            >
              {DIRECTION_SYMBOL[b.direction]}
            </T>
          </Row>
          <Row>
            <T size="small">Execution cursor value:</T>
            <T
              size="small"
              style={{ marginLeft: 4, color: Colors.ACCENT_ORANGE.toString() }}
            >
              {b.getCursorCharacter().charCodeAt(0)}
            </T>
          </Row>
          <Row>
            <T size="small">String mode enabled:</T>
            <T size="small" style={{ marginLeft: 4 }}>
              {b.stringMode ? "Yes" : "No"}
            </T>
          </Row>
          <Row style={{ marginTop: 2, marginBottom: 2 }}>
            <WalkingSpeedControl befunge={b} />
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
              object={e.options}
              k={"changeDirectionOnDirectionCharacters"}
              onChange={(newVal: boolean): void =>
                e.options.setChangeDirectionOnDirectionCharacters(newVal)
              }
              style={{ marginLeft: 4 }}
            />
          </Row>
          <Row style={{ marginTop: 4 }}>
            <T size="small" style={{ width: 120 }}>
              Cut/copy/paste in selection direction:
            </T>
            <Checkbox
              object={e.options}
              k={"useSelectionDirectionForCutCopyPaste"}
              onChange={(newVal: boolean): void =>
                e.options.setUseSelectionDirectionForCutCopyPaste(newVal)
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
