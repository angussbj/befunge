import React, { useState } from "react";
import { CodingSpace } from "./components/CodingSpace";
import { Colors } from "./ui";
import Sidebar from "react-sidebar";
import { SidebarContent } from "./components/SidebarContent";
import { IconButton } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

function App(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      style={{
        backgroundColor: Colors.DARK.toString(),
        minHeight: "100vh",
      }}
    >
      <Sidebar
        sidebar={<SidebarContent onClose={(): void => setSidebarOpen(false)} />}
        open={sidebarOpen}
        onSetOpen={setSidebarOpen}
        styles={{
          sidebar: { background: Colors.DARKER.toString() },
          content: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          overlay: {
            bottom: undefined,
            top: undefined,
          },
        }}
        pullRight
      >
        <IconButton
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            color: Colors.ACCENT_BLUE.toString(),
          }}
          onClick={(): void => setSidebarOpen(true)}
        >
          <InfoOutlinedIcon />
        </IconButton>

        <CodingSpace />
      </Sidebar>
    </div>
  );
}

export default App;
