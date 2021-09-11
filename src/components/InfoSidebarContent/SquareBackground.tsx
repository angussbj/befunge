import styled from "styled-components";
import { Colors } from "ui";

export const SquareBackground = styled.div`
  width: 14px;
  height: 14px;
  font-size: 12px;
  font-family: monospace;
  background-color: ${Colors.LIGHT.toString()};
  color: #000000;
  border: 1px solid #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
`;
