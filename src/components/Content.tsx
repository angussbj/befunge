import React, { useCallback, useState } from "react";
import { CodingSpace } from "./CodingSpace";
import { useGlobalBefungeState } from "./useGlobalBefungeState";
import { InfoAndExamplesSidebar } from "./InfoAndExamplesSidebars";
import styled from "styled-components";

export function Content(): React.ReactElement {
  const setRenderHelper = useState(false)[1];
  const render = useCallback((): void => {
    setRenderHelper((val) => !val);
  }, []);

  const befungeState = useGlobalBefungeState(render);

  return (
    <>
      <InfoAndExamplesSidebar editor={befungeState.editor} render={render} />
      <HorizontalScrollingContainer>
        <CenteringContainer>
          <CodingSpace state={befungeState} />
        </CenteringContainer>
      </HorizontalScrollingContainer>
    </>
  );
}

const HorizontalScrollingContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: fit-content;
  height: 100vh;
  overflow-x: auto;
  overflow-y: visible;
  padding: 48px 20px 20px 20px;
`;

const CenteringContainer = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 100%;
  width: fit-content;
  height: fit-content;
  align-items: center;
  justify-content: center;
`;
