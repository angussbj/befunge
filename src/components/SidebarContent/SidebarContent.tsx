import { Colors, Row } from "../../ui";
import React from "react";
import { befungeCommands } from "./befungeCommands";
import { SquareBackground } from "./SquareBackground";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import "./SidebarContent.css";

export function SidebarContent({
  onClose,
}: {
  onClose: () => void;
}): React.ReactElement {
  return (
    <div
      style={{
        padding: 24,
        color: Colors.LIGHT.toString(),
        width: 240,
      }}
    >
      <IconButton
        aria-label="delete"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          color: Colors.ACCENT.toString(),
        }}
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <div style={{ marginBottom: 12 }}>Instructions</div>
      <div
        style={{
          fontSize: 12,
          color: Colors.LIGHT.fade(0.2).toString(),
        }}
      >
        <p>
          Try typing some commands into the text editor, then press step, walk,
          or run to execute them.
        </p>
        <p>Pressing arrow keys changes the direction for typing.</p>
      </div>

      <div style={{ marginTop: 24, marginBottom: 16 }}>Befunge commands</div>
      {befungeCommands.map(
        ({ command, description, customCommandStyle, key }) => (
          <Row
            key={key}
            style={{
              marginTop: 6,
              fontSize: 12,
              color: Colors.LIGHT.fade(0.2).toString(),
              alignItems: "flex-start",
            }}
          >
            {customCommandStyle ? (
              command
            ) : (
              <SquareBackground style={{ marginTop: 0 }}>
                {command}
              </SquareBackground>
            )}
            <div
              style={{
                marginLeft: 12,
                flex: 1,
              }}
            >
              {description}
            </div>
          </Row>
        )
      )}

      <div style={{ marginTop: 24, marginBottom: 12 }}>About Befunge</div>
      <div
        style={{
          fontSize: 12,
          color: Colors.LIGHT.fade(0.2).toString(),
        }}
      >
        Befunge is a programming language invented in 1993 by Chris Pressey. For
        more information see the Befunge pages on{" "}
        <a className="link" href={"https://en.wikipedia.org/wiki/Befunge"}>
          Wikipedia
        </a>{" "}
        or{" "}
        <a className="link" href={"https://esolangs.org/wiki/Befunge"}>
          Esolangs
        </a>
        .
      </div>

      <div style={{ marginTop: 24, marginBottom: 12 }}>About this editor</div>
      <div
        style={{
          fontSize: 12,
          color: Colors.LIGHT.fade(0.2).toString(),
        }}
      >
        This befunge interpreter was written by Angus Johnson. Please let me
        know on{" "}
        <a className="link" href={"https://github.com/angussbj/befunge/issues"}>
          Github
        </a>{" "}
        if you find are any issues.
        <div style={{ fontSize: 10, marginTop: 8 }}>© Angus Johnson 2021</div>
      </div>
    </div>
  );
}
