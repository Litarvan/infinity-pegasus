// ----------------------
// READ ME!
// ----------------------
//
// Both ID and names can be used for both subjects and marks (marks ID are their order in the list)
// Subjects or marks with a coefficient of 1 (or equivalent) can be omitted
// Coefficient does not have to sum up to 1, since the sum of the coefficients will be used
// No need to specify module coefficients, since they are already retrieved from the PDF
// Also, regex are supported for marks name :^) (which means '[' must be escaped !)

// TODO: This was imported from past year, it will need to be updated when the syllabus is released

export default {
    'Harmonisation informatique': {
        // TODO: Update with a grade report which includes this UE
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
            'APXF_CC1': 0.4 * 0.8,   // ES1
            'APXF_EF': 0.2,         // EF
            'APXF_CC2': 0.6 * 0.8,   // ES2
        },
        FPVA: {
            // TODO: Check the order of the grades when they are published
            _subject: 1,
            0: 0.5 * 0.7,   // ES1
            1: 0.5 * 0.7,   // ES2
            2: 0.3,         // EF
        },
        FOLO: {
            _subject: 1,
            '.*': 0.5
        },
        INT: {
            _subject: 1,
            0: 0.4 * 0.8,   // ES1
            1: 0.2,         // EF
            2: 0.6 * 0.8,   // ES2
        }
    },
    MAT1: {
        CPXA: {
            _subject: 2,
            '.* [1-3]': 0.33,
            'EF': 1
        },
        MASI: {
            _subject: 1,
            '.*DM': 0.25,
            '.*EXAM': 0.75
        },
        STA: {
            _subject: 1,
            '.*EXAM 1': 0.24,
            'EF': 0.4,
            '.*EXAMEN 2': 0.36,
        }
    },
    IF1: {
        THL: {
            _subject: 2,
            '.*': 1
        },
        MOB1: {
            _subject: 1,
            '.*': 1
        },
        PFON: {
            _subject: 1,
            '.*': 1
        }
    },
    II1: {
        ASM: {
            _subject: 1,
            'QCM': 0.13,
            'EXAM [1-2]': 0.435
        },
        NET1: {
            _subject: 1,
            'TP.*': 0.7,
            'EXAM.*': 0.3
            // TP 0.7
            // QCM 0.3
        },
        SYS1: {
            _subject: 1,
            '.*': 1
        }

    },
    APR1: {
        CNIX: {
            _subject: 2,
            'GRAPH': 7,             // Graph Piscine
            'EXAM 1': 3,            // Exam 1
            'NANO PROJET': 2,       // EvalExpr
            'PICO PROJET': 1,       // TinyPrintf
            'EXAM 2': 7,            // Exam 2
        },
        P_42SH: {
            // TODO: Update when the grades are published
            _subject: 1,
        },
        A_SQL: {
            // TODO: Update when the grades are published
            _subject: 1,
        },
        PPEX: {
            _subject: 2,
            '.*': 1
        }
    },
    MSH1: {
        // TODO: Update when the grades are published
        ODP1: {
            _subject: 2,
            '.*': 1
        },
        EQIT: {
            _subject: 1,
            // 40% QCM
            // 50% Essai/mémoire
            // 10% CC
        },
        LV: {
            _subject: 1,
            // Anglais:
            // 30% Exam 1
            // 40% Exam 2
            // 30% CC

            // Rosetta = une note
        },
        COMM1: {
            _subject: 1,
        }
    },
    CCE1: {
        // TODO: Update when the grades are published
        DDPP: {
            _subject: 1
            // 60% Etude de cas
            // 40% Exam
        },
        RSE: {
            // 40% CC,
            // 60% Exam
        },
        DRG1_S5: {
            _subject: 1
        },
        DENT: {

        },
        EQIT: {
            _subject: 1,
            'PARTICI.*': 0.15,
            'EXAM': 0.6
        }
    }
};
