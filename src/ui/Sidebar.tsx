import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import ReactSidebar from "react-sidebar";
import { IconButton } from "ui";
import { Colors } from "./Colors";

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
  open,
  pullRight,
}: Props): React.ReactElement {
  const [visible, setVisible] = useState(open);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!open) {
      timeoutRef.current = setTimeout(() => setVisible(false), 200);
    } else {
      setVisible(true);
    }
  }, [open]);

  return (
    <ReactSidebar
      sidebar={
        <Container>
          {visible ? (
            <>
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
            </>
          ) : (
            <></>
          )}
        </Container>
      }
      styles={{
        sidebar: { background: Colors.DARKER.toString() },
        content: { display: "flex" },
        overlay: { bottom: undefined, top: undefined },
      }}
      onSetOpen={onSetOpen}
      open={open}
      pullRight={pullRight}
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
