import autoBind from "auto-bind";
import { COMMAND_CHARS, CommandChar } from "./CommandChar";
import { Code } from "../Code";
import { cloneDeep } from "lodash";
import { Coordinate, Direction, DIRECTION_VECTOR } from "utilities";
import { BefungeCoreData } from "./BefungeCoreData";
import { InputRequestStatus } from "./InputRequestStatus";

export class BefungeCore {
  public cursor: Coordinate = new Coordinate(0, 0);
  public direction = Direction.Right;
  public stack: number[] = [];
  public output = "";
  public stringMode = false;
  public requestingInput: InputRequestStatus = false;
  public halted = false;

  constructor(private limits: Coordinate, private code: Code) {
    autoBind(this);
  }

  public copy(): BefungeCoreData {
    return {
      cursor: this.cursor.clone(),
      direction: this.direction,
      stack: cloneDeep(this.stack),
      output: this.output,
      stringMode: this.stringMode,
      halted: this.halted, // TODO: Thoroughly test halting
    };
  }

  public set(point?: BefungeCoreData): void {
    if (!point) return;
    this.cursor.setToCopy(point.cursor);
    this.direction = point.direction;
    this.stack = point.stack;
    this.output = point.output;
    this.stringMode = point.stringMode;
    this.halted = point.halted;
  }

  public reset(): void {
    this.cursor = new Coordinate(0, 0);
    this.direction = Direction.Right;
    this.stack = [];
    this.output = "";
    this.stringMode = false;
    this.requestingInput = false;
    this.halted = false;
  }

  public moveCursor(): void {
    this.cursor.add(DIRECTION_VECTOR[this.direction]);
    this.cursor.modulo(this.limits);
  }

  public acceptInput(input: string): void {
    if (input.length === 0) return;
    if (
      this.requestingInput === "number" ||
      this.requestingInput === "divideBy0"
    ) {
      this.stack.push(parseInt(input, 10));
    } else if (this.requestingInput === "character") {
      this.stack.push(input.charCodeAt(0));
    }
    this.requestingInput = false;
  }

  public canStep(): boolean {
    return !this.halted && !this.requestingInput;
  }

  public step(): void {
    if (!this.halted) {
      this.execute(this.getCursorCharacter());
      this.moveCursor();
    }
  }

  public getCursorCharacter(): string {
    return this.code.get(this.cursor.x, this.cursor.y);
  }

  public execute(command: string): void {
    if (this.stringMode && command !== '"')
      this.stack.push(command.charCodeAt(0));
    else if (this.isValidCommand(command)) this[command]();
    else this.throwUnrecognisedCommand(command, this.cursor);
  }

  private isValidCommand(command: string): command is CommandChar {
    return COMMAND_CHARS.includes(command as CommandChar);
  }

  private throwUnrecognisedCommand(command: string, cursor: Coordinate): void {
    this.output += `\nError: Unrecognised command "${command}" at ${cursor.toString()}`;
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
    const a = this.stack.pop() ?? 0;
    const b = this.stack.pop() ?? 1;
    if (a === 0) this.requestingInput = "divideBy0";
    else this.stack.push(Math.floor(b / a));
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
    const y = this.stack.pop() ?? 0;
    const x = this.stack.pop() ?? 0;
    const coord = new Coordinate(x, y);
    if (coord.clone().modulo(this.limits).equals(coord))
      this.stack.push(this.code.get(x, y).charCodeAt(0));
    else this.stack.push(0);
  }

  private ["p"](): void {
    const y = this.stack.pop() ?? 0;
    const x = this.stack.pop() ?? 0;
    this.code.executionPut(x, y, String.fromCharCode(this.stack.pop() ?? 32)); // 32 is [space]
  }

  private ["."](): void {
    this.output += (this.stack.pop() ?? 0).toString(10);
  }

  private [","](): void {
    const a = this.stack.pop();
    if (a !== undefined) this.output += String.fromCharCode(a);
  }

  private ["&"](): void {
    this.requestingInput = "number";
  }

  private ["~"](): void {
    this.requestingInput = "character";
  }

  private ["@"](): void {
    this.halted = true;
  }

  private [" "](): void {} // eslint-disable-line @typescript-eslint/no-empty-function
}
