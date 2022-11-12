import React, { ReactNode } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { IconButton, Sidebar, TextButton } from "ui";
import { useLocalStorageState } from "utilities";
import { CodeEditor } from "logic";
import { InfoSidebarContent } from "./InfoSidebarContent";
import { ExampleSidebarContent } from "./ExampleSidebarContent";

interface Props {
  editor: CodeEditor;
  render: () => void;
  children?: ReactNode;
}

export function InfoAndExamplesSidebar({
  editor,
  render,
}: Props): React.ReactElement {
  const [infoOpen, setInfoOpen] = useLocalStorageState({
    storageKey: "infoOpen",
    initialValue: true,
  });

  const [examplesOpen, setExamplesOpen] = useLocalStorageState({
    storageKey: "examplesOpen",
    initialValue: false,
  });

  return (
    <>
      <IconButton
        style={topRightAbsolute8px}
        onClick={(): void => setInfoOpen(!infoOpen)}
      >
        <InfoOutlinedIcon />
      </IconButton>
      <TextButton
        label="Examples"
        style={topLeftAbsolute20px}
        onClick={(): void => setExamplesOpen(!examplesOpen)}
      />
      <Sidebar
        open={examplesOpen}
        onSetOpen={setExamplesOpen}
        content={<ExampleSidebarContent editor={editor} render={render} />}
      />
      <Sidebar
        open={infoOpen}
        onSetOpen={setInfoOpen}
        content={<InfoSidebarContent />}
        pullRight
      />
    </>
  );
}

const topLeftAbsolute20px = {
  position: "absolute",
  top: 20,
  left: 20,
} as const;

const topRightAbsolute8px = {
  position: "absolute",
  top: 8,
  right: 8,
} as const;
