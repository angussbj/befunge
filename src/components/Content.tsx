import React, { useCallback, useState } from "react";
import { CenteredScreenContentContainer } from "ui";
import { CodingSpace } from "./CodingSpace";
import { useGlobalBefungeState } from "./useGlobalBefungeState";
import { InfoAndExamplesSidebar } from "./InfoAndExamplesSidebars";

export function Content(): React.ReactElement {
  const setRenderHelper = useState(false)[1];
  const render = useCallback((): void => {
    setRenderHelper((val) => !val);
  }, []);

  const befungeState = useGlobalBefungeState(render);

  return (
    <InfoAndExamplesSidebar editor={befungeState.editor} render={render}>
      <CenteredScreenContentContainer>
        <CodingSpace state={befungeState} />
      </CenteredScreenContentContainer>
    </InfoAndExamplesSidebar>
  );
}
