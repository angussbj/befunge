import { MiniButton, Row, T } from "ui";
import React from "react";
import { BefungeRunner } from "logic";

export function WalkingSpeedControl({
  executor,
}: {
  executor: BefungeRunner;
}): React.ReactElement {
  return (
    <>
      <T>Walking speed:</T>
      <Row style={{ marginLeft: 8, justifyContent: "space-between" }}>
        <MiniButton
          label={"-"}
          onClick={executor.walkingSpeed.goSlower}
          disabled={!executor.walkingSpeed.canGoSlower()}
        />
        <T
          size="small"
          unselectable
          style={{
            width: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {executor.walkingSpeed.getSpeed()}
        </T>
        <MiniButton
          label={"+"}
          onClick={executor.walkingSpeed.goFaster}
          disabled={!executor.walkingSpeed.canGoFaster()}
        />
      </Row>
    </>
  );
}
