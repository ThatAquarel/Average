import { arithmeticMean } from "../math/arithmetic_mean";
import { arraySum } from "./array_sum";

export function standardDeviation(arr: number[]): number {
    const mean = arithmeticMean(arr);
    let sum_of_squares = arr.map(n => Math.pow(n - mean, 2));
    return Math.sqrt(arraySum(sum_of_squares) / arr.length);
}
