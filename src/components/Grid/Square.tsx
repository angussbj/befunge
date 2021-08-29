import React, { MouseEvent } from "react";
import styled from "styled-components";
import { Colors } from "../../ui/Colors";

const LIGHT = Colors.LIGHT.toString();
const BOTH_CURSORS = Colors.GREY.toString();
const WRITING_CURSOR = Colors.WRITING_CURSOR.toString();
const EXECUTING_CURSOR = Colors.EXECUTING_CURSOR.toString();

export function Square({
  val,
  selected,
  cursored,
  onMouseDown,
  onMouseOver,
}: {
  val: string;
  selected: boolean;
  cursored: boolean;
  onMouseDown: (e: MouseEvent) => void;
  onMouseOver: (e: MouseEvent) => void;
}): React.ReactElement {
  const color = !(selected || cursored)
    ? LIGHT
    : selected && cursored
    ? BOTH_CURSORS
    : selected
    ? WRITING_CURSOR
    : EXECUTING_CURSOR;

  return (
    <Background
      color={color}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
    >
      {val}
    </Background>
  );
}

const Background = styled.div<{ color: string }>`
  width: 14px;
  height: 14px;
  font-size: 12px;
  background-color: ${({ color }): string => color};
  border-right: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
