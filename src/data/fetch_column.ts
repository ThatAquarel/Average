const SELECTOR_TABLE_ROOT = ".BlueTableau > tbody";
const SELECTOR_CELL_NUMBER = "tr:not([class]) > td[nowrap]";

export function fetchColumnNumber(column: number): number[] {
    let html_cells = document.querySelectorAll(`${SELECTOR_TABLE_ROOT} > ${SELECTOR_CELL_NUMBER}`);

    let cells = (Array.from(html_cells)
        .filter(e => e instanceof HTMLTableCellElement) as HTMLTableCellElement[])
        .filter(c => c.cellIndex === column);

    let numbers = cells
        .filter(c => c.innerText.trim() !== "")
        .map(c => {
            try {
                let trimmed_string = c.innerText
                    .split("(")[1]
                    .split(")")[0];
                return parseFloat(trimmed_string);
            } catch (_) {
                return -1;
            }
        })
        .filter(n => n !== -1);

    return numbers;
}
