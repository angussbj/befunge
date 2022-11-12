import { sum } from "../sum";

describe("sum", () => {
  it("should return the sum of the numbers", () => {
    expect(sum([17, 6])).toEqual(23);
    expect(sum([1, 2, 3, 4, 5])).toEqual(15);
    expect(sum([-1, -2])).toEqual(-3);
    expect(sum([1, -2, 3, -4, -5])).toEqual(-7);
    expect(sum([-200])).toEqual(-200);
    expect(sum([])).toEqual(0); // https://en.wikipedia.org/wiki/Empty_sum
  });
});
