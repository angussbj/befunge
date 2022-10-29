import React from "react";
import { SquareBackground } from "./SquareBackground";
import styled from "styled-components";

const M = styled.span`
  font-family: monospace;
`;

export const befungeCommands = [
  {
    key: "0",

    command: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <SquareBackground>0</SquareBackground>⋮
        <SquareBackground>9</SquareBackground>
      </div>
    ),
    description: (
      <div style={{ marginTop: 8 }}>
        Push the corresponding number onto the stack
      </div>
    ),
    customCommandStyle: true,
  },
  {
    key: "+",
    command: "+",
    description: (
      <div>
        Addition: pop two values <M>a</M> then <M>b</M>, then push the result of{" "}
        <M>a + b</M>
      </div>
    ),
  },
  {
    key: "-",
    command: "-",
    description: (
      <div>
        Subtraction: pop two values <M>a</M> then <M>b</M>, then push the result
        of <M>b - a</M>
      </div>
    ),
  },
  {
    key: "*",
    command: "*",
    description: (
      <div>
        Multiplication: pop two values <M>a</M> then <M>b</M>, then push the
        result of <M>a * b</M>
      </div>
    ),
  },
  {
    key: "/",
    command: "/",
    description: (
      <div>
        Integer division: pop two values <M>a</M> then <M>b</M>, then push the
        result of <M>b / a</M>, rounded down. If a is zero, ask the user what
        result they want.
      </div>
    ),
  },
  {
    key: "%",
    command: "%",
    description: (
      <div>
        Modulo: pop two values <M>a</M> then <M>b</M>, then push the remainder
        of the integer division of <M>b / a</M>.
      </div>
    ),
  },
  {
    key: "!",
    command: "!",
    description: (
      <div>
        Not: pop a value. If the value is <M>0</M>, push <M>1</M>; otherwise,
        push <M>0</M>.
      </div>
    ),
  },
  {
    key: "`",
    command: "`",
    description: (
      <div>
        Comparison: pop two values <M>a</M> then <M>b</M>, then push <M>1</M> if{" "}
        <M>b {">"} a</M>, otherwise <M>0</M>.
      </div>
    ),
  },
  { key: ">", command: ">", description: <div>Start moving right</div> },
  { key: "<", command: "<", description: <div>Start moving left</div> },
  { key: "^", command: "^", description: <div>Start moving up</div> },
  { key: "v", command: "v", description: <div>Start moving down</div> },
  {
    key: "?",
    command: "?",
    description: <div>Start moving in a random cardinal direction</div>,
  },
  {
    key: "_",
    command: "_",
    description: (
      <div>
        Horizontal if: pop a value; set direction to right if value is <M>0</M>,
        set to left otherwise
      </div>
    ),
  },
  {
    key: "|",
    command: "|",
    description: (
      <div>
        Vertical if: pop a value; set direction to down if value is <M>0</M>,
        set to up otherwise
      </div>
    ),
  },
  {
    key: '"',
    command: '"',
    description: (
      <div>
        Toggle string-mode: push each character&apos;s UTF-16 value all the way
        up to the next <M>{'"'}</M>
      </div>
    ),
  },
  { key: ":", command: ":", description: <div>Duplicate top stack value</div> },
  { key: "\\", command: "\\", description: <div>Swap top stack values</div> },
  {
    key: "$",
    command: "$",
    description: <div>Pop (remove) top stack value and discard</div>,
  },
  {
    key: ".",
    command: ".",
    description: (
      <div>Integer output: pop top of stack and output it as an integer</div>
    ),
  },
  {
    key: ",",
    command: ",",
    description: (
      <div>
        Character output: pop top of stack and output its UTF-16 character
      </div>
    ),
  },
  {
    key: "&",
    command: "&",
    description: (
      <div>
        Integer input: request an integer from the user and push it to the stack
      </div>
    ),
  },
  {
    key: "~",
    command: "~",
    description: (
      <div>
        Character input: request a character from the user and push it to the
        stack
      </div>
    ),
  },
  {
    key: "#",
    command: "#",
    description: (
      <div>
        Bridge: jump over next command in the current direction of movement
      </div>
    ),
  },
  {
    key: "g",
    command: "g",
    description: (
      <div>
        Get: a way to retrieve data in storage. Pop two values <M>y</M> then{" "}
        <M>x</M>, then push the UTF-16 value of the character at that position
        in the program. If <M>(x, y)</M> is out of bounds, push <M>0</M>
      </div>
    ),
  },
  {
    key: "p",
    command: "p",
    description: (
      <div>
        Put: a way to store a value for later use. Pop three values <M>y</M>,
        then <M>x</M>, then <M>v</M>, then change the character at the position{" "}
        <M>(x, y)</M> in the program to the character with UTF-16 value <M>v</M>
      </div>
    ),
  },
  { key: "@", command: "@", description: <div>End program</div> },
  {
    key: " ",
    command: " ",
    description: (
      <div>
        No-op: does nothing. There is a space character in this location, which
        has UTF-16 value 32
      </div>
    ),
  },
  {
    key: "blank 1",
    command: <div style={{ height: 12 }} />,
    customCommandStyle: true,
  },
];
