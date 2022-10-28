import { BefungeCore } from "../BefungeCore";
import { COMMAND_CHARS } from "../CommandChar";
import { Code } from "../../Code";
import { Coordinate, Direction } from "utilities";
import { random } from "lodash";

describe("BefungeCore", () => {
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
    // Note: many edge cases are not covered because the befunge spec is not exhaustive
    describe("digits", () => {
      it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])(
        "should push %s to the stack",
        (n) => {
          b.execute(n.toString(10));
          expect(b.stack).toEqual([n]);
        }
      );

      it("should push to the stack even when there are other things on the stack", () => {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        digits.forEach((n) => b.execute(n.toString(10)));
        expect(b.stack).toEqual(digits);
      });
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

      it("should request user input when dividing by zero", () => {
        b.execute("9");
        b.execute("0");
        b.execute("/");
        expect(b.requestingInput).toEqual("divideBy0");
        b.acceptInput("123");
        expect(b.requestingInput).toEqual(false);
        expect(b.stack).toEqual([123]);
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

    describe("%", () => {
      it("should push the remainder of the integer division second-from-top / top to the stack", () => {
        b.execute("5");
        b.execute("3");
        b.execute("%");
        expect(b.stack).toEqual([2]);
      });

      it("the sign of the result should match the sign of the numerator", () => {
        b.stack = [2, 3];
        b.execute("%");
        expect(b.stack).toEqual([2]);
        b.stack = [-2, 3];
        b.execute("%");
        expect(b.stack).toEqual([-2]);
        b.stack = [2, -3];
        b.execute("%");
        expect(b.stack).toEqual([2]);
        b.stack = [-2, -3];
        b.execute("%");
        expect(b.stack).toEqual([-2]);
      });
    });

    describe("!", () => {
      it("if the value is 0, it should push 1", () => {
        b.execute("0");
        b.execute("!");
        expect(b.stack).toEqual([1]);
      });

      it("if the value is 1, it should push 0", () => {
        b.execute("1");
        b.execute("!");
        expect(b.stack).toEqual([0]);
      });

      it("if the value is something else, it should push 0", () => {
        b.stack = [random(1, 2 ^ 16)];
        b.execute("!");
        expect(b.stack).toEqual([0]);
      });

      it("if the stack is empty, it should push 1", () => {
        b.execute("!");
        expect(b.stack).toEqual([1]);
      });
    });

    describe("`", () => {
      it("if the top of the stack is less than the second top, it should push 1", () => {
        b.stack = [5, 4];
        b.execute("`");
        expect(b.stack).toEqual([1]);
      });

      it("if the top of the stack is greater than the second top, it should push 0", () => {
        b.stack = [5, 6];
        b.execute("`");
        expect(b.stack).toEqual([0]);
      });

      it("if the top of the stack is equal to the second top, it should push 0", () => {
        b.stack = [5, 5];
        b.execute("`");
        expect(b.stack).toEqual([0]);
      });
    });

    describe("directions", () => {
      it("should start going right", () => {
        expect(b.direction).toEqual(Direction.Right);
      });

      it("'<' should make it go left", () => {
        b.execute("<");
        expect(b.direction).toEqual(Direction.Left);
      });

      it("'v' should make it go down", () => {
        b.execute("v");
        expect(b.direction).toEqual(Direction.Down);
      });

      it("'^' should make it go up", () => {
        b.execute("^");
        expect(b.direction).toEqual(Direction.Up);
      });

      it("'>' should make it go right", () => {
        b.execute("<"); // Otherwise it would already be going right, so we couldn't tell if '>' worked
        b.execute(">");
        expect(b.direction).toEqual(Direction.Right);
      });
    });

    describe("?", () => {
      // This test is random but should fail less that 0.01% of times it runs
      it("should assign a random direction", () => {
        const directions = [];
        for (let i = 10000; i--; ) {
          b.execute("?");
          directions.push(b.direction);
        }
        const counts = {
          [Direction.Left]: 0,
          [Direction.Right]: 0,
          [Direction.Up]: 0,
          [Direction.Down]: 0,
        };
        directions.forEach((d) => {
          counts[d] += 1;
        });
        Object.values(counts).forEach((count) =>
          expect(count).toBeGreaterThan(2200)
        );
      });
    });

    describe("_", () => {
      it("should go right when 0 is on the stack", () => {
        b.execute("<"); // Otherwise it would already be going right, so we couldn't tell if '_' did anything
        b.execute("0");
        b.execute("_");
        expect(b.direction).toEqual(Direction.Right);
      });

      it("should go left when 1 is on the stack", () => {
        b.execute("1");
        b.execute("_");
        expect(b.direction).toEqual(Direction.Left);
      });
    });

    describe("|", () => {
      it("should go down when 0 is on the stack", () => {
        b.execute("0");
        b.execute("|");
        expect(b.direction).toEqual(Direction.Down);
      });

      it("should go up when 1 is on the stack", () => {
        b.execute("1");
        b.execute("|");
        expect(b.direction).toEqual(Direction.Up);
      });
    });

    describe('"', () => {
      it("should enable string mode", () => {
        expect(b.stringMode).toEqual(false);
        b.execute('"');
        expect(b.stringMode).toEqual(true);
      });

      it("should disable string mode", () => {
        b.stringMode = true;
        b.execute('"');
        expect(b.stringMode).toEqual(false);
      });

      it("should allow characters to be entered while in string mode", () => {
        b.execute('"');
        b.execute("A");
        b.execute(" ");
        expect(b.stack).toEqual([65, 32]);
      });

      it("should not allow characters to be entered while not in string mode", () => {
        b.execute("A");
        expect(b.output).toMatch("Error: Unrecognised command");
      });
    });

    describe(":", () => {
      it("should duplicate the top value on the stack", () => {
        b.stack = [1, 2];
        b.execute(":");
        expect(b.stack).toEqual([1, 2, 2]);
      });
    });

    describe("\\", () => {
      it("should swap the top two values on the stack", () => {
        b.stack = [1, 2];
        b.execute("\\");
        expect(b.stack).toEqual([2, 1]);
      });
    });

    describe("$", () => {
      it("discard the top value from the stack", () => {
        b.stack = [1, 2];
        b.execute("$");
        expect(b.stack).toEqual([1]);
      });
    });

    describe(".", () => {
      it("should output the top of the stack as an integer", () => {
        b.stack = [1, 12];
        b.execute(".");
        expect(b.output).toEqual("12");
        expect(b.stack).toEqual([1]);
      });
    });

    describe(",", () => {
      it("should output the top of the stack as a character", () => {
        b.stack = [65];
        b.execute(",");
        expect(b.output).toEqual("A");
        expect(b.stack).toEqual([]);
      });
    });

    describe("&", () => {
      it("should request integer user input and put it on the stack", () => {
        b.stack = [65];
        b.execute("&");
        expect(b.requestingInput).toEqual("number");
        b.acceptInput("123");
        expect(b.requestingInput).toEqual(false);
        expect(b.stack).toEqual([65, 123]);
      });
    });

    describe("~", () => {
      it("should request character user input and put it on the stack", () => {
        b.stack = [];
        b.execute("~");
        expect(b.requestingInput).toEqual("character");
        b.acceptInput("A");
        expect(b.requestingInput).toEqual(false);
        expect(b.stack).toEqual([65]);
      });
    });

    describe("#", () => {
      it("should move the cursor an extra square", () => {
        code.userPut(0, 0, "#");
        b.step();
        expect(b.cursor).toEqual(new Coordinate(2, 0));
      });
    });

    describe("g", () => {
      it("should read a value from the code to the stack", () => {
        code.userPut(5, 6, "A");
        b.stack = [5, 6];
        b.execute("g");
        expect(b.stack).toEqual([65]);
      });
    });

    describe("p", () => {
      it("should write a value from the stack to the code", () => {
        b.stack = [65, 5, 6];
        b.execute("p");
        expect(code.get(5, 6)).toEqual("A");
      });
    });

    describe("@", () => {
      it("should end the program", () => {
        b.execute("@");
        expect(b.halted).toEqual(true);
        b.step(); // should do nothing
        expect(b.cursor).toEqual(new Coordinate(0, 0));
      });
    });

    describe("<space>", () => {
      it("should do nothing", () => {
        b.execute(" ");
        // The default state:
        expect(b.cursor).toEqual(new Coordinate(0, 0));
        expect(b.direction).toEqual(Direction.Right);
        expect(b.stack).toEqual([]);
        expect(b.output).toEqual("");
        expect(b.stringMode).toEqual(false);
        expect(b.requestingInput).toEqual(false);
        expect(b.halted).toEqual(false);
      });
    });
  });

  describe("step", () => {
    it("should execute the character at the cursor", () => {
      code.userPut(0, 0, "1");
      b.step();
      expect(b.stack).toEqual([1]);
    });

    it("should move the cursor", () => {
      code.userPut(0, 0, "1");
      b.step();
      expect(b.cursor).toEqual(new Coordinate(1, 0));
    });

    it("should move the cursor in the direction specified by the command (when relevant)", () => {
      code.userPut(0, 0, "v");
      b.step();
      expect(b.cursor).toEqual(new Coordinate(0, 1));
      code.userPut(0, 1, "^");
      b.step();
      expect(b.cursor).toEqual(new Coordinate(0, 0));
      code.userPut(0, 0, ">");
      b.step();
      expect(b.cursor).toEqual(new Coordinate(1, 0));
      code.userPut(1, 0, "<");
      b.step();
      expect(b.cursor).toEqual(new Coordinate(0, 0));
    });

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

  // TODO: reset, copy, set, more on accepting input (can't step!), getCursorCharacter
});
