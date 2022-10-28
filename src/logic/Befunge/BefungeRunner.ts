import autoBind from "auto-bind";
import { BefungeCore } from "./BefungeCore";
import { Code } from "../Code";
import { Coordinate } from "utilities";
import { BefungeHistoryPoint } from "./BefungeHistoryPoint";

export const RUNNING_RENDER_PERIOD = 1000;

export class BefungeRunner {
  public walkingDelayIndex = 2;
  private walkingDelay = BefungeRunner.walkingDelays[this.walkingDelayIndex];
  private static walkingDelays = [1, 64, 256, 1024, 2048];
  public walking = false;
  public running = false;
  private history: BefungeHistoryPoint[] = [];
  private future: BefungeHistoryPoint[] = [];

  constructor(
    limits: Coordinate,
    private code: Code,
    private core: BefungeCore,
    private render?: () => void
  ) {
    autoBind(this);
  }

  public runOrPause(): void {
    if (this.running) this.pause();
    else this.run();
  }

  public walkOrPause(): void {
    if (this.walking) this.pause();
    else this.walk();
  }

  // TODO: Make walk() and run() private? Or remove walkOrPause and runOrPause
  public walk(): void {
    function recur(b: BefungeRunner): () => void {
      return (): void => {
        if (b.walking && !b.core.requestingInput) {
          b.slowStep();
          setTimeout(recur(b), b.walkingDelay);
        }
      };
    }

    if (this.core.halted) return;
    this.code.makeResetable();
    this.walking = true;
    this.running = false;
    if (!this.core.requestingInput) this.stepOver();
    setTimeout(recur(this), this.walkingDelay);
  }

  public run(): void {
    function recur(b: BefungeRunner): () => void {
      return (): void => {
        for (let i = 0; i < 1000; i++) {
          if (b.running && b.core.canStep()) b.quickStep();
        }
        if (b.running && b.core.canStep()) setTimeout(recur(b), 1);
      };
    }

    function renderPeriodically(b: BefungeRunner): () => void {
      return (): void => {
        if (b.running && b.core.canStep()) {
          setTimeout(() => {
            b.render?.();
            renderPeriodically(b);
          }, RUNNING_RENDER_PERIOD);
        }
      };
    }

    if (this.core.halted) return;
    this.code.makeResetable();
    this.walking = false;
    this.running = true;
    if (!this.core.requestingInput) this.stepOver();
    renderPeriodically(this)();
    recur(this)();
  }

  public pause(): void {
    this.walking = false;
    this.running = false;
    this.render?.();
  }

  public reset(): void {
    this.walking = false;
    this.running = false;
    this.code.reset(true);
    this.core.reset();
    this.render?.();
  }

  public step(): void {
    if (this.core.requestingInput) return;
    this.code.makeResetable();
    this.stepOver();
  }

  private quickStep(): void {
    if (this.cursorAtBreakpoint()) this.pause();
    else this.core.step();
  }

  private slowStep(): void {
    if (this.cursorAtBreakpoint()) this.pause();
    else {
      this.core.step();
      this.render?.();
    }
  }

  private stepOver(): void {
    this.core.step();
    this.render?.();
  }

  private cursorAtBreakpoint(): boolean {
    const { x, y } = this.core.cursor;
    return this.code.breakpoints[x][y];
  }

  // TODO: extract walking speed logic to new class
  public increaseWalkingDelay(): void {
    if (this.canIncreaseWalkingDelay()) {
      this.walkingDelayIndex += 1;
      this.walkingDelay = BefungeRunner.walkingDelays[this.walkingDelayIndex];
      this.render?.();
    }
  }

  public decreaseWalkingDelay(): void {
    if (this.canDecreaseWalkingDelay()) {
      this.walkingDelayIndex -= 1;
      this.walkingDelay = BefungeRunner.walkingDelays[this.walkingDelayIndex];
      this.render?.();
    }
  }

  public getWalkingSpeed(): number {
    return BefungeRunner.walkingDelays.length - this.walkingDelayIndex;
  }

  public canIncreaseWalkingDelay(): boolean {
    return this.walkingDelayIndex < BefungeRunner.walkingDelays.length - 1;
  }

  public canDecreaseWalkingDelay(): boolean {
    return this.walkingDelayIndex > 0;
  }

  public acceptInput(input: string): void {
    this.core.acceptInput(input);
    this.render?.();
    if (this.running) this.run();
    if (this.walking) this.walk();
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
      core: this.core.copy(),
      walking: this.walking,
      running: this.running,
      code: this.code.clone(),
    };
  }

  private revertToPoint(point?: BefungeHistoryPoint): void {
    if (!point) return;
    this.core.set(point.core);
    this.walking = point.walking;
    this.running = point.running;
    this.code.setToCopy(point.code);
  }
}
