import { WalkingSpeed } from "../WalkingSpeed";

describe("Befunge", () => {
  let s: WalkingSpeed;

  beforeEach(() => {
    s = new WalkingSpeed();
  });

  it("should start with speed 3", () => {
    expect(s.getSpeed()).toEqual(3);
  });

  it("should be able to go up to 5", () => {
    expect(s.canGoFaster()).toEqual(true);
    s.goFaster();
    expect(s.canGoFaster()).toEqual(true);
    s.goFaster();
    expect(s.getSpeed()).toEqual(5);
  });

  it("should not be able to go above 5", () => {
    s.goFaster();
    s.goFaster();
    expect(s.canGoFaster()).toEqual(false);
    s.goFaster();
    expect(s.getSpeed()).toEqual(5);
  });

  it("should be able to go down to 1", () => {
    expect(s.canGoSlower()).toEqual(true);
    s.goSlower();
    expect(s.canGoSlower()).toEqual(true);
    s.goSlower();
    expect(s.getSpeed()).toEqual(1);
  });

  it("should not be able to go below 1", () => {
    s.goSlower();
    s.goSlower();
    expect(s.canGoSlower()).toEqual(false);
    s.goSlower();
    expect(s.getSpeed()).toEqual(1);
  });

  it("faster speeds should have shorter delays", () => {
    s.goSlower();
    s.goSlower();
    expect(s.getSpeed()).toEqual(1);
    let previousDelay = s.delay;
    s.goFaster();
    expect(s.getSpeed()).toEqual(2);
    expect(s.delay).toBeLessThan(previousDelay);
    previousDelay = s.delay;
    s.goFaster();
    expect(s.getSpeed()).toEqual(3);
    expect(s.delay).toBeLessThan(previousDelay);
    previousDelay = s.delay;
    s.goFaster();
    expect(s.getSpeed()).toEqual(4);
    expect(s.delay).toBeLessThan(previousDelay);
    previousDelay = s.delay;
    s.goFaster();
    expect(s.getSpeed()).toEqual(5);
    expect(s.delay).toBeLessThan(previousDelay);
  });
});
