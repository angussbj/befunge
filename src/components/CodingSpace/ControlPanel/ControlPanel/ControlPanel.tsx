import { Button, Colors, T } from "../../../../ui";
import React from "react";
import styled from "styled-components";
import { Befunge, Direction } from "../../../../domain/Befunge";
import { CodeEditor } from "../../../../domain/CodeEditor";
import { AsciiCalculator } from "./AsciiCalculator";
import { WalkingSpeedControl } from "./WalkingSpeedControl";
import { Checkbox } from "../../../../ui/Checkbox";

export function ControlPanel({
  befunge: b,
  editor: e,
}: {
  befunge: Befunge;
  editor: CodeEditor;
}): React.ReactElement {
  console.log("A", e.changeDirectionOnDirectionCharacters);
  return (
    <Container style={{ flex: 1 }}>
      <Column>
        <Button label={"Step"} onClick={b.step} />
        <Button
          label={b.walking ? "Pause" : "Walk"}
          onClick={b.walking ? b.pause : b.walk}
          style={{ marginTop: 8 }}
        />
        <Button
          label={b.running ? "Pause" : "Run"}
          onClick={b.running ? b.pause : b.run}
          style={{ marginTop: 8 }}
        />
        <Button label={"Reset"} onClick={b.reset} style={{ marginTop: 8 }} />
      </Column>
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
          <T size="small">Input cursor ascii:</T>
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
          <T size="small">Execution cursor ascii:</T>
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
        <T size="small">ASCII value calculator:</T>
        <Row>
          <AsciiCalculator />
        </Row>
      </Column>
      <Column style={{ marginLeft: 16 }}>
        <Row>
          <T size="small" style={{ width: 120 }}>
            Change input direction on{" "}
            <text style={{ fontFamily: "monospace" }}>{"<>^v"}</text>:
          </T>
          <Checkbox
            object={e}
            k={"changeDirectionOnDirectionCharacters"}
            style={{ marginLeft: 4 }}
          />
        </Row>
      </Column>
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
