import autoBind from "auto-bind";

export class WalkingSpeed {
  private delayIndex = 2;
  public delay = WalkingSpeed.walkingDelays[this.delayIndex];
  private static walkingDelays = [1, 64, 256, 1024, 2048];

  constructor(private render?: () => void) {
    autoBind(this);
  }

  public goFaster(): void {
    if (this.canGoFaster()) {
      this.delayIndex -= 1;
      this.delay = WalkingSpeed.walkingDelays[this.delayIndex];
      this.render?.();
    }
  }

  public goSlower(): void {
    if (this.canGoSlower()) {
      this.delayIndex += 1;
      this.delay = WalkingSpeed.walkingDelays[this.delayIndex];
      this.render?.();
    }
  }

  public canGoSlower(): boolean {
    return this.delayIndex < WalkingSpeed.walkingDelays.length - 1;
  }

  public canGoFaster(): boolean {
    return this.delayIndex > 0;
  }

  public getSpeed(): number {
    return WalkingSpeed.walkingDelays.length - this.delayIndex;
  }
}
