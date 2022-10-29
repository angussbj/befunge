import React, { MouseEvent } from "react";
import styled from "styled-components";
import { Colors } from "ui";

interface Props {
  val: string;
  selectionOpacity?: number | false;
  cursored?: boolean;
  isBreakpoint?: boolean;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseOver?: (e: MouseEvent) => void;
  onDoubleClick?: () => void;
}

function UnMemoizedSquare({
  val,
  selectionOpacity = false,
  cursored,
  isBreakpoint,
  onMouseDown,
  onMouseOver,
  onDoubleClick,
}: Props): React.ReactElement {
  let color = Colors.TRANSPARENT;
  if (selectionOpacity) color = color.mix(Colors.ACCENT_BLUE, selectionOpacity);
  if (cursored) color = color.mix(Colors.ACCENT_ORANGE, 0.3);
  if (isBreakpoint)
    color = cursored ? color.mix(Colors.BLUE, 0.5) : color.mix(Colors.RED, 0.5);

  return (
    <Background
      style={{ backgroundColor: color.toString() }}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
    >
      {val}
    </Background>
  );
}

const Background = styled.div`
  width: 14px;
  height: 14px;
  font-size: 12px;
  font-family: monospace;
  border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
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

function areEqual(prev: Props, next: Props): boolean {
  return (
    prev.val === next.val &&
    prev.selectionOpacity === next.selectionOpacity &&
    prev.cursored === next.cursored &&
    prev.isBreakpoint === next.isBreakpoint
  );
}

export const Square = React.memo(UnMemoizedSquare, areEqual);
