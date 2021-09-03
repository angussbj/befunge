export class Coordinate {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number): Coordinate {
    this.x = x;
    this.y = y;
    return this;
  }

  setToCopy(other: Coordinate): Coordinate {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  setX(x: number): Coordinate {
    this.x = x;
    return this;
  }

  setY(y: number): Coordinate {
    this.y = y;
    return this;
  }

  add(other: Coordinate): Coordinate {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  times(k: number): Coordinate {
    this.x *= k;
    this.y *= k;
    return this;
  }

  negative(): Coordinate {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  modulo(other: Coordinate): Coordinate {
    this.x = ((this.x % other.x) + other.x) % other.x;
    this.y = ((this.y % other.y) + other.y) % other.y;
    return this;
  }

  equals(other: Coordinate): boolean {
    return this.x === other.x && this.y === other.y;
  }

  clone(): Coordinate {
    return new Coordinate(this.x, this.y);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  getMajorAndMinorDirections(): MajorMinorDirections {
    const horizontalDirection =
      this.x >= 0
        ? DIRECTION_VECTOR[Direction.Right]
        : DIRECTION_VECTOR[Direction.Left];
    const verticalDirection =
      this.y >= 0
        ? DIRECTION_VECTOR[Direction.Down]
        : DIRECTION_VECTOR[Direction.Up];
    return Math.abs(this.x) >= Math.abs(this.y)
      ? {
          majorVector: horizontalDirection,
          majorMax: Math.abs(this.x),
          minorVector: verticalDirection,
          minorMax: Math.abs(this.y),
        }
      : {
          majorVector: verticalDirection,
          majorMax: Math.abs(this.y),
          minorVector: horizontalDirection,
          minorMax: Math.abs(this.x),
        };
  }
}

export interface MajorMinorDirections {
  majorVector: Coordinate;
  majorMax: number;
  minorVector: Coordinate;
  minorMax: number;
}

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
