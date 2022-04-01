import { SEMESTER_FILTER, YEAR_FILTER } from '../documents';

const S5_2023 = Symbol('S5 (2023)');
const S6_2023 = Symbol('S6 (2023)');
const S7_2023 = Symbol('S7 (2023)');
const S5_2024 = Symbol('S5 (2024)');
const S6_2024 = Symbol('S6 (2024)');

const coefficients = {
    [S5_2024]: (await import('./s5_2024')).default,
    [S6_2024]: (await import('./s6_2024')).default
};

export function computeAverages(filters, marks)
{
    const coefficients = getCoefficients(filters) || {};

    // Code is pretty repetitive, but at least it's clear what's going on.

    let totalMarks = 0;
    let totalClassMarks = 0;
    let totalCredits = 0;
    let totalClassCredits = 0;
    for (const module of marks) {
        const moduleCoefficients = coefficients[module.id] || coefficients[module.name] || {};

        let totalModuleMarks = 0;
        let totalModuleClassAverages = 0;
        let totalModuleCoefficient = 0;
        let totalModuleClassCoefficient = 0;
        for (const subject of module.subjects) {
            const subjectCoefficients = moduleCoefficients[subject.id] || moduleCoefficients[subject.name] || {};

            let totalSubjectMarks = 0;
            let totalSubjectClassAverages = 0;
            let totalSubjectCoefficient = 0;
            for (const mark of subject.marks) {
                let coefficient = 1;
                for (const [regex, value] of Object.entries(subjectCoefficients)) {
                    if (new RegExp(regex).test(regex.match(/^[0-9]+$/g) ? mark.id : mark.name)) {
                        coefficient = value;
                        break;
                    }
                }

                mark.coefficient = coefficient;

                totalSubjectMarks += mark.value * coefficient;
                totalSubjectClassAverages += mark.classAverage * coefficient;
                totalSubjectCoefficient += coefficient;
            }

            for (const mark of subject.marks) {
                mark.coefficient /= totalSubjectCoefficient;
            }

            subject.coefficient = subjectCoefficients._subject || 1;
            subject.average = (totalSubjectMarks / totalSubjectCoefficient) || null;
            subject.classAverage = (totalSubjectClassAverages / totalSubjectCoefficient) || null;

            if (subject.average) {
                totalModuleMarks += subject.average * subject.coefficient;
                totalModuleCoefficient += subject.coefficient;
            }
            if (subject.classAverage) {
                totalModuleClassAverages += subject.classAverage * subject.coefficient;
                totalModuleClassCoefficient += subject.coefficient;
            }
        }

        const minCoefficient = Math.min(...module.subjects.map(s => s.coefficient));
        for (const subject of module.subjects) {
            subject.coefficient /= minCoefficient;
        }

        module.average = (totalModuleMarks / totalModuleCoefficient) || null;
        module.classAverage = (totalModuleClassAverages / totalModuleClassCoefficient) || null;

        if (module.average) {
            totalMarks += module.average * module.credits;
            totalCredits += module.credits;
        }
        if (module.classAverage) {
            totalClassMarks += module.classAverage * module.credits;
            totalClassCredits += module.credits;
        }
    }

    return {
        'Moyenne générale': totalMarks / totalCredits,
        'Moyenne de la promo': totalClassMarks / totalClassCredits,
    };
}

function getCoefficients(filters)
{
    const year = filters[YEAR_FILTER];
    const semester = filters[SEMESTER_FILTER].split(' ')[0];

    switch (year) {
        case '2020':
            switch (semester) {
                case 'SI5':
                    return coefficients[S5_2023];
                case 'SI6':
                    return coefficients[S6_2023];
            }
            break;
        case '2021':
            switch (semester) {
                case 'SI5':
                    return coefficients[S5_2024];
                case 'SI6':
                    return coefficients[S6_2024];
                case 'SI7':
                    return coefficients[S7_2023];
            }
            break;
    }
}
