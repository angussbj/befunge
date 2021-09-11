import React from "react";
import { SquareBackground } from "./SquareBackground";
import styled from "styled-components";
import { Colors } from "../../ui";

const M = styled.text`
  font-family: monospace;
`;

const B = styled.text``;

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
        <B>Addition:</B> pop two values <M>a</M> then <M>b</M>, then push the
        result of <M>a + b</M>
      </div>
    ),
  },
  {
    key: "-",
    command: "-",
    description: (
      <div>
        <B>Subtraction:</B> pop two values <M>a</M> then <M>b</M>, then push the
        result of <M>b - a</M>
      </div>
    ),
  },
  {
    key: "*",
    command: "*",
    description: (
      <div>
        <B>Multiplication:</B> pop two values <M>a</M> then <M>b</M>, then push
        the result of <M>a * b</M>
      </div>
    ),
  },
  {
    key: "/",
    command: "/",
    description: (
      <div>
        <B>Integer division:</B> pop two values <M>a</M> then <M>b</M>, then
        push the result of <M>b / a</M>, rounded down. If a is zero, ask the
        user what result they want.
      </div>
    ),
  },
  {
    key: "%",
    command: "%",
    description: (
      <div>
        <B>Modulo:</B> pop two values <M>a</M> then <M>b</M>, then push the
        remainder of the integer division of <M>b / a</M>.
      </div>
    ),
  },
  {
    key: "!",
    command: "!",
    description: (
      <div>
        <B>Not:</B> pop a value. If the value is <M>0</M>, push <M>1</M>;
        otherwise, push <M>0</M>.
      </div>
    ),
  },
  {
    key: "`",
    command: "`",
    description: (
      <div>
        <B>Comparison:</B> pop two values <M>a</M> then <M>b</M>, then push{" "}
        <M>1</M> if <M>b {">"} a</M>, otherwise <M>0</M>.
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
        <B>Horizontal if:</B> pop a value; set direction to right if value is{" "}
        <M>0</M>, set to left otherwise
      </div>
    ),
  },
  {
    key: "|",
    command: "|",
    description: (
      <div>
        <B>Vertical if:</B> pop a value; set direction to down if value is{" "}
        <M>0</M>, set to up otherwise
      </div>
    ),
  },
  {
    key: '"',
    command: '"',
    description: (
      <div>
        <B>Toggle string-mode:</B> push each character&apos;s ASCII value all
        the way up to the next <M>{'"'}</M>
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
      <div>
        <B>Integer output:</B> pop top of stack and output it as an integer
      </div>
    ),
  },
  {
    key: ",",
    command: ",",
    description: (
      <div>
        <B>Character output:</B> pop top of stack and output its ASCII character
      </div>
    ),
  },
  {
    key: "&",
    command: "&",
    description: (
      <div>
        <B>Integer input:</B> request an integer from the user and push it to
        the stack
      </div>
    ),
  },
  {
    key: "~",
    command: "~",
    description: (
      <div>
        <B>Character input:</B> request a character from the user and push it to
        the stack
      </div>
    ),
  },
  {
    key: "#",
    command: "#",
    description: (
      <div>
        <B>Bridge:</B> jump over next command in the current direction of
        movement
      </div>
    ),
  },
  {
    key: "g",
    command: "g",
    description: (
      <div>
        <B>Get:</B> a way to retrieve data in storage. Pop two values <M>y</M>{" "}
        then <M>x</M>, then push the ASCII value of the character at that
        position in the program. If <M>(x, y)</M> is out of bounds, push{" "}
        <M>0</M>
      </div>
    ),
  },
  {
    key: "p",
    command: "p",
    description: (
      <div>
        <B>Put:</B> a way to store a value for later use. Pop three values{" "}
        <M>y</M>, then <M>x</M>, then <M>v</M>, then change the character at the
        position <M>(x, y)</M> in the program to the character with ASCII value{" "}
        <M>v</M>
      </div>
    ),
  },
  { key: "@", command: "@", description: <div>End program</div> },
  {
    key: " ",
    command: " ",
    description: (
      <div>
        <B>No-op:</B> does nothing. There is a space character in this location,
        which has ASCII value 32
      </div>
    ),
  },
  {
    key: "blank 1",
    command: <div style={{ height: 12 }} />,
    customCommandStyle: true,
  },
  {
    key: "execution cursor",
    command: (
      <SquareBackground
        style={{
          backgroundColor: Colors.LIGHT.mix(Colors.ACCENT_ORANGE, 0.4)
            .saturate(1)
            .toString(),
        }}
      />
    ),
    description: (
      <div>
        <B>Execution cursor:</B> the orange highlight marks the next command to
        be executed
      </div>
    ),
    customCommandStyle: true,
  },
  {
    key: "typing cursor",
    command: (
      <SquareBackground
        style={{
          backgroundColor: Colors.LIGHT.mix(Colors.ACCENT_BLUE, 0.4)
            .saturate(1)
            .toString(),
        }}
      />
    ),
    description: (
      <div>
        <B>Code input cursor:</B> the blue highlight marks the square(s) you
        edit when you type
      </div>
    ),
    customCommandStyle: true,
  },
  {
    key: "both cursors",
    command: (
      <SquareBackground
        style={{
          backgroundColor: Colors.LIGHT.mix(Colors.ACCENT_BLUE, 0.4)
            .mix(Colors.ACCENT_ORANGE, 0.4)
            .toString(),
        }}
      />
    ),
    description: (
      <div>
        <B>Both cursors:</B> the execution and code input cursors are on top of
        each other
      </div>
    ),
    customCommandStyle: true,
  },
];
