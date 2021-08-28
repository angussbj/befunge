import React from "react";
import styled from "styled-components";
import { useBefunge } from "./useBefunge";
import { Grid } from "./Grid";
import { Stack } from "./Stack";
import { Output } from "./Output";
import { Row, Button } from "../ui";

export function CodingSpace(): React.ReactElement {
  const { code, selection, onClick, befunge: b } = useBefunge(48, 32);

  return (
    <Container>
      <Grid
        code={code}
        selection={selection}
        onClick={onClick}
        limits={b.limits}
        cursor={b.cursor}
      />
      <Row style={{ marginTop: 16, width: 816, height: 200 }}>
        <Stack stack={b.stack} />
        <ButtonColumn style={{ marginLeft: 16 }}>
          <Button label={"Step"} onClick={b.step} />
          <Button label={"Walk"} onClick={b.walk} style={{ marginTop: 8 }} />
          <Button label={"Run"} onClick={b.run} style={{ marginTop: 8 }} />
          <Button label={"Pause"} onClick={b.pause} style={{ marginTop: 8 }} />
          <Button label={"Reset"} onClick={b.reset} style={{ marginTop: 8 }} />
        </ButtonColumn>
        <Output output={b.output} style={{ marginLeft: 16 }} />
      </Row>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ButtonColumn = styled.div`
  align-self: stretch;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;
