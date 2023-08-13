export const SELECTOR_TABLE_ROOT = ".BlueTableau > tbody";
export const SELECTOR_CELL_NUMBER = "tr:not([class]) > td[nowrap]";

export function parsePercentage(x: string): number {
    return parseFloat(x.split("(")[1].split(")")[0]);
}
