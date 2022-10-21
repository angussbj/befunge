import React from "react";
import { Colors } from "ui";
import { InputRequestStatus } from "logic";
import styled from "styled-components";
import { Input } from "./Input";

interface Props {
  output: string;
  requestingInput: InputRequestStatus;
  submitInput: (input: string) => void;
  style?: React.CSSProperties;
}

// TODO: Scroll to bottom after output
export function InputOutput({
  output,
  requestingInput,
  submitInput,
}: Props): React.ReactElement {
  return (
    <>
      <OutputContainer>
        <OutputInnerScrollingContainer>
          {output.split("\n").map((x, index) => (
            <div key={index}>{x}</div>
          ))}
        </OutputInnerScrollingContainer>
      </OutputContainer>
      <InputContainer>
        <div>
          {requestingInput === "character" ? (
            <div style={{ color: "#000033", fontWeight: 600 }}>
              Please enter a character:{" "}
              <Input submitInput={submitInput} inputType="character" />
            </div>
          ) : requestingInput === "number" ? (
            <div style={{ color: "#000033", fontWeight: 600 }}>
              Please enter a number:{" "}
              <Input submitInput={submitInput} inputType="number" />
            </div>
          ) : requestingInput === "divideBy0" ? (
            <div style={{ color: "#000033", fontWeight: 600 }}>
              Division by 0. Please enter the result:{" "}
              <Input submitInput={submitInput} inputType="number" />
            </div>
          ) : (
            <div style={{ color: Colors.DARK.fade(0.3).toString() }}>
              No input needed
            </div>
          )}
        </div>
      </InputContainer>
    </>
  );
}

const OutputContainer = styled.div`
  flex: 1;
  height: 0px;
  display: flex;
`;

const OutputInnerScrollingContainer = styled.div`
  flex: 1;
  width: 0px;
  background-color: ${Colors.LIGHT.toString()};
  overflow: scroll;
  scrollbar-width: thin;
  flex-direction: column;
  padding: 8px;
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
