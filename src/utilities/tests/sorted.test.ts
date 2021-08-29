import { sorted } from "../sorted";

describe("sorted", () => {
  it("should return a two element lists of numbers sorted in increasing order", () => {
    expect(sorted([17, 6])).toEqual([6, 17]);
  });
});
