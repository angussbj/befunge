import { Colors } from "../../../ui";
import React from "react";
import styled from "styled-components";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { IconButton } from "@material-ui/core";

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
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TriangleLeft show={showLeft} />
        <TriangleRight show={showRight} />
      </div>

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
              color: Colors.ACCENT_BLUE.toString(),
              marginLeft: -20,
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
              color: Colors.ACCENT_BLUE.toString(),
              marginLeft: -20,
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

const TriangleLeft = styled.div<{ show: boolean }>`
  border-right: 12px solid
    ${({ show }): string => (show ? Colors.DARKEST.toString() : "transparent")};
  border-top: 24px solid transparent;
  border-bottom: 24px solid transparent;
  margin-left: -4px;
`;
const TriangleRight = styled.div<{ show: boolean }>`
  border-left: 12px solid
    ${({ show }): string => (show ? Colors.DARKEST.toString() : "transparent")};
  border-top: 24px solid transparent;
  border-bottom: 24px solid transparent;
`;
