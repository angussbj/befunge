import { constArray2 } from "../constArray2";

describe("constArray2", () => {
  it("should return a 2D array of the value", () => {
    expect(constArray2(2, 2, "x")).toEqual([
      ["x", "x"],
      ["x", "x"],
    ]);
  });

  it("should not have reference issues", () => {
    const array = constArray2(2, 2, "x");
    array[1][1] = "y";
    expect(array).toEqual([
      ["x", "x"],
      ["x", "y"],
    ]);
  });

  it("should not return array that can be accessed with the width coordinate first", () => {
    const array = constArray2(3, 2, "x");
    expect(array[2][1]).toEqual("x");
  });
});
