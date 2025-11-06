import { SEMESTER_FILTER, YEAR_FILTER } from '../documents';

const S5_2027 = Symbol('S5 (2027)');
const S5_2026 = Symbol('S5 (2026)');
const S5_APP_ING_2026 = Symbol('S5 [APP ING] (2026)');
const S6_2027 = Symbol('S6 (2027)');
const S6_2026 = Symbol('S6 (2026)');
const S6_APP_ING_2026 = Symbol('S6 [APP ING] (2026)');
const S7_APP_ING_CYB2_2026 = Symbol('S7 [CYB2] (2026)');
const S7_APP_ING_CYB2_2025 = Symbol('S7 [CYB2] (2025)');
const S7_APP_ING_DEV2_2025 = Symbol('S7 [DEV2] (2025)');
const S7_APP_ING_EXP2_2025 = Symbol('S7 [EXP2] (2025)');
const S8_APP_ING_CYB2_2025 = Symbol('S8 [CYB2] (2025)');
const S8_APP_ING_DEV2_2025 = Symbol('S8 [DEV2] (2025)');
const S8_APP_ING_EXP2_2025 = Symbol('S8 [EXP2] (2025)');
const S9_APP_ING_CYB3_2025 = Symbol('S9 [CYB3] (2025)');
const S8_GISTRE_2025 = Symbol('S8 [GISTRE] (2025)');
const S8_SSIE_2025 = Symbol('S8 [SSIE] (2025)');
const S8_SCIA_2026 = Symbol('S8 [SCIA] (2026)');

const coefficients = {
    [S5_2027]: (await import('./s5_2027')).default,
    [S5_2026]: (await import('./s5_2026')).default,
    [S5_APP_ING_2026]: (await import('./s5_app_ing_2026')).default,
    [S6_2027]: (await import('./s6_2027')).default,
    [S6_2026]: (await import('./s6_2026')).default,
    [S6_APP_ING_2026]: (await import('./s6_app_ing_2026')).default,
    [S8_GISTRE_2025]: (await import('./s8_gistre_2025.js')).default,
    [S7_APP_ING_CYB2_2026]: (await import('./s7_cyb2_2026.js')).default,
    [S7_APP_ING_CYB2_2025]: (await import('./s7_cyb2_2025.js')).default,
    [S7_APP_ING_DEV2_2025]: (await import('./s7_dev2_2025.js')).default,
    [S7_APP_ING_EXP2_2025]: (await import('./s7_exp2_2025.js')).default,
    [S8_APP_ING_CYB2_2025]: (await import('./s8_cyb2_2025.js')).default,
    [S8_APP_ING_DEV2_2025]: (await import('./s8_dev2_2025.js')).default,
    [S8_APP_ING_EXP2_2025]: (await import('./s8_exp2_2025.js')).default,
    [S9_APP_ING_CYB3_2025]: (await import('./s9_cyb3_2025.js')).default,
    [S8_SSIE_2025]: (await import('./s8_ssie_2025.js')).default,
    [S8_SCIA_2026]: (await import('./s8_scia_2026.js')).default,
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
        case '2024':
            switch (semester) {
                case 'SI5':
                    return coefficients[S5_2027];
                case 'SA7':
                    return coefficients[S8_APP_ING_CYB2_2026];
                case 'SI6':
                    return coefficients[S6_2027];
            }
            break;
        case '2023':
            switch (semester) {
                case 'SI5':
                    return coefficients[S5_2026];
                case 'SI6':
                    return coefficients[S6_2026];
                case 'SA5':
                    return coefficients[S5_APP_ING_2026];
                case 'SA6':
                    return coefficients[S6_APP_ING_2026];
                case 'SA7':
                    return coefficients[S7_APP_ING_CYB2_2025];
                case 'SD7':
                    return coefficients[S7_APP_ING_DEV2_2025];
                case 'SX7':
                    return coefficients[S7_APP_ING_EXP2_2025];
                case 'SA8':
                    return coefficients[S8_APP_ING_CYB2_2025];
                case 'SD8':
                    return coefficients[S8_APP_ING_DEV2_2025];
                case 'SX8':
                    return coefficients[S8_APP_ING_EXP2_2025];
                case 'SA9':
                    return coefficients[S9_APP_ING_CYB3_2025];
                case 'SI8GISTRE':
                    return coefficients[S8_GISTRE_2025];
                case 'SI8SSIE':
                    return coefficients[S8_SSIE_2025];
                case 'SI8SCIA':
                    return coefficients[S8_SCIA_2026];
            }
            break;
    }
}

function filterNaN(value)
{
    return !isNaN(value) ? value : null;
}
