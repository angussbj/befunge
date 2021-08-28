import React, { useCallback } from "react";
import { Row } from "../../ui";
import { Square } from "./Square";
import { Coordinate, range } from "../../utilities";

export function Grid({
  code,
  selection,
  selectionDelta,
  onClick,
  limits,
  cursor,
}: {
  code: string[][];
  selection: Coordinate;
  selectionDelta: Coordinate;
  onClick: (x: number, y: number) => () => void;
  limits: Coordinate;
  cursor: Coordinate;
}): React.ReactElement {
  const isSelectedX = useCallback(
    getSelectionCheckFunction(selection.x, selectionDelta.x),
    [selection.x, selectionDelta.x]
  );

  const isSelectedY = useCallback(
    getSelectionCheckFunction(selection.y, selectionDelta.y),
    [selection.y, selectionDelta.y]
  );

  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ marginRight: -1, marginBottom: -1 }}>
        {range(0, limits.y).map((y) => (
          <Row key={y}>
            {range(0, limits.x).map((x) => (
              <Square
                val={code[x][y]}
                selected={isSelectedX(x) && isSelectedY(y)}
                cursored={x === cursor.x && y === cursor.y}
                onClick={onClick(x, y)}
                key={`${x},${y}`}
              />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}

function getSelectionCheckFunction(
  coordinate: number,
  delta: number
): (a: number) => boolean {
  return delta === 0
    ? (a: number): boolean => a === coordinate
    : delta < 0
    ? (a: number): boolean => coordinate + delta <= a && a <= coordinate
    : (a: number): boolean => coordinate <= a && a <= coordinate + delta;
}
