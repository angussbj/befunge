import React from "react";
import { Row } from "../../ui";
import { Square } from "../Square";
import { Coordinate, range } from "../../utilities";
import { useGridTyping } from "./useGridTyping";

export function Grid(): React.ReactElement {
  const limits = new Coordinate(48, 32);
  const { code, selection, onClick } = useGridTyping(limits);

  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ marginRight: -1, marginBottom: -1 }}>
        {range(0, limits.y).map((y) => (
          <Row>
            {range(0, limits.x).map((x) => (
              <Square
                val={code[x][y]}
                selected={x === selection.x && y === selection.y}
                onClick={onClick(x, y)}
              />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}
