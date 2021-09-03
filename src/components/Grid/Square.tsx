import React, { MouseEvent } from "react";
import styled from "styled-components";
import { Colors } from "../../ui/Colors";

export function Square({
  val,
  selected,
  cursored,
  isBreakpoint,
  onMouseDown,
  onMouseOver,
  onDoubleClick,
}: {
  val: string;
  selected?: boolean;
  cursored?: boolean;
  isBreakpoint?: boolean;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseOver?: (e: MouseEvent) => void;
  onDoubleClick?: () => void;
}): React.ReactElement {
  let color = Colors.LIGHT;
  if (selected) color = color.mix(Colors.ACCENT_BLUE, 0.3);
  if (cursored) color = color.mix(Colors.ACCENT_ORANGE, 0.3);
  if (isBreakpoint) color = color.mix(Colors.RED, 0.5);

  return (
    <Background
      color={color.toString()}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
    >
      {val}
    </Background>
  );
}

const Background = styled.div<{ color: string }>`
  width: 14px;
  height: 14px;
  font-size: 12px;
  font-family: monospace;
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
