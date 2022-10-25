import { SidebarTitle } from "ui";
import React from "react";
import { examples } from "./examples";
import { Example } from "./Example";
import { CodeEditor } from "logic";

export function ExampleSidebarContent({
  editor,
  render,
}: {
  editor: CodeEditor;
  render: () => void;
}): React.ReactElement {
  return (
    <>
      <SidebarTitle style={{ marginTop: 0 }}>Examples</SidebarTitle>
      {examples.map(({ ...exampleDetails }) => (
        <Example
          {...exampleDetails}
          key={exampleDetails.label}
          editor={editor}
          render={render}
          style={{ marginTop: 8 }}
        />
      ))}
      <div style={{ marginTop: 32 }}>
        <a className="link" href="https://esolangs.org/wiki/Befunge#Examples">
          More examples
        </a>
      </div>
    </>
  );
}
