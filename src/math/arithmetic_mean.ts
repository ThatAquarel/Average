import { arraySum } from "./array_sum";

export function arithmeticMean(arr: number[]): number {
    return arraySum(arr) / arr.length;
}
