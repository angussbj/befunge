import React from "react";
import { Colors } from "../../ui";
import { InputRequestStatus } from "../../domain/index";
import styled from "styled-components";
import { Input } from "./Input";

interface Props {
  output: string;
  requestingInput: InputRequestStatus;
  submitInput: (input: string) => void;
  style?: React.CSSProperties;
}

export function InputOutput({
  output,
  requestingInput,
  submitInput,
  style,
}: Props): React.ReactElement {
  return (
    <Container style={style}>
      <OutputContainer>{output}</OutputContainer>
      <InputContainer>
        <div>
          {requestingInput === "character" ? (
            <div style={{ color: "#000033", fontWeight: 600 }}>
              Please enter a character: <Input submitInput={submitInput} />
            </div>
          ) : requestingInput === "number" ? (
            <div style={{ color: "#000033", fontWeight: 600 }}>
              Please enter a number: <Input submitInput={submitInput} />
            </div>
          ) : (
            <div style={{ color: Colors.DARK.fade(0.3).toString() }}>
              No input needed
            </div>
          )}
        </div>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
`;

const OutputContainer = styled.div`
  flex: 1;
  background-color: ${Colors.LIGHT.toString()};
  overflow: scroll;
  scrollbar-width: none;
  padding: 8;
`;

const InputContainer = styled.div`
  background-color: ${Colors.LIGHT.toString()};
  border-top: 1px solid ${Colors.GREY.toString()};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
`;
