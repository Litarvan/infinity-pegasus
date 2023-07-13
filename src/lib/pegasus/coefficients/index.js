import { SEMESTER_FILTER, YEAR_FILTER } from '../documents';

const S5_2025 = Symbol('S5 (2025)');
const S5_APP_ING_2025 = Symbol('S5 [APP ING] (2025)');
const S5_APP_EXP_2025 = Symbol('S5 [APP EXP] (2025)');
const S6_2025 = Symbol('S6 (2025)');
const S6_APP_ING_2025 = Symbol('S6 [APP ING] (2025)');
const S6_APP_EXP_2025 = Symbol('S6 [APP EXP] (2025)');
const S8_GISTRE_2024 = Symbol('S8 [GISTRE] (2024)');

const coefficients = {
    [S5_2025]: (await import('./s5_2025')).default,
    [S5_APP_ING_2025]: (await import('./s5_app_ing_2025')).default,
    [S5_APP_EXP_2025]: (await import('./s5_app_exp_2025')).default,
    [S6_2025]: (await import('./s6_2025')).default,
    [S6_APP_ING_2025]: (await import('./s6_app_ing_2025')).default,
    [S6_APP_EXP_2025]: (await import('./s6_app_exp_2025')).default,
    [S8_GISTRE_2024]: (await import('./s8_gistre_2024')).default,
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
            let totalSubjectClassCoefficient = 0;
            for (const mark of subject.marks) {
                let coefficient = 1;
                for (const [regex, value] of Object.entries(subjectCoefficients)) {
                    if (new RegExp(regex).test(regex.match(/^[0-9]+$/g) ? mark.id : mark.name)) {
                        coefficient = value;
                        break;
                    }
                }

                mark.coefficient = coefficient;

                // 0.01 means this is a justified absence
                if (mark.value !== 0.01) {
                    totalSubjectMarks += mark.value * coefficient;
                    totalSubjectCoefficient += coefficient;
                }

                totalSubjectClassAverages += mark.classAverage * coefficient;
                totalSubjectClassCoefficient += coefficient;
            }

            subject.coefficient = subjectCoefficients._subject || 1;
            subject.average = filterNaN(totalSubjectMarks / totalSubjectCoefficient);
            subject.classAverage = filterNaN(totalSubjectClassAverages / totalSubjectClassCoefficient);

            if (subject.average != null) {
                totalModuleMarks += subject.average * subject.coefficient;
                totalModuleCoefficient += subject.coefficient;
            }
            if (subject.classAverage != null) {
                totalModuleClassAverages += subject.classAverage * subject.coefficient;
                totalModuleClassCoefficient += subject.coefficient;
            }
        }

        module.average = filterNaN(totalModuleMarks / totalModuleCoefficient);
        module.classAverage = filterNaN(totalModuleClassAverages / totalModuleClassCoefficient);

        if (module.average !== null) {
            totalMarks += module.average * module.credits;
            totalCredits += module.credits;
        }
        if (module.classAverage != null) {
            totalClassMarks += module.classAverage * module.credits;
            totalClassCredits += module.credits;
        }
    }

    return {
        average: totalMarks / totalCredits,
        classAverage: totalClassMarks / totalClassCredits
    };
}

export function normalizeCoefficients(marks)
{
    for (const module of marks) {
        const minCoefficient = Math.min(...module.subjects.map(s => s.coefficient));
        for (const subject of module.subjects) {
            const total = subject.marks.reduce((total, mark) => total + mark.coefficient, 0);

            for (const mark of subject.marks) {
                mark.coefficient /= total;
            }

            subject.coefficient /= minCoefficient;
        }
    }
}

function getCoefficients(filters)
{
    const year = filters[YEAR_FILTER];
    const semester = filters[SEMESTER_FILTER].split(' ')[0];

    switch (year) {
        case '2022':
            switch (semester) {
                case 'SI5':
                    return coefficients[S5_2025];
                case 'SI6':
                    return coefficients[S6_2025];
                case 'SA5':
                    return coefficients[S5_APP_ING_2025];
                case 'SX5':
                    return coefficients[S5_APP_EXP_2025];
                case 'SA6':
                    return coefficients[S6_APP_ING_2025];
                case 'SX6':
                    return coefficients[S6_APP_EXP_2025];
                case 'SI8':
                    return coefficients[S8_GISTRE_2024];
            }
            break;
    }
}

function filterNaN(value)
{
    return !isNaN(value) ? value : null;
}
