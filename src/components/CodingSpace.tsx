import React from "react";
import styled from "styled-components";
import { useBefunge } from "./useBefunge";
import { Grid } from "./Grid";
import { Stack } from "./Stack";
import { InputOutput } from "./InputOutput/InputOutput";
import { Row, Button, Colors } from "../ui";

export function CodingSpace(): React.ReactElement {
  const width = 80;
  const height = 25;
  const { editor: e, befunge: b } = useBefunge(width, height);

  return (
    <Container>
      <div>
        <Label>Code editor</Label>
        <Grid code={b.code.code} cursor={b.cursor} editor={e} />
      </div>
      <Row style={{ marginTop: 16, width: 15 * width, height: 220 }}>
        <Column>
          <Label>Stack</Label>
          <Stack stack={b.stack} />
        </Column>
        <Column style={{ marginLeft: 16 }}>
          <Label>Controls</Label>
          <ButtonColumn style={{ flex: 1 }}>
            <Button label={"Step"} onClick={b.step} />
            <Button label={"Walk"} onClick={b.walk} style={{ marginTop: 8 }} />
            <Button label={"Run"} onClick={b.run} style={{ marginTop: 8 }} />
            <Button
              label={"Pause"}
              onClick={b.pause}
              style={{ marginTop: 8 }}
            />
            <Button
              label={"Reset"}
              onClick={b.reset}
              style={{ marginTop: 8 }}
            />
          </ButtonColumn>
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

const ButtonColumn = styled.div`
  align-self: stretch;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  margin-bottom: 6px;
  font-size: 11px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
`;
