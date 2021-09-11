import { Row, T, MiniButton } from "ui";
import React from "react";
import { Befunge } from "logic";

export function WalkingSpeedControl({
  befunge: b,
}: {
  befunge: Befunge;
}): React.ReactElement {
  return (
    <>
      <T>Walking speed:</T>
      <Row style={{ marginLeft: 8, justifyContent: "space-between" }}>
        <MiniButton
          label={"-"}
          onClick={b.increaseWalkingDelay}
          disabled={b.walkingDelayIndex >= 4}
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
          {5 - b.walkingDelayIndex}
        </T>
        <MiniButton
          label={"+"}
          onClick={b.decreaseWalkingDelay}
          disabled={b.walkingDelayIndex <= 0}
        />
      </Row>
    </>
  );
}
