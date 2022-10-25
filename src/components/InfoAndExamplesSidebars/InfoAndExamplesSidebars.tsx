import React, { ReactNode } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { IconButton, Sidebars, TextButton } from "ui";
import { useLocalStorageState } from "utilities";
import { CodeEditor } from "logic";
import { InfoSidebarContent } from "./InfoSidebarContent";
import { ExampleSidebarContent } from "./ExampleSidebarContent";

interface Props {
  editor: CodeEditor;
  render: () => void;
  children: ReactNode;
}

export function InfoAndExamplesSidebar({
  editor,
  render,
  children,
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
    <Sidebars
      rightOpen={infoOpen}
      onSetRightOpen={setInfoOpen}
      rightContent={<InfoSidebarContent />}
      leftOpen={examplesOpen}
      onSetLeftOpen={setExamplesOpen}
      leftContent={<ExampleSidebarContent editor={editor} render={render} />}
      page={
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
          {children}
        </>
      }
    />
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
