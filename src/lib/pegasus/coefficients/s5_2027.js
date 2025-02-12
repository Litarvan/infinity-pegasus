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
            // TODO fix the order when the grades are published
            0: 0.8,   // TPs
            1: 0.2    // MCQs 
        },
        ASM: {
            // TODO fix the name when the grades are published
            'QCM': 0.3,
        }
    },
    Concevoir: {
        ITSI: {
            // TODO fix the names when the grades are published
            'DM': 0.3,
            'ES': 0.7
        },
        CPXA: {
            _subject: 2,
            'Examen 1': 0.6 / 3,
            'Exam 2': 0.6 / 3,
            // TODO fix the names when the grades are published
            'Examen 3': 0.6 / 3,
            'DM': 0.4
        },
        STA: {
            // TODO fix the names when the grades are published
            'EF': 0.1,
            'TP': 0.4,
            'ES': 0.5
        },
        THL: {
            _subject: 2
        }
    },
    Piloter: {
        COM1: {
            // TODO fix the names when the grades are published
            'Note PPT écrit': 0.4,
            'Note 42_SH oral': 0.4,
            'participation aux TD': 0.2
        },
        DCT: {
            _subject: 2,
            'TD1': 0.8 / 3,
            'TD2': 0.8 / 3,
            'TD3': 0.8 / 3,
            // TODO fix the name when the grades are published
            'Quiz': 0.2
        }
    },
    Agir: {
        'ANGL-1_S5': {
            // TODO fix the names when the grades are published
            'Epreuve écrite en cours': 0.4,
            'Epreuve écrite moodle': 0.4,
            'Présence en cours': 0.2
        },
        ETHIX: {
            // TODO fix the names when the grades are published
            'TD1': 0.3,
            'TD2': 0.3,
            'Evaluation finale': 0.4,
        },
        EQIT: {
            _subject: 0.5,
            // TODO fix the names when the grades are published
            'QCM': 0.8,
            'CC': 0.2
        }
    },
    '42SH': {
        P_42SH: {
            // TODO fix the names when the grades are published
            'Projet': 0.8,
            'Coaching': 0.2
        }
    }
};
