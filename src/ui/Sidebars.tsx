import React from "react";
import { Colors } from "./Colors";
import ReactSidebar from "react-sidebar";
import { IconButton, Sidebar, TextButton } from "ui";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import {
  CodingSpace,
  ExampleSidebarContent,
  InfoSidebarContent,
} from "../components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

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

const Container = styled.div`
  padding: 24px;
  width: 240px;
  font-size: 12px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
`;
