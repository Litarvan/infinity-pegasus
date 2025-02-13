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
    // même id pour harmo info et maths
    Harmonisation: {
        APXF: {
            _subject: 2,
            'Examen 1': 0.8 * 0.4,          // ES1
            'Examen 2': 0.8 * 0.6,          // ES2
            'Evaluations formatives': 0.2   // EF
        },
        FPVA: {
            'Examen [1-2]': 0.7 * 0.5,      // ES
            'Evaluations formatives': 0.3   // EF
        },
        FOLO: {
            'Midterm': 0.15,
            'Examen final': 0.7,
            'DM': 0.15,
        },
        INTG: {
            'Examen 1': 0.8 * 0.4,          // ES1
            'Examen 2': 0.8 * 0.6,          // ES2
            'Evaluations formatives': 0.2   // EF
        }
        // Ajouter ici les coefs d'harmo info
    },
    Produire: {
        'A-SQL': {
            'Atelier': 0.45,
            'QCM': 0.10,
            'Rush': 0.45
        },
        CNIX: {
            _subject: 3,
            // APPING 2,5 ?
            '.*': 1
        },
        NET1: {
            _subject: 1.5,
            'Exam': 0.2,      // QCM
            '.*': 0.8 / 4     // TPs
        },
        ASM: {
            'QCM': 0.3,
            'Exam 1': 1,
            '.*': 1.3     // I don't know for sure the name of the Exam 2
        }
    },
    Concevoir: {
        CPXA: {
            _subject: 2,
            'Exam.*': 0.6 / 3,
            'Exercices': 0.4
        },
        STA: {
            'EFs': 0.1,
            'TPs': 0.4,
            'Examen': 0.5
        },
        THL: {
            _subject: 2
        }
    },
    Piloter: {
        COM1: {
            'TD': 0.4,
            'Coaching 42': 0.4,
            'Presence': 0.2
        },
        DCT: {
            _subject: 2,
            'Quizz': 0.2,
            '.*': 0.8 / 6
        }
    },
    Agir: {
        // 'ANGL-1_S5': {
        //     // TODO fix the names when the grades are published
        //     'Epreuve écrite en cours': 0.4,
        //     'Epreuve écrite moodle': 0.4,
        //     'Présence en cours': 0.2
        // },
        ETHIX: {
            'TD1': 0.3,
            'TD2': 0.3,
            'Exam': 0.4,
        },
        EQIT: {
            _subject: 0.5,
            'Exam 1': 0.8,
            'Participation': 0.2
        }
    },
};
