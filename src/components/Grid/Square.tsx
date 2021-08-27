import styled from "styled-components";
import React from "react";
import { Colors } from "../../ui/Colors";

const LIGHT = Colors.LIGHT.toString();
const BOTH_CURSORS = Colors.GREY.toString();
const WRITING_CURSOR = Colors.WRITING_CURSOR.toString();
const EXECUTING_CURSOR = Colors.EXECUTING_CURSOR.toString();

export function Square({
  val,
  selected,
  cursored,
  onClick,
}: {
  val: string;
  selected: boolean;
  cursored: boolean;
  onClick: () => void;
}): React.ReactElement {
  const color = !(selected || cursored)
    ? LIGHT
    : selected && cursored
    ? BOTH_CURSORS
    : selected
    ? WRITING_CURSOR
    : EXECUTING_CURSOR;

  return (
    <Background color={color} onClick={onClick}>
      {val}
    </Background>
  );
}

const Background = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }): string => color};
  border-right: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
`;
