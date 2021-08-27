import React from "react";
import { useBefunge } from "./useBefunge";
import { Grid } from "./Grid";
import { Button } from "../ui/Button";
import { Row } from "../ui";
import { Stack } from "./Stack";

export function CodingSpace(): React.ReactElement {
  const { code, selection, onClick, limits, cursor, step, stack } = useBefunge(
    48,
    32
  );

  return (
    <div>
      <Grid
        code={code}
        selection={selection}
        onClick={onClick}
        limits={limits}
        cursor={cursor}
      />
      <Row style={{ marginTop: 16 }}>
        <Stack stack={stack} />
        <div style={{ marginLeft: 16, alignSelf: "stretch" }}>
          <Button label={"Step"} onClick={step} />
        </div>
      </Row>
    </div>
  );
}
