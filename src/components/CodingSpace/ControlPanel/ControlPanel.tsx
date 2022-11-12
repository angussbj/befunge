import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "ui";
import { sum, useLocalStorageState } from "utilities";
import { GlobalBefungeState } from "logic";
import { ExpandCollapseArrows } from "./ExpandCollapseArrows";
import { ExecutionControls } from "./ExecutionControls";
import { StateAndSpeed } from "./StateAndSpeed";
import { EditorControls } from "./EditorControls";

interface Props {
  state: GlobalBefungeState;
  transitionTimeMs?: number;
}

// TODO: Tidy this
export function ControlPanel({
  state,
  transitionTimeMs = 200,
}: Props): React.ReactElement {
  const [columns, setColumns] = useLocalStorageState({
    storageKey: "controlPanelColumns",
    initialValue: 2,
  });
  const [visible, setVisible] = useState(columns);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const containerRef = useRef<HTMLDivElement>(null);
  const columnWidths = [60, 148, 148];
  const padding = 12;
  const gap = 16;

  useEffect(() => {
    if (!containerRef.current) return;
    const initialWidth = containerRef.current.clientWidth;
    containerRef.current.style.width = initialWidth + "px";

    const desiredWidth =
      sum(columnWidths.slice(0, columns)) +
      2 * padding +
      (columns - 1) * gap +
      4;
    containerRef.current.style.width = desiredWidth + "px";
  }, [columns]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (columns > visible) setVisible(columns);
    else {
      timeoutRef.current = setTimeout(() => {
        setVisible(columns);
      }, transitionTimeMs);
    }
  }, [columns]);

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current)
        containerRef.current.style.transition = `width ${transitionTimeMs}ms`;
    }, 100);
  }, [transitionTimeMs]);

  return (
    <OuterContainer ref={containerRef} id="control-panel">
      <InnerContainer style={{ padding, gap }}>
        <ExecutionControls
          state={state}
          style={{ minWidth: columnWidths[0], maxWidth: columnWidths[0] }}
        />
        {visible > 1 && (
          <StateAndSpeed
            state={state}
            style={{ minWidth: columnWidths[1], maxWidth: columnWidths[1] }}
          />
        )}
        {visible > 2 && (
          <EditorControls
            state={state}
            style={{ minWidth: columnWidths[2], maxWidth: columnWidths[2] }}
          />
        )}
      </InnerContainer>
      <ExpandCollapseArrows columns={columns} setColumns={setColumns} />
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  align-self: stretch;
  position: relative;
  flex: 1 !important;
  background-color: ${Colors.DARKER.toString()};
  shadow: -2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const InnerContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;

  display: flex;
  flex-direction: row;
`;
