// ----------------------
// READ ME!
// ----------------------
//
// Both ID and names can be used for both subjects and marks (marks ID are their order in the list)
// Subjects or marks with a coefficient of 1 (or equivalent) can be omitted
// Coefficient does not have to sum up to 1, since the sum of the coefficients will be used
// No need to specify module coefficients, since they are already retrieved from the PDF
// Also, regex are supported for marks name :^) (which means '[' must be escaped !)

// TODO: This is based on the temporary syllabus, things may have to be fixed throughout the semester

export default {
    'Harmonisation informatique': {
        HDWR: {
            // 2/3 Exam moodle
            // 1/3 Exercices TP
        },
        MPC: {
            // 30% QCM
            // 70% Exercices
        },
        PROG: {
            // 40% MyFamilyTree
            // 30% Exercices
            // 30% Workshop
        },
        STD: {
            // TODO: Is this correct?
            _subject: 2,
            '.* CC[1-2]': 0.4 / 2,
            '.*': 0.6
        }
    },
    'Harmonisation mathématiques': {
        APXF: {
            _subject: 2,

            // TODO: Is this correct?
            '.* EF': 2/20,
            '.* DM': 6/20,
            '.*': 12/20
        },
        FPVA: {
            '.* CC1': 1/2 * 0.3,
            '.* CC2(.*)?': 0.5 * 0.7,
            '.* CC3': 1/2 * 0.3,
            '.*': 0.5 * 0.7
        },
        FOLO: {
            '.* DM': 0.25,
            '.*': 0.75
        },
        INT: {
            '.* CC1': 0.4 * 0.8,
            '.* CC2': 0.6 * 0.8,
            '.*': 0.2
        }
    },
    MAT1: {
        CPXA: {
            _subject: 2,
            '.* CC[1-2]': 1/3 * 0.5,
            '.* Examen Final': 1/3 * 0.5,
            '.* Exo': 0.5
        },
        MASI: {
            // TP 19%
            // EF 90%
        },
        STA: {
            // 20% Evals formatives (plusieurs notes en pratique, même coeff)
            // 80% (40% Eval sommative 1, 60% Eval sommative 2)
        }
    },
    IF1: {
        THL: {
            _subject: 2,
            '.* CC[1-2]': 0.25,
            '.* Examen Final': 0.5
            // 50% Exam final
            // 50% Total des 2 exams CC (= 2 notes)
        }
    },
    II1: {
        ASM: {
            // 25% QCM Moodle
            // 75% Exercices
        },
        NET1: {
            'Réseaux': 0.3,
            '.*': 0.7
            // 70% TP
            // 30% QCM
        },
        SYS1: {
            '.* CC[1-2]': 1/2 * 0.5,
            '.*': 0.5
            // 67% TP
            // 33% QCM
        }

    },
    APR1: {
        CNIX: {
            _subject: 2,
            '.* 1': 0.3 * 0.4,
            '.* 2': 0.7 * 0.4,
            '.*': 0.6
        },
        P_42SH: {
            _subject: 2
        }
    },
    MSH1: {
        ODP1: {
            _subject: 2
            // 60% TD notés
            // 40% Exam Moodle
        },
        EQIT: {
            // 40% QCM
            // 50% Essai/mémoire
            // 10% CC
        },
        LV: {
            // Anglais:
            // 30% Exam 1
            // 40% Exam 2
            // 30% CC

            // Rosetta = une note
        }
    },
    CCE1: {
        DDPP: {
            // 60% Etude de cas
            // 40% Exam
        },
        RSE: {
            // 40% CC,
            // 60% Exam
        }
    }
};
