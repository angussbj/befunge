import React, { ReactElement } from "react";
import styled from "styled-components";
import { Colors, Row } from "ui";
import { GlobalBefungeState } from "logic";
import { Grid } from "./Grid";
import { Stack } from "./Stack";
import { InputOutput } from "./InputOutput";
import { ControlPanel } from "./ControlPanel";

// TODO: Layout for narrow screens and mobile
export function CodingSpace({
  state,
}: {
  state: GlobalBefungeState;
}): ReactElement {
  const { limits, code, core, executor, editor } = state;

  return (
    <Container style={{ flexShrink: 1 }}>
      <Label>Code editor</Label>
      <Grid code={code} limits={limits} cursor={core.cursor} editor={editor} />
      <Row
        style={{
          marginTop: 16,
          height: 220,
          alignSelf: "stretch",
        }}
      >
        <Column>
          <Label>Stack</Label>
          <Stack stack={core.stack} />
        </Column>
        <Column style={{ marginLeft: 16 }}>
          <Label>Control panel</Label>
          <ControlPanel state={state} />
        </Column>
        <Column style={{ marginLeft: 16, flexGrow: 1 }}>
          <Label>Input + output</Label>
          <InputOutput
            output={core.output}
            requestingInput={core.requestingInput}
            submitInput={executor.acceptInput}
          />
        </Column>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  max-width: fit-content;
  flex-direction: column;
`;

const Column = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 6px;
  font-size: 11px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
`;
