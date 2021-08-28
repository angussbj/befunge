import autoBind from "auto-bind";
import { constArray2, Coordinate } from "../utilities";
import { CommandChar } from "./CommandChar";

enum Direction {
  Left,
  Right,
  Up,
  Down,
}
const DIRECTION_VECTOR = {
  [Direction.Left]: new Coordinate(-1, 0),
  [Direction.Right]: new Coordinate(1, 0),
  [Direction.Up]: new Coordinate(0, -1),
  [Direction.Down]: new Coordinate(0, 1),
};

export class Befunge {
  public cursor = new Coordinate(0, 0);
  public direction = Direction.Right;
  public stack: number[] = [];
  public output = "";
  public stringMode = false;
  public halted = false;
  public limits: Coordinate;
  public code: string[][];

  constructor(width: number, height: number, private render: () => void) {
    this.limits = new Coordinate(width, height);
    this.code = constArray2(width, height, " ");
    autoBind(this);
  }

  public run(): void {
    while (!this.halted) {
      this.step();
    }
  }

  // TODO: how do we reset any changes made to the playing field by `p` commands?
  public reset(): void {
    this.cursor = new Coordinate(0, 0);
    this.stack = [];
    this.output = "";
    this.halted = false;
    this.stringMode = false;
    this.render();
  }

  public step(): void {
    this.execute(this.code[this.cursor.x][this.cursor.y]);
    this.moveCursor();
    this.render();
  }

  public moveCursor(): void {
    this.cursor.add(DIRECTION_VECTOR[this.direction]);
    this.cursor.modulo(this.limits);
  }

  public execute(command: string): void {
    if (this.stringMode) this.stack.push(command.charCodeAt(0));
    if (this.isValidCommand(command)) this[command]();
    else this.throwUnrecognisedCommand(command, this.cursor);
  }

  public isValidCommand(command: string): command is CommandChar {
    return command in this;
  }

  private throwUnrecognisedCommand(command: string, cursor: Coordinate): void {
    this.output += `\nError: Unrecognised command "${command}" at ${cursor.toString()}`;
    this.halt();
  }

  private halt(): void {
    this.halted = true;
  }

  // Instructions
  private ["0"](): void {
    this.stack.push(0);
  }
  private ["1"](): void {
    this.stack.push(1);
  }
  private ["2"](): void {
    this.stack.push(2);
  }
  private ["3"](): void {
    this.stack.push(3);
  }
  private ["4"](): void {
    this.stack.push(4);
  }
  private ["5"](): void {
    this.stack.push(5);
  }
  private ["6"](): void {
    this.stack.push(6);
  }
  private ["7"](): void {
    this.stack.push(7);
  }
  private ["8"](): void {
    this.stack.push(8);
  }
  private ["9"](): void {
    this.stack.push(9);
  }
  private ["+"](): void {
    this.stack.push((this.stack.pop() ?? 0) + (this.stack.pop() ?? 0));
  }
  private ["-"](): void {
    this.stack.push(-(this.stack.pop() ?? 0) + (this.stack.pop() ?? 0));
  }
  private ["/"](): void {
    this.stack.push(
      Math.floor((1 / (this.stack.pop() ?? 1)) * (this.stack.pop() || 1)) // handle division by 0?
    );
  }
  private ["*"](): void {
    this.stack.push((this.stack.pop() ?? 1) * (this.stack.pop() ?? 1));
  }
  private ["%"](): void {
    const a = this.stack.pop() ?? 1;
    const b = this.stack.pop() ?? 1;
    this.stack.push(b % a);
  }
  private ["!"](): void {
    this.stack.push(Number(!this.stack.pop()));
  }
  private ["`"](): void {
    const a = this.stack.pop() ?? 0;
    const b = this.stack.pop() ?? 0;
    this.stack.push(Number(a < b));
  }
  private [">"](): void {
    this.direction = Direction.Right;
  }
  private ["<"](): void {
    this.direction = Direction.Left;
  }
  private ["^"](): void {
    this.direction = Direction.Up;
  }
  private ["v"](): void {
    this.direction = Direction.Down;
  }
  private ["?"](): void {
    this.direction = Math.floor(Math.random() * 4);
  }
  private ["_"](): void {
    this.direction = this.stack.pop() ? Direction.Left : Direction.Right;
  }
  private ["|"](): void {
    this.direction = this.stack.pop() ? Direction.Up : Direction.Down;
  }
  private ['"'](): void {
    this.stringMode = !this.stringMode;
  }
  private [":"](): void {
    this.stack.push(this.stack[this.stack.length - 1]);
  }
  private ["\\"](): void {
    const a = this.stack.pop();
    const b = this.stack.pop();
    if (a !== undefined) this.stack.push(a);
    if (b !== undefined) this.stack.push(b);
  }
  private ["$"](): void {
    this.stack.pop();
  }
  private ["#"](): void {
    this.moveCursor();
  }
  private ["g"](): void {
    this.stack.push(
      this.code[this.stack.pop() ?? 0][this.stack.pop() ?? 0].charCodeAt(0)
    );
  }
  private ["p"](): void {
    this.code[this.stack.pop() ?? 0][this.stack.pop() ?? 0] =
      String.fromCharCode(this.stack.pop() ?? 32); // 32 is [space]
  }
  private ["."](): void {
    this.output += (this.stack.pop() ?? 0).toString(10);
  }
  private [","](): void {
    const a = this.stack.pop();
    if (a !== undefined) this.output += String.fromCharCode(a);
  }
  // TODO: input/output methods: ., ,, &, and ~
  private ["@"](): void {
    this.halt();
  }
  private [" "](): void {} // eslint-disable-line @typescript-eslint/no-empty-function
}
