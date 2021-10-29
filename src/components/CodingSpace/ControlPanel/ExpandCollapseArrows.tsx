import { Colors } from "ui";
import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { IconButton } from "ui";

export function ExpandCollapseArrows({
  columns,
  setColumns,
}: {
  columns: number;
  setColumns: (newVal: number) => void;
}): React.ReactElement {
  const showLeft = columns > 1;
  const showRight = columns < 3;

  return (
    <div
      style={{
        alignSelf: "center",
        marginRight: -20,
        display: "flex",
        marginLeft: columns >= 2 ? 12 : 4,
        backgroundColor: Colors.DARKEST.toString(),
        paddingLeft: 2,
        paddingRight: 2,
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: 8,
          overflow: "hidden",
        }}
      >
        {showLeft && (
          <IconButton
            aria-label="collapse-options"
            style={{
              marginLeft: -20,
              marginTop: -8,
              marginBottom: -8,
              backgroundColor: "transparent",
            }}
            onClick={(): void => setColumns(columns - 1)}
          >
            <BsChevronCompactLeft />
          </IconButton>
        )}
      </div>

      <div
        style={{
          width: 8,
          overflow: "hidden",
        }}
      >
        {showRight && (
          <IconButton
            aria-label="expand-options"
            style={{
              marginLeft: -20,
              marginTop: -8,
              marginBottom: -8,
              backgroundColor: "transparent",
            }}
            onClick={(): void => setColumns(columns + 1)}
          >
            <BsChevronCompactRight />
          </IconButton>
        )}
      </div>
    </div>
  );
}
