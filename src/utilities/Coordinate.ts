export class Coordinate {
  constructor(public x: number, public y: number) {}

  add(other: Coordinate): Coordinate {
    this.x += other.x;
    this.y += other.y;
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

  clone(): Coordinate {
    return new Coordinate(this.x, this.y);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}