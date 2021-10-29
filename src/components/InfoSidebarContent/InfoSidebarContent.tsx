import { SidebarSection, Colors } from "ui";
import React from "react";
import styled from "styled-components";
import { befungeCommands } from "./befungeCommands";
import { editorCommands } from "./editorCommands";
import { BefungeCommandRow } from "./BefungeCommandRow";
import { EditorCommandRow } from "./EditorCommandRow";

export function InfoSidebarContent(): React.ReactElement {
  return (
    <>
      <Title style={{ marginTop: 0 }}>Instructions</Title>
      <p>
        Try typing some commands into the text editor, then press step, walk, or
        run to execute them.
      </p>
      <p>
        You can also try out some example befunge programs from the examples
        section, or copy-paste code in from other sources.
      </p>
      <SidebarSection title="Befunge commands" collapsible>
        {befungeCommands.map(
          ({ command, description, customCommandStyle, key }) => (
            <BefungeCommandRow
              key={key}
              style={{ marginTop: 6 }}
              command={command}
              description={description}
              customCommandStyle={customCommandStyle}
            />
          )
        )}
      </SidebarSection>
      <SidebarSection title="Editor" collapsible>
        {editorCommands.map(
          ({ command, description, customCommandStyle, key }) => (
            <EditorCommandRow
              key={key}
              style={{ marginTop: 6 }}
              command={command}
              description={description}
              customCommandStyle={customCommandStyle}
            />
          )
        )}
        <p style={{ marginTop: 12 }}>
          The control key works in place of the command key on Windows
          computers.
        </p>
        <p>Input options can be found by expanding the control panel.</p>
      </SidebarSection>
      <SidebarSection title="About Befunge">
        <p>
          Befunge is a programming language invented in 1993 by Chris Pressey.
          For more information see the Befunge pages on{" "}
          <a className="link" href={"https://en.wikipedia.org/wiki/Befunge"}>
            Wikipedia
          </a>{" "}
          or{" "}
          <a className="link" href={"https://esolangs.org/wiki/Befunge"}>
            Esolangs
          </a>
          .
        </p>
      </SidebarSection>
      <SidebarSection title="About this editor">
        This befunge interpreter was written by Angus Johnson. Please let me
        know on{" "}
        <a className="link" href={"https://github.com/angussbj/befunge/issues"}>
          Github
        </a>{" "}
        if you find are any issues.
      </SidebarSection>
      <div
        style={{
          fontSize: 10,
          marginTop: 16,
          marginBottom: 16,
          display: "flex",
          justifyContent: "flex-end",
          color: Colors.LIGHT.fade(0.4).toString(),
        }}
      >
        © Angus Johnson 2021
      </div>
    </>
  );
}

const Title = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  color: ${Colors.LIGHT.toString()};
  font-size: 18px;
`;
