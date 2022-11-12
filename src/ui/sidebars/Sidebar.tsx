import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { IconButton } from "ui";
import { Colors } from "../Colors";

interface Props {
  content: React.ReactElement;
  open: boolean;
  setOpen: (open: boolean) => void;
  pullRight?: boolean;
  width?: number;
  padding?: number;
  transitionTimeMs?: number;
}

export function Sidebar({
  content,
  setOpen,
  open,
  pullRight,
  width = 240,
  padding = 24,
  transitionTimeMs = 300,
}: Props): React.ReactElement {
  const [visible, setVisible] = useState(open);

  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => setIsFirstRender(false), []);
  const sideMargin = open && !isFirstRender ? 0 : -(width + 2 * padding);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (open) {
      setVisible(true);
    } else {
      timeoutRef.current = setTimeout(
        () => setVisible(false),
        transitionTimeMs
      );
    }
  }, [open]);

  return (
    <Container
      style={{
        transition: `margin ${transitionTimeMs}ms`,
        width,
        padding,
        ...(pullRight
          ? { right: 0, marginRight: sideMargin }
          : { left: 0, marginLeft: sideMargin }),
      }}
      ref={containerRef}
    >
      {visible && (
        <>
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
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  font-size: 12px;
  overflow-y: auto;
  color: ${Colors.LIGHT.fade(0.2).toString()};
  background-color: ${Colors.DARKER.toString()};
  z-index: 10;
`;
