import React from "react";
import { Colors } from "./Colors";
import ReactSidebar from "react-sidebar";
import { IconButton } from "ui";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

interface Props {
  content: React.ReactElement;
  page: React.ReactElement;
  open: boolean;
  onSetOpen: (open: boolean) => void;
  pullRight?: boolean;
}

export function Sidebar({
  content,
  page,
  onSetOpen,
  ...rest
}: Props): React.ReactElement {
  return (
    <ReactSidebar
      sidebar={
        <Container>
          <IconButton
            aria-label="close-side-bar"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={(): void => onSetOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          {content}
        </Container>
      }
      styles={{
        sidebar: { background: Colors.DARKER.toString() },
        content: { display: "flex" },
        overlay: { bottom: undefined, top: undefined },
      }}
      onSetOpen={onSetOpen}
      {...rest}
    >
      {page}
    </ReactSidebar>
  );
}

const Container = styled.div`
  padding: 24px;
  width: 240px;
  font-size: 12px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
`;
