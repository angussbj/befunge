import React from "react";
import { CodingSpace } from "./components/CodingSpace";
import { Colors } from "./ui/Colors";

function App(): React.ReactElement {
  return (
    <div
      style={{
        backgroundColor: Colors.DARK.toString(),
        display: "flex",
        minHeight: "100vh",
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CodingSpace />
    </div>
  );
}

export default App;
