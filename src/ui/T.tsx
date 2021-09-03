import React from "react";
import styled from "styled-components";
import { Colors } from "./Colors";
import Color from "color";

interface Props {
  size?: "small";
  color?: Color;
  children: React.ReactNode;
  unselectable?: boolean;
  style?: React.CSSProperties;
}

export function T({
  size,
  color,
  unselectable,
  children,
  style,
}: Props): React.ReactElement {
  const finalStyle = {
    color: (color || Colors.LIGHT.fade(0.2)).toString(),
    fontSize: size === "small" ? 11 : size === "big" ? 16 : 12,
    ...style,
  };

  return unselectable ? (
    <UnselectableText style={finalStyle}>{children}</UnselectableText>
  ) : (
    <div style={finalStyle}>{children}</div>
  );
}

const UnselectableText = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
