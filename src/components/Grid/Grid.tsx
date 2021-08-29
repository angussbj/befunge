import React, { useCallback } from "react";
import { Row } from "../../ui";
import { Square } from "./Square";
import { Coordinate, modulo, range } from "../../utilities";
import { CodeEditor } from "../../domain/CodeEditor";

export function Grid({
  code,
  cursor,
  editor: e,
}: {
  code: string[][];
  cursor: Coordinate;
  editor: CodeEditor;
}): React.ReactElement {
  const isSelectedX = useCallback(
    getSelectionCheckFunction(e.selection.x, e.selectionDelta.x, e.limits.x),
    [e.selection.x, e.selectionDelta.x, e.limits.x]
  );

  const isSelectedY = useCallback(
    getSelectionCheckFunction(e.selection.y, e.selectionDelta.y, e.limits.y),
    [e.selection.y, e.selectionDelta.y, e.limits.y]
  );

  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ marginRight: -1, marginBottom: -1 }}>
        {range(0, e.limits.y).map((y) => (
          <Row key={y}>
            {range(0, e.limits.x).map((x) => (
              <Square
                val={code[x][y]}
                selected={isSelectedX(x) && isSelectedY(y)}
                cursored={x === cursor.x && y === cursor.y}
                onMouseDown={e.onMouseDown(x, y)}
                onMouseOver={e.onMouseOver(x, y)}
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
