import React from "react";
import styled from "styled-components";
import { Colors } from "ui";
import { Content } from "components";

function App(): React.ReactElement {
  return (
    <Background>
      <Content />
    </Background>
  );
}

const Background = styled.div`
  background-color: ${Colors.DARK.toString()};
  min-height: 100vh;
`;

export default App;
