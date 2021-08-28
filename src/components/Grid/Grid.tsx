import React, { useCallback } from "react";
import { Row } from "../../ui";
import { Square } from "./Square";
import { Coordinate, modulo, range } from "../../utilities";

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
    getSelectionCheckFunction(selection.x, selectionDelta.x, limits.x),
    [selection.x, selectionDelta.x]
  );

  const isSelectedY = useCallback(
    getSelectionCheckFunction(selection.y, selectionDelta.y, limits.y),
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
  delta: number,
  limit: number
): (a: number) => boolean {
  if (delta === 0) return (a: number): boolean => a === coordinate;
  const sum = coordinate + delta;
  const modSum = modulo(coordinate + delta, limit);
  if (delta < 0) {
    if (modSum === sum)
      return (a: number): boolean => coordinate + delta <= a && a <= coordinate;
    else return (a: number): boolean => a <= coordinate || a >= modSum;
  } else {
    if (modSum === sum)
      return (a: number): boolean => coordinate <= a && a <= coordinate + delta;
    else return (a: number): boolean => a <= modSum || a >= coordinate;
  }
}
