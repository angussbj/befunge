import { Coordinate } from "utilities";
import { sleep } from "../../../utilities/sleep";
import { Code } from "../../Code";
import { BefungeCore } from "../BefungeCore";
import { BefungeRunner, RUNNING_RENDER_PERIOD } from "../BefungeRunner";

describe("BefungeRunner", () => {
  let render: () => {};
  let code: Code;
  let core: BefungeCore;
  let runner: BefungeRunner;
  let stepCount: number;

  beforeEach(() => {
    stepCount = 0;
    const limits = new Coordinate(10, 10);
    render = jest.fn();
    code = new Code(10, 10);
    core = {
      cursor: new Coordinate(0, 0),
      halted: false,
      requestingInput: false,
      canStep: jest.fn(() => true),
      step: jest.fn(() => {
        stepCount += 1;
      }),
      reset: jest.fn(),
      acceptInput: jest.fn(),
      copy: jest.fn(),
      set: jest.fn(),
    } as unknown as BefungeCore;
    runner = new BefungeRunner(limits, code, core, render);
  });

  describe("runOrPause", () => {
    it("should call core.step a lot  and render once per RUNNING_RENDER_PERIOD while running and not while paused", async () => {
      runner.runOrPause();
      await sleep(20);
      expect(render).toHaveBeenCalledTimes(1);
      expect(stepCount).toBeGreaterThan(10);
      let prevStepCount = stepCount;

      await sleep(RUNNING_RENDER_PERIOD);
      expect(render).toHaveBeenCalledTimes(2);
      expect(stepCount).toBeGreaterThan(prevStepCount + 100);

      runner.runOrPause();
      expect(render).toHaveBeenCalledTimes(3);
      prevStepCount = stepCount;

      await sleep(20);
      expect(stepCount).toEqual(prevStepCount);
      expect(render).toHaveBeenCalledTimes(3);
    });
  });

  describe("walkOrPause", () => {
    it("should call core.step frequently and render once per step while walking and not while paused", async () => {
      let rendersFromChangingWalkingDelay = 0;
      while (runner.walkingSpeed.canGoFaster()) {
        runner.walkingSpeed.goFaster();
        rendersFromChangingWalkingDelay += 1;
      }

      runner.walkOrPause();
      await sleep(20);

      expect(stepCount).toBeGreaterThan(5);
      expect(render).toHaveBeenCalledTimes(
        stepCount + rendersFromChangingWalkingDelay
      );

      runner.walkOrPause();
      let finalStepCount = stepCount;
      await sleep(20);
      expect(stepCount).toEqual(finalStepCount);
      expect(render).toHaveBeenCalledTimes(
        stepCount + rendersFromChangingWalkingDelay + 1
      );
    });
  });
});
