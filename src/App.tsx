import React from "react";
import { Grid } from "./components";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#283134",
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid />
    </div>
  );
}

export default App;
