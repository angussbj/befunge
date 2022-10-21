import { Row, T, MiniButton } from "ui";
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
          onClick={executor.increaseWalkingDelay}
          disabled={executor.walkingDelayIndex >= 4}
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
          {5 - executor.walkingDelayIndex}
        </T>
        <MiniButton
          label={"+"}
          onClick={executor.decreaseWalkingDelay}
          disabled={executor.walkingDelayIndex <= 0}
        />
      </Row>
    </>
  );
}
