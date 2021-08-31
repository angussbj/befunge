import { Button, Colors } from "../../../ui";
import React from "react";
import styled from "styled-components";
import { Befunge, Direction } from "../../../domain/Befunge";
import { CodeEditor } from "../../../domain/CodeEditor";
import { MiniButton } from "../../../ui/MiniButton";
import { AsciiCalculator } from "./AsciiCalculator";

export function ControlPanel({
  befunge: b,
  editor: e,
}: {
  befunge: Befunge;
  editor: CodeEditor;
}): React.ReactElement {
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
          <Text>Code input direction:</Text>
          <Text style={{ marginLeft: 4, color: Colors.ACCENT_BLUE.toString() }}>
            {DIRECTION_SYMBOL[e.direction]}
          </Text>
        </Row>
        <Row>
          <Text>Input cursor ascii:</Text>
          <Text style={{ marginLeft: 4, color: Colors.ACCENT_BLUE.toString() }}>
            {e.getSelectedCharacter().charCodeAt(0)}
          </Text>
        </Row>
        <Row>
          <Text>Execution direction:</Text>
          <Text
            style={{ marginLeft: 4, color: Colors.ACCENT_ORANGE.toString() }}
          >
            {DIRECTION_SYMBOL[b.direction]}
          </Text>
        </Row>
        <Row>
          <Text>Execution cursor ascii:</Text>
          <Text
            style={{ marginLeft: 4, color: Colors.ACCENT_ORANGE.toString() }}
          >
            {b.getCursorCharacter().charCodeAt(0)}
          </Text>
        </Row>
        <Row>
          <Text>String mode enabled:</Text>
          <Text style={{ marginLeft: 4 }}>{b.stringMode ? "Yes" : "No"}</Text>
        </Row>
        <Row style={{ marginTop: 2, marginBottom: 2 }}>
          <Text>Walking speed:</Text>
          <Row style={{ marginLeft: 8 }}>
            <MiniButton
              label={"-"}
              onClick={b.increaseWalkingDelay}
              disabled={b.walkingDelay >= 4096}
            />
            <UnselectableText
              style={{
                width: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {10 - Math.log2(b.walkingDelay)}
            </UnselectableText>
            <MiniButton
              label={"+"}
              onClick={b.decreaseWalkingDelay}
              disabled={b.walkingDelay <= 1}
            />
          </Row>
        </Row>
        <Text>ASCII value calculator:</Text>
        <Row>
          <AsciiCalculator />
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

const Text = styled.div`
  margin-bottom: 6px;
  font-size: 11px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
`;

const UnselectableText = styled.div`
  margin-bottom: 6px;
  font-size: 11px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Column = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  align-self: stretch;
  justify-content: space-between;
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
