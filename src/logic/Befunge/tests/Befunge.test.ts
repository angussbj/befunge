import { Befunge } from "../Befunge";
import { COMMAND_CHARS } from "../CommandChar";

describe("Befunge", () => {
  describe("isValidCommand", () => {
    let b: Befunge;
    beforeEach(() => {
      b = new Befunge(0, 0);
      b.code.set([]);
    });

    it("should recognise command chars", () => {
      COMMAND_CHARS.forEach((char) => {
        expect(b.isValidCommand(char)).toEqual(true);
      });
    });

    it("should not recognise other chars", () => {
      ["a", "{", "hello", "22"].forEach((s) => {
        expect(b.isValidCommand(s)).toEqual(false);
      });
    });
  });

  describe("operations", () => {
    let b: Befunge;
    beforeEach(() => {
      b = new Befunge(0, 0);
      b.code.set([]);
    });

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
      const b = new Befunge(1, 5);
      b.code.set([["v", "8", "8", "*", "@"]]);
      b.run();
      expect(b.stack).toEqual([64]);
    });

    it("should execute a program with a loop correctly", () => {
      const b = new Befunge(3, 8);
      b.code.set([
        ["v", "1", "+", ":", "6", "%", ">", " "],
        ["<", " ", " ", " ", " ", " ", "|", "@"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
      ]);
      b.run();
      expect(b.stack).toEqual([6]);
    });
  });
});
