import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { IconButton } from "ui";
import { Colors } from "../Colors";
import "./sidebar.css";

interface Props {
  content: React.ReactElement;
  open: boolean;
  setOpen: (open: boolean) => void;
  pullRight?: boolean;
}

export function Sidebar({
  content,
  setOpen,
  open,
  pullRight,
}: Props): React.ReactElement {
  const [visible, setVisible] = useState(open);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (open) {
      setVisible(true);
      setTimeout(() => containerRef.current?.classList.add("open"), 1);
    } else {
      timeoutRef.current = setTimeout(() => setVisible(false), 200);
      containerRef.current?.classList.remove("open");
    }
  }, [open]);

  return (
    <>
      {visible && (
        <Container
          style={
            pullRight
              ? { right: 0, marginRight: -288 }
              : { left: 0, marginLeft: -288 }
          }
          ref={containerRef}
        >
          <IconButton
            aria-label="close-side-bar"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={(): void => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          {content}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 240px;
  transition: margin 0.4s;
  padding: 24px;
  font-size: 12px;
  overflow-y: auto;
  color: ${Colors.LIGHT.fade(0.2).toString()};
  background-color: ${Colors.DARKER.toString()};
  z-index: 10;
`;
