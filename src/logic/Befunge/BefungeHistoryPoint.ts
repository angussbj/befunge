import { BefungeCoreData } from "./BefungeCoreData";

export interface BefungeHistoryPoint {
  core: BefungeCoreData;
  walking: boolean;
  running: boolean;
}
