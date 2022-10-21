import { BefungeCore } from "../BefungeCore";
import { COMMAND_CHARS } from "../CommandChar";
import { Code } from "../../Code";
import { Coordinate } from "utilities";

describe("Befunge", () => {
  let b: BefungeCore;
  let code: Code;

  beforeEach(() => {
    const limits = new Coordinate(10, 10);
    code = new Code(10, 10);
    b = new BefungeCore(limits, code);
  });

  describe("commandValidity", () => {
    it.each(COMMAND_CHARS)("should recognise command char %s", (char) => {
      b.execute(char);
      expect(b.output).not.toMatch(/Error: Unrecognised command/);
    });

    it.each(["a", "{", "hello", "22"])(
      "should not recognise %s as a valid command",
      (s) => {
        b.execute(s);
        expect(b.output).toMatch(/Error: Unrecognised command/);
      }
    );
  });

  describe("operations", () => {
    describe("+", () => {
      it("should add two things on the stack", () => {
        b.execute("2");
        b.execute("3");
        b.execute("+");
        expect(b.stack).toEqual([5]);
      });
    });

    describe("*", () => {
      it("should multiply two things on the stack", () => {
        b.execute("2");
        b.execute("3");
        b.execute("*");
        expect(b.stack).toEqual([6]);
      });
    });

    describe("/", () => {
      it("should perform integer division, dividing the second from the top of the stack by the top of the stack", () => {
        b.execute("9");
        b.execute("2");
        b.execute("/");
        expect(b.stack).toEqual([4]);
      });
    });

    describe("-", () => {
      it("should subtract the top of the stack from the second from the top of the stack", () => {
        b.execute("2");
        b.execute("3");
        b.execute("-");
        expect(b.stack).toEqual([-1]);
      });
    });

    // TODO: Test more operations
  });

  describe("run", () => {
    it("should execute an arithmetic program correctly", () => {
      code.set([["v", "8", "8", "*", "@"]]);
      while (b.canStep()) b.step();
      expect(b.stack).toEqual([64]);
    });

    it("should execute a program with a loop correctly", () => {
      code.set([
        ["v", "1", "+", ":", "6", "%", ">", " "],
        ["<", " ", " ", " ", " ", " ", "|", "@"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
      ]);
      while (b.canStep()) b.step();
      expect(b.stack).toEqual([6]);
    });
  });
});
