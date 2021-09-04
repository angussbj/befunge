import React, { useCallback, useEffect, useRef, useState } from "react";
import { Colors, Row, T } from "../../../ui";
import { Square } from "./Square";
import { Coordinate, modulo, range } from "../../../utilities";
import { CodeEditor } from "../../../domain/CodeEditor";
import { Code } from "../../../domain/Code";
import styled from "styled-components";
import { useBlink } from "./useBlink";

export function Grid({
  code,
  cursor,
  editor: e,
}: {
  code: Code;
  cursor: Coordinate;
  editor: CodeEditor;
}): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const isSelectedX = useCallback(
    getSelectionCheckFunction(
      e.selection.x,
      e.selectionDelta.x,
      e.limits.x,
      focused
    ),
    [e.selection.x, e.selectionDelta.x, e.limits.x, focused]
  );

  const isSelectedY = useCallback(
    getSelectionCheckFunction(
      e.selection.y,
      e.selectionDelta.y,
      e.limits.y,
      focused
    ),
    [e.selection.y, e.selectionDelta.y, e.limits.y, focused]
  );

  const { blink } = useBlink(focused);
  const selectionOpacity = blink ? 0.35 : 0.2;

  return (
    <Container
      focused={focused}
      ref={containerRef}
      onFocus={(): void => {
        e.hasFocus = true;
        setFocused(true);
      }}
      onBlur={(): void => {
        console.log("onBlur");
        e.hasFocus = false;
        setFocused(false);
      }}
      tabIndex={0}
    >
      {range(-1, e.limits.y + 1).map((y) => (
        <Row key={y} style={{ justifyContent: "flex-end" }}>
          {range(-1, e.limits.x + 1).map((x) =>
            x === -1 && y === -1 ? null : x === -1 ? (
              <YNumberBox>
                <T size="tiny" color={Colors.DARK.fade(0.4)}>
                  {y}
                </T>
              </YNumberBox>
            ) : y === -1 ? (
              <XNumberBox>
                <T size="tiny" color={Colors.DARK.fade(0.4)}>
                  {x}
                </T>
              </XNumberBox>
            ) : (
              <Square
                val={code.code[x][y]}
                selected={isSelectedX(x) && isSelectedY(y)}
                selectionOpacity={selectionOpacity}
                cursored={x === cursor.x && y === cursor.y}
                isBreakpoint={code.breakpoints[x][y]}
                onMouseDown={e.onMouseDown(x, y)}
                onMouseOver={e.onMouseOver(x, y)}
                onDoubleClick={e.onDoubleClick(x, y)}
                key={`${x},${y}`}
              />
            )
          )}
        </Row>
      ))}
    </Container>
  );
}

function getSelectionCheckFunction(
  coordinate: number,
  delta: number,
  limit: number,
  focused: boolean
): (a: number) => boolean {
  if (!focused) return (): boolean => false;
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

const Container = styled.div<{ focused: boolean }>`
  padding-right: 8px;
  padding-bottom: 8px;
  padding-left: 4px;
  padding-top: 4px;
  background-color: ${Colors.LIGHT.toString()};
  border-radius: 4px;
  outline: 0 none !important;
  ${({ focused }): string => {
    return focused ? `box-shadow: 0px 0px 5px 2px #5577FF` : "";
  }};
`;

const XNumberBox = styled.div`
  width: 15px;
  padding-bottom: 4px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 1px solid #bbbbbb;
`;

const YNumberBox = styled.div`
  height: 15px;
  padding-right: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-right: 1px solid #bbbbbb;
`;
