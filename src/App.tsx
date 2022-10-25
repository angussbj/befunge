import React, { useCallback, useState } from "react";
import { CodingSpace } from "./components/CodingSpace";
import { Colors } from "ui";
import { useGlobalBefungeState } from "./components/useGlobalBefungeState";
import styled from "styled-components";
import { CenteredScreenContentContainer } from "./ui/CenteredScreenContentContainer";
import { InfoAndExamplesSidebar } from "./components/InfoAndExamplesSidebars/InfoAndExamplesSidebars";

function App(): React.ReactElement {
  const setRenderHelper = useState(false)[1];
  const render = useCallback((): void => {
    setRenderHelper((val) => !val);
  }, []);

  const befungeState = useGlobalBefungeState(render);

  return (
    <Background>
      <InfoAndExamplesSidebar editor={befungeState.editor} render={render}>
        <CenteredScreenContentContainer>
          <CodingSpace state={befungeState} />
        </CenteredScreenContentContainer>
      </InfoAndExamplesSidebar>
    </Background>
  );
}

const Background = styled.div`
  background-color: ${Colors.DARK.toString()};
  min-height: 100vh;
`;

export default App;
