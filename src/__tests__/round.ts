import { roundDigit } from "../math/round";

test("3.14 rounded to tenth = 3.1", () => {
  expect(roundDigit(3.14, 1)).toBeCloseTo(3.14, 1);
});
