import { BefungeCoreData } from "./BefungeCoreData";
import { Code } from "logic";

export interface BefungeHistoryPoint {
  core: BefungeCoreData;
  walking: boolean;
  running: boolean;
  code: Code;
}
