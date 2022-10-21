import React, { useCallback, useState } from "react";
import { CodingSpace } from "./components/CodingSpace";
import { Colors, IconButton, TextButton } from "ui";
import { InfoSidebarContent } from "./components/InfoSidebarContent";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { ExampleSidebarContent } from "./components/ExampleSidebarContent";
import { useGlobalBefungeState } from "./components/useGlobalBefungeState";
import { useLocalStorageState } from "./utilities/useLocalStorageState";
import { Sidebars } from "./ui/Sidebars";

// TODO: break up components and/or use styled components
function App(): React.ReactElement {
  const [infoOpen, setInfoOpen] = useLocalStorageState({
    storageKey: "infoOpen",
    initialValue: true,
  });

  const [examplesOpen, setExamplesOpen] = useLocalStorageState({
    storageKey: "examplesOpen",
    initialValue: false,
  });

  const setRenderHelper = useState(false)[1];
  const render = useCallback((): void => {
    setRenderHelper((val) => !val);
  }, []);

  const befungeState = useGlobalBefungeState(render);

  return (
    <div
      style={{
        backgroundColor: Colors.DARK.toString(),
        minHeight: "100vh",
      }}
    >
      <Sidebars
        rightOpen={infoOpen}
        onSetRightOpen={setInfoOpen}
        rightContent={<InfoSidebarContent />}
        leftOpen={examplesOpen}
        onSetLeftOpen={setExamplesOpen}
        leftContent={
          <ExampleSidebarContent editor={befungeState.editor} render={render} />
        }
        page={
          <>
            <IconButton
              style={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
              color={Colors.ACCENT_BLUE}
              onClick={(): void => setInfoOpen(!infoOpen)}
            >
              <InfoOutlinedIcon />
            </IconButton>
            <TextButton
              label="Examples"
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                color: Colors.ACCENT_BLUE.toString(),
              }}
              onClick={(): void => setExamplesOpen(!examplesOpen)}
            />
            <div
              style={{
                flexGrow: 1,
                padding: 32,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ flexGrow: 1, minHeight: 24 }} />
                <CodingSpace state={befungeState} />
                <div style={{ flexGrow: 1, minHeight: 40 }} />
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default App;
