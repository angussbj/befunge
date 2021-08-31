import { Coordinate } from "../../utilities";

export enum Direction {
  Left,
  Right,
  Up,
  Down,
}

export const DIRECTION_VECTOR = {
  [Direction.Left]: new Coordinate(-1, 0),
  [Direction.Right]: new Coordinate(1, 0),
  [Direction.Up]: new Coordinate(0, -1),
  [Direction.Down]: new Coordinate(0, 1),
};

export type DirectionName = keyof typeof Direction;
