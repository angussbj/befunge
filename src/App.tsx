import React, { useState } from "react";
import { CodingSpace } from "./components/CodingSpace";
import { Colors, Sidebar } from "./ui";
import { InfoSidebarContent } from "./components/InfoSidebarContent";
import { IconButton } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { ExampleSidebarContent } from "./components/ExampleSidebarContent";

function App(): React.ReactElement {
  const [infoOpen, setInfoOpen] = useState(true);
  const [examplesOpen, setExamplesOpen] = useState(true);

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
            content={<ExampleSidebarContent />}
            page={
              <>
                <IconButton
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: Colors.ACCENT_BLUE.toString(),
                  }}
                  onClick={(): void => setInfoOpen(true)}
                >
                  <InfoOutlinedIcon />
                </IconButton>
                <div
                  style={{
                    flexGrow: 1,
                    padding: 32,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: 1 }} />
                    <CodingSpace />
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
