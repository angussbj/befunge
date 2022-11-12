import React, { useState } from "react";
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
}

export function SidebarSection({
  title,
  children,
  collapsible = false,
  startCollapsed = collapsible,
}: Props): React.ReactElement {
  const [collapsed, setCollapsed] = useState(startCollapsed);

  return (
    <>
      <div
        style={{
          maxHeight: collapsed ? 160 : undefined,
          overflow: "hidden",
          position: "relative",
          marginTop: 24,
        }}
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
