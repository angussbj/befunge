import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
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
    <>
      {visible && (
        <Container style={pullRight ? { right: 0 } : { left: 0 }}>
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
      )}
      {page}
    </>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 24px;
  width: 240px;
  font-size: 12px;
  color: ${Colors.LIGHT.fade(0.2).toString()};
  background-color: ${Colors.DARKER.toString()};
  z-index: 10;
`;
