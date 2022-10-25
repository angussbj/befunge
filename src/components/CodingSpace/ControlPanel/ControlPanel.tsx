import React from "react";
import styled from "styled-components";
import { Colors } from "ui";
import { useLocalStorageState } from "utilities";
import { GlobalBefungeState } from "logic";
import { ExpandCollapseArrows } from "./ExpandCollapseArrows";
import { ExecutionControls } from "./ExecutionControls";
import { StateAndSpeed } from "./StateAndSpeed";
import { EditorControls } from "./EditorControls";

export function ControlPanel({
  state,
}: {
  state: GlobalBefungeState;
}): React.ReactElement {
  const [columns, setColumns] = useLocalStorageState({
    storageKey: "controlPanelColumns",
    initialValue: 2,
  });

  return (
    <Container style={{ flex: 1 }}>
      <ExecutionControls state={state} />
      {columns >= 2 && <StateAndSpeed state={state} />}
      {columns >= 3 && <EditorControls state={state} />}
      <ExpandCollapseArrows columns={columns} setColumns={setColumns} />
    </Container>
  );
}

const Container = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  padding: 12px;
  background-color: ${Colors.DARKER.toString()};
  shadow: -2px 2px 4px rgba(0, 0, 0, 0.3);
`;
