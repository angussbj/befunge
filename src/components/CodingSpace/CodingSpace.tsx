import React from "react";
import styled from "styled-components";
import { useBefunge } from "../useBefunge";
import { Grid } from "../Grid";
import { Stack } from "../Stack";
import { InputOutput } from "../InputOutput";
import { Row, Colors } from "../../ui";
import { ControlPanel } from "./ControlPanel";

export function CodingSpace(): React.ReactElement {
  const width = 80;
  const height = 25;
  const { editor: e, befunge: b } = useBefunge(width, height);

  return (
    <Container>
      <div>
        <Label>Code editor</Label>
        <Grid code={b.code} cursor={b.cursor} editor={e} />
      </div>
      <Row style={{ marginTop: 16, width: 15 * width, height: 220 }}>
        <Column>
          <Label>Stack</Label>
          <Stack stack={b.stack} />
        </Column>
        <Column style={{ marginLeft: 16 }}>
          <Label>Control panel</Label>
          <ControlPanel befunge={b} editor={e} />
        </Column>
        <Column style={{ marginLeft: 16, flexGrow: 1 }}>
          <Label>Input + output</Label>
          <InputOutput
            output={b.output}
            requestingInput={b.requestingInput}
            submitInput={b.acceptInput}
          />
        </Column>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Column = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  margin-bottom: 6px;
  font-size: 11px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
`;
