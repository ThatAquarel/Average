export function roundDigit(x: number, digits: number): number {
    const multiplier = Math.pow(10, digits);
    return Math.round(x * multiplier) / multiplier;
}