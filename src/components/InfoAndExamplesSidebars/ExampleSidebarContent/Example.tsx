import React, { ReactElement } from "react";
import { Colors, IconButton, Row, T } from "ui";
import { BsBoxArrowInRight, BsFiles } from "react-icons/bs";
import { CodeEditor } from "logic";

interface Props {
  label: string;
  description?: string | ReactElement;
  code: string;
  editor: CodeEditor;
  render: () => void;
  style?: React.CSSProperties;
}

export function Example({
  label,
  description,
  editor,
  code,
  render,
  style,
}: Props): React.ReactElement {
  return (
    <div style={style}>
      <Row style={{ justifyContent: "space-between" }}>
        <T color={Colors.LIGHT}>{label}</T>
        <Row>
          <IconButton
            onClick={(): void => {
              navigator.clipboard.writeText(code);
            }}
          >
            <BsFiles size={12} />
          </IconButton>
          <IconButton
            style={{ marginLeft: -8 }}
            onClick={(): void => {
              editor.setCode(code);
              render();
            }}
          >
            <BsBoxArrowInRight size={14} />
          </IconButton>
        </Row>
      </Row>
      <T>{description}</T>
    </div>
  );
}
