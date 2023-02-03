import { arithmeticMean } from "../math/arithmetic_mean";

test("Average of {1, 2, 3} = 2", () => {
  expect(arithmeticMean([1, 2, 3])).toBe(2);
});

test("Average of {4, 4.5, 4.5, 4} = 4.25", () => {
  expect(arithmeticMean([4, 4.5, 4.5, 4])).toBe(4.25);
});
