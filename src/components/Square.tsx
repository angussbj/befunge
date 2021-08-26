import styled from "styled-components";
import React from "react";

export function Square({
  val,
  selected,
  onClick,
}: {
  val: string;
  selected: boolean;
  onClick: () => void;
}): React.ReactElement {
  return (
    <Background selected={selected} onClick={onClick}>
      {val}
    </Background>
  );
}

const Background = styled.div<{ selected: boolean }>`
  width: 16px;
  height: 16px;
  background-color: ${({ selected }) => (selected ? "#aaf9bb" : "#f9f9f9")};
  border-right: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
`;
