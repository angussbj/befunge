import autoBind from "auto-bind";
import { CommandChar } from "./CommandChar";
import { Code } from "../Code";
import { cloneDeep } from "lodash";
import { Coordinate, Direction, DIRECTION_VECTOR } from "utilities";

interface BefungeHistoryPoint {
  cursor: Coordinate;
  direction: Direction;
  stack: number[];
  output: string;
  stringMode: boolean;
  halted: boolean;
  code: Code;
  walking: boolean;
  running: boolean;
}

export type InputRequestStatus = false | "character" | "number" | "divideBy0";

export class Befunge {
  public cursor = new Coordinate(0, 0);
  public direction = Direction.Right;
  public stack: number[] = [];
  public output = "";
  public stringMode = false;
  public halted = false;
  public limits: Coordinate;
  public code: Code;
  public walkingDelayIndex = 2;
  private walkingDelay = 32;
  private static walkingDelays = [1, 64, 256, 1024, 2048];
  public walking = false;
  public running = false;
  public requestingInput: InputRequestStatus = false;
  private history: BefungeHistoryPoint[] = [];
  private future: BefungeHistoryPoint[] = [];

  constructor(
    public width: number,
    public height: number,
    private render?: () => void
  ) {
    this.limits = new Coordinate(width, height);
    this.code = new Code(width, height);
    autoBind(this);
  }

  public setHistoryPoint(): void {
    this.history.push(this.createHistoryPoint());
    this.future = [];
  }

  public undo(): void {
    this.future.push(this.createHistoryPoint());
    const point = this.history.pop();
    this.revertToPoint(point);
  }

  public redo(): void {
    this.history.push(this.createHistoryPoint());
    const point = this.future.pop();
    this.revertToPoint(point);
  }

  private createHistoryPoint(): BefungeHistoryPoint {
    return {
      cursor: this.cursor.clone(),
      direction: this.direction,
      stack: cloneDeep(this.stack),
      output: this.output,
      stringMode: this.stringMode,
      halted: this.halted,
      code: this.code.clone(),
      walking: this.walking,
      running: this.running,
    };
  }

  private revertToPoint(point?: BefungeHistoryPoint): void {
    if (!point) return;
    this.cursor.setToCopy(point.cursor);
    this.direction = point.direction;
    this.stack = cloneDeep(point.stack);
    this.output = point.output;
    this.stringMode = point.stringMode;
    this.halted = point.halted;
    this.code.setToCopy(point.code);
    this.walking = point.walking;
    this.running = point.running;
  }

  public moveCursor(): void {
    this.cursor.add(DIRECTION_VECTOR[this.direction]);
    this.cursor.modulo(this.limits);
  }

  public acceptInput(s: string): void {
    if (s.length === 0) return;
    if (
      this.requestingInput === "number" ||
      this.requestingInput === "divideBy0"
    ) {
      this.stack.push(parseInt(s, 10));
    } else if (this.requestingInput === "character") {
      this.stack.push(s.charCodeAt(0));
    }
    this.requestingInput = false;
    this.render?.();
    if (this.running) this.run();
    if (this.walking) this.walk();
  }

  public walk(): void {
    function recur(b: Befunge): () => void {
      return (): void => {
        if (b.walking && !b.requestingInput) {
          b.slowStep();
          setTimeout(recur(b), b.walkingDelay);
        }
      };
    }

    this.code.makeResetable();
    this.walking = true;
    this.running = false;
    this.stepOver();
    recur(this)();
  }

  public run(): void {
    function recur(b: Befunge): () => void {
      return (): void => {
        for (let i = 0; i < 1000; i++) {
          if (b.running && !b.requestingInput) b.quickStep();
        }
        if (b.running && !b.requestingInput) setTimeout(recur(b), 1);
        else b.render?.();
      };
    }

    function renderPeriodically(b: Befunge): () => void {
      return (): void => {
        b.render?.();
        if (b.running && !b.requestingInput)
          setTimeout(renderPeriodically(b), 1000);
      };
    }

    this.code.makeResetable();
    this.walking = false;
    this.running = true;
    this.stepOver();
    renderPeriodically(this)();
    recur(this)();
  }

  public pause(): void {
    this.walking = false;
    this.running = false;
    this.render?.();
  }

  public reset(): void {
    this.cursor = new Coordinate(0, 0);
    this.direction = Direction.Right;
    this.stack = [];
    this.output = "";
    this.halted = false;
    this.stringMode = false;
    this.walking = false;
    this.running = false;
    this.requestingInput = false;
    this.code.reset(true);
    this.render?.();
  }

  public step(): void {
    if (this.halted || this.requestingInput) return;
    this.code.makeResetable();
    this.stepOver();
  }

  private quickStep(): void {
    if (this.cursorAtBreakpoint()) this.pause();
    else {
      this.execute(this.getCursorCharacter());
      this.moveCursor();
    }
  }

  private slowStep(): void {
    if (this.cursorAtBreakpoint()) this.pause();
    else {
      this.execute(this.getCursorCharacter());
      this.moveCursor();
      this.render?.();
    }
  }

  private stepOver(): void {
    this.execute(this.getCursorCharacter());
    this.moveCursor();
    this.render?.();
  }

  private cursorAtBreakpoint(): boolean {
    return this.code.breakpoints[this.cursor.x][this.cursor.y];
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

  public isValidCommand(command: string): command is CommandChar {
    return command in this;
  }

  private throwUnrecognisedCommand(command: string, cursor: Coordinate): void {
    this.output += `\nError: Unrecognised command "${command}" at ${cursor.toString()}`;
    this.halt();
  }

  private halt(): void {
    this.halted = true;
    this.walking = false;
    this.running = false;
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
    this.halt();
  }
  private [" "](): void {} // eslint-disable-line @typescript-eslint/no-empty-function

  public increaseWalkingDelay(): void {
    if (this.walkingDelayIndex < 4) {
      this.walkingDelayIndex += 1;
      this.walkingDelay = Befunge.walkingDelays[this.walkingDelayIndex];
      this.render?.();
    }
  }

  public decreaseWalkingDelay(): void {
    if (this.walkingDelayIndex > 0) {
      this.walkingDelayIndex -= 1;
      this.walkingDelay = Befunge.walkingDelays[this.walkingDelayIndex];
      this.render?.();
    }
  }
}
