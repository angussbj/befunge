import React from "react";
import { Colors, T } from "ui";
import { HiCursorClick } from "react-icons/hi";
import { SquareBackground } from "./SquareBackground";

export const editorCommands = [
  {
    key: "A",
    command: "⌘ + A",
    description: "Select all",
  },
  {
    key: "X",
    command: "⌘ + X",
    description: "Cut",
  },
  {
    key: "C",
    command: "⌘ + C",
    description: "Copy",
  },
  {
    key: "V",
    command: "⌘ + V",
    description: "Paste",
  },
  {
    key: "Z",
    command: "⌘ + Z",
    description: "Undo - also reverts any execution state to this point",
  },
  {
    key: "Z+",
    command: "⌘ + ⇧ + Z",
    description: "Redo - also reverts any execution state to this point",
  },
  {
    key: "J",
    command: "⌘ + J",
    description: "Step",
  },
  {
    key: "K",
    command: "⌘ + K",
    description: "Walk or pause",
  },
  {
    key: "L",
    command: "⌘ + L",
    description: "Run or pause",
  },
  {
    key: ";",
    command: "⌘ + ;",
    description: "Reset",
  },
  {
    key: "DC",
    command: (
      <T monospace>
        <HiCursorClick />
        ×2
      </T>
    ),
    description: "Set or remove breakpoint",
  },
  {
    key: "Arrows",
    command: "↑/↓/→/←",
    description: "Move code input cursor",
  },
  {
    key: "Arrows+",
    command: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <T monospace>⇧ +</T>
        <T monospace>↑/↓/→/←</T>
      </div>
    ),
    description: "Extend selection",
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
        Execution cursor: the orange highlight marks the next command to be
        executed
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
        Code input cursor: the blue highlight marks the square(s) you edit when
        you type
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
        Both cursors: the execution and code input cursors are on top of each
        other
      </div>
    ),
    customCommandStyle: true,
  },
  {
    key: "breakpoint",
    command: (
      <SquareBackground
        style={{
          backgroundColor: Colors.LIGHT.mix(Colors.RED, 0.5)
            .mix(Colors.ACCENT_ORANGE, 0.4)
            .toString(),
        }}
      />
    ),
    description: <div>Breakpoint: code execution will stop here</div>,
    customCommandStyle: true,
  },
  {
    key: "breakpoint+",
    command: (
      <SquareBackground
        style={{
          backgroundColor: Colors.LIGHT.mix(Colors.ACCENT_ORANGE, 0.3)
            .mix(Colors.BLUE, 0.5)
            .toString(),
        }}
      />
    ),
    description: (
      <div>Active breakpoint: code execution is currently stopped here</div>
    ),
    customCommandStyle: true,
  },
];
