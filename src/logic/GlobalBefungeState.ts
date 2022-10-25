import { Coordinate } from "utilities";
import { Code } from "./Code";
import { BefungeCore, BefungeRunner } from "./Befunge";
import { CodeEditor } from "./CodeEditor";

export interface GlobalBefungeState {
  limits: Coordinate;
  code: Code;
  core: BefungeCore;
  editor: CodeEditor;
  executor: BefungeRunner;
}
