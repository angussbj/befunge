import React, { useCallback, useEffect, useRef, useState } from "react";
import { Colors } from "../Colors";
import { Row } from "../Row";
import { SidebarTitle } from "./SidebarTitle";
import styled from "styled-components";
import { IconButton } from "ui";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Props {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  startCollapsed?: boolean;
  transitionTimeMs?: number;
}

export function SidebarSection({
  title,
  children,
  collapsible = false,
  startCollapsed = collapsible,
  transitionTimeMs = 200,
}: Props): React.ReactElement {
  const [collapsed, setCollapsed] = useState(startCollapsed);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // TODO: Generify, tidy, and extract this
  // TODO: Stop animation on first render
  const animateHeight = useCallback((collapsed: boolean): void => {
    if (!containerRef.current) return;
    const initialHeight = containerRef.current.clientHeight;
    const contentHeight = containerRef.current.scrollHeight;

    containerRef.current.style.maxHeight = initialHeight + "px";
    timeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;
      if (collapsed) {
        containerRef.current.style.maxHeight = "160px";
      } else {
        containerRef.current.style.maxHeight = contentHeight + "px";
        timeoutRef.current = setTimeout(() => {
          if (containerRef.current) containerRef.current.style.maxHeight = "";
        }, transitionTimeMs);
      }
    }, 1);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (containerRef.current) animateHeight(collapsed);
    else {
      timeoutRef.current = setTimeout(() => animateHeight(collapsed), 1);
    }
  }, [collapsed]);

  return (
    <>
      <div
        style={{
          transition: `max-height ${transitionTimeMs}ms`,
          overflow: "hidden",
          position: "relative",
          marginTop: 24,
        }}
        ref={containerRef}
      >
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <SidebarTitle>{title}</SidebarTitle>
          {collapsible && (
            <IconButton
              style={{ marginRight: -4 }}
              onClick={(): void => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <AiOutlinePlus size={12} />
              ) : (
                <AiOutlineMinus size={12} />
              )}
            </IconButton>
          )}
        </Row>
        {children}
        {collapsed && <FadeOut onClick={(): void => setCollapsed(false)} />}
      </div>
    </>
  );
}

const FadeOut = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 40px;
  background: linear-gradient(transparent, ${Colors.DARKER.toString()});
`;
