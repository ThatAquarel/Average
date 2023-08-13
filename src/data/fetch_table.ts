import { parsePercentage, SELECTOR_TABLE_ROOT } from "./parse";
import { arithmeticMean } from "../math/arithmetic_mean";

type TableData = {
    attending: string;
    competency_weight: number;
    competency_personal_grade: number;
    competency_averaged_grade: number;
    categories_personal_grades: number[];
    categories_averaged_grades: number[];
};

export function fetchTable(): TableData[] {
    let tables = Array.from(document.querySelectorAll(SELECTOR_TABLE_ROOT));
    let table_data: TableData[] = [];

    tables.forEach((table) => {
        let rows = table.children;
    
        let attending = "";
        let competency_weight = -1;
    
        let categories_personal_grades: number[] = [];
        let categories_averaged_grades: number[] = [];
    
        let category = "";
        let category_weight_sum = 0;
        let category_personal_sum = 0;
        let category_averaged_sum = 0;
    
        const cumulateGrades = () => {
            categories_personal_grades.push(category_personal_sum / category_weight_sum);
            categories_averaged_grades.push(category_averaged_sum / category_weight_sum);
    
            category_weight_sum = 0;
            category_personal_sum = 0;
            category_averaged_sum = 0;
        };

        const getChild = (e: HTMLElement, i:number) => {
            return e.children[i] as HTMLElement;
        }
    
        for (let i = 0; i < rows.length; i++) {
            // skip header rows
            let row = rows[i] as HTMLElement;
            if (row.className == "Header") {
                if (i === 0) {
                    attending = row.innerText;
                }
    
                continue;
            }
    
            // column 0: parse a one-time competency weight
            if (competency_weight === -1) {
                try {
                    competency_weight = parsePercentage(getChild(row, 0).innerText);
                } catch {
                    if (i === 2) {
                        console.log("Parsed table does not contain a competency_weight.");
                    }
                }
            }
    
            // column 1: assign row grades to a category
            let next_category = getChild(row, 1).innerText.trim();
            if (next_category) {
                if (category) {
                    // cumulate weighted grades within a category
                    cumulateGrades();
                }
    
                category = next_category;
            }
    
            // column 3, 7, 8: weight and grade within current category
            try {
                let row_weight = parseFloat(getChild(row, 3).innerText);
                let row_personal_grade = parsePercentage(getChild(row, 7).innerText);
                let row_averaged_grade = parsePercentage(getChild(row, 8).innerText);
    
                category_personal_sum += row_weight * row_personal_grade;
                category_averaged_sum += row_weight * row_averaged_grade;
                category_weight_sum += row_weight;
            } catch {
                continue;
            }
        }
    
        // cumulate weighted grades after table
        cumulateGrades();
    
        table_data.push({
            "attending": attending,
            "competency_weight": competency_weight,
            "competency_personal_grade": arithmeticMean(categories_personal_grades),
            "competency_averaged_grade": arithmeticMean(categories_averaged_grades),
            "categories_personal_grades": categories_personal_grades,
            "categories_averaged_grades": categories_averaged_grades
        });
    });

    return table_data;
}
