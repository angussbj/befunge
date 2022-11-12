import { Colors, IconButton } from "ui";
import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import styled from "styled-components";

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
    <PositioningContainer>
      <div
        style={{
          alignSelf: "center",
          display: "flex",
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
    </PositioningContainer>
  );
}

const PositioningContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 20px;
  margin-right: -10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
