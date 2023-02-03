import { standardDeviation } from "../math/standard_deviation";

test("Standard deviation of {1, 2, 3} = 2", () => {
  expect(standardDeviation([1, 2, 3])).toBeCloseTo(0.81649, 4);
});
