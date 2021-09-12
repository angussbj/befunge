import { Colors } from "ui";
import React from "react";
import { befungeCommands } from "./befungeCommands";
import styled from "styled-components";
import { CommandRow } from "./CommandRow";

export function InfoSidebarContent(): React.ReactElement {
  return (
    <>
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
    </>
  );
}

const Title = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  color: ${Colors.LIGHT.toString()};
  font-size: 18px;
`;
