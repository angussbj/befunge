import React from "react";
import { Row } from "../../ui";
import { Square } from "./Square";
import { Coordinate, range } from "../../utilities";

export function Grid({
  code,
  selection,
  onClick,
  limits,
  cursor,
}: {
  code: string[][];
  selection: Coordinate;
  onClick: (x: number, y: number) => () => void;
  limits: Coordinate;
  cursor: Coordinate;
}): React.ReactElement {
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ marginRight: -1, marginBottom: -1 }}>
        {range(0, limits.y).map((y) => (
          <Row key={y}>
            {range(0, limits.x).map((x) => (
              <Square
                val={code[x][y]}
                selected={x === selection.x && y === selection.y}
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
