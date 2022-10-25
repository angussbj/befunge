import React from "react";
import { Sidebar } from "ui";

interface Props {
  leftContent: React.ReactElement;
  rightContent: React.ReactElement;
  page: React.ReactElement;
  leftOpen: boolean;
  rightOpen: boolean;
  onSetLeftOpen: (open: boolean) => void;
  onSetRightOpen: (open: boolean) => void;
}

export function Sidebars({
  leftContent,
  rightContent,
  page,
  leftOpen,
  rightOpen,
  onSetLeftOpen,
  onSetRightOpen,
}: Props): React.ReactElement {
  return (
    <Sidebar
      open={leftOpen}
      onSetOpen={onSetLeftOpen}
      content={leftContent}
      page={
        <Sidebar
          pullRight
          open={rightOpen}
          onSetOpen={onSetRightOpen}
          content={rightContent}
          page={page}
        />
      }
    />
  );
}
