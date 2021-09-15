import React, { useCallback, useState } from "react";
import { CodingSpace } from "./components/CodingSpace";
import { Button, Colors, Sidebar } from "ui";
import { InfoSidebarContent } from "./components/InfoSidebarContent";
import { IconButton } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { ExampleSidebarContent } from "./components/ExampleSidebarContent";
import { useBefunge } from "./components/useBefunge";
import { useLocalStorageAsState } from "./utilities/useLocalStorageAsState";

function App(): React.ReactElement {
  const [infoOpen, setInfoOpen] = useLocalStorageAsState({
    storageKey: "infoOpen",
    initialValue: true,
  });

  const [examplesOpen, setExamplesOpen] = useLocalStorageAsState({
    storageKey: "examplesOpen",
    initialValue: false,
  });

  const setRenderHelper = useState(false)[1];
  const render = useCallback((): void => {
    setRenderHelper((val) => !val);
  }, []);

  const { editor, befunge } = useBefunge(render);

  return (
    <div
      style={{
        backgroundColor: Colors.DARK.toString(),
        minHeight: "100vh",
      }}
    >
      <Sidebar
        pullRight
        open={infoOpen}
        onSetOpen={setInfoOpen}
        content={<InfoSidebarContent />}
        page={
          <Sidebar
            open={examplesOpen}
            onSetOpen={setExamplesOpen}
            content={<ExampleSidebarContent editor={editor} render={render} />}
            page={
              <>
                <IconButton
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: Colors.ACCENT_BLUE.toString(),
                  }}
                  onClick={(): void => setInfoOpen(!infoOpen)}
                >
                  <InfoOutlinedIcon />
                </IconButton>
                <Button
                  label="Examples"
                  size="large"
                  variant="text"
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
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
                    <CodingSpace e={editor} b={befunge} />
                    <div style={{ flexGrow: 1, minHeight: 40 }} />
                  </div>
                </div>
              </>
            }
          />
        }
      />
    </div>
  );
}

export default App;
