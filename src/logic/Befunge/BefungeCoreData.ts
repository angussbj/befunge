import { Coordinate, Direction } from "utilities";

export interface BefungeCoreData {
  cursor: Coordinate;
  direction: Direction;
  stack: number[];
  output: string;
  stringMode: boolean;
  halted: boolean;
}
