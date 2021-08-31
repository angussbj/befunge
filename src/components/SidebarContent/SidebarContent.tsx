import { Colors } from "../../ui";
import React from "react";
import { befungeCommands } from "./befungeCommands";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import "./SidebarContent.css";
import styled from "styled-components";
import { CommandRow } from "./CommandRow";

export function SidebarContent({
  onClose,
}: {
  onClose: () => void;
}): React.ReactElement {
  return (
    <Container>
      <IconButton
        aria-label="delete"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          color: Colors.ACCENT_BLUE.toString(),
        }}
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <Title style={{ marginTop: 0 }}>Instructions</Title>
      <p>
        Try typing some commands into the text editor, then press step, walk, or
        run to execute them.
      </p>
      <p>Pressing arrow keys changes the direction for typing.</p>
      <Title>Befunge commands</Title>
      {befungeCommands.map(
        ({ command, description, customCommandStyle, key }) => (
          <CommandRow
            key={key}
            style={{ marginTop: 6 }}
            command={command}
            description={description}
            customCommandStyle={customCommandStyle}
          />
        )
      )}
      <Title>About Befunge</Title>
      Befunge is a programming language invented in 1993 by Chris Pressey. For
      more information see the Befunge pages on{" "}
      <a className="link" href={"https://en.wikipedia.org/wiki/Befunge"}>
        Wikipedia
      </a>{" "}
      or{" "}
      <a className="link" href={"https://esolangs.org/wiki/Befunge"}>
        Esolangs
      </a>
      .<Title>About this editor</Title>
      This befunge interpreter was written by Angus Johnson. Please let me know
      on{" "}
      <a className="link" href={"https://github.com/angussbj/befunge/issues"}>
        Github
      </a>{" "}
      if you find are any issues.
      <div style={{ fontSize: 10, marginTop: 8 }}>© Angus Johnson 2021</div>
    </Container>
  );
}

const Title = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  color: ${Colors.LIGHT.toString()};
  font-size: 18px;
`;

const Container = styled.div`
  padding: 24px;
  width: 240px;
  font-size: 12px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
`;
