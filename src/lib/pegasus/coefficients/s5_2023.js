// ----------------------
// READ ME!
// ----------------------
//
// Both ID and names can be used for both subjects and marks (marks ID are their order in the list)
// Subjects or marks with a coefficient of 1 (or equivalent) can be omitted
// Coefficient does not have to sum up to 1, since the sum of the coefficients will be used
// No need to specify module coefficients, since they are already retrieved from the PDF
// Also, regex are supported for marks name :^) (which means '[' must be escaped !)

export default {
    MAIF1: {
        ALGO: {
            _subject: 2
        }
    },
    GLSR1: {
        P_42SH: {
            _subject: 2,
            'Projet 42 SH': 1.5,
            'Piscine Shell': 0.5
        },
        'A-SQL': {
            _subject: 2
        },
        'CNIX': {
            _subject: 3
        },
        'PPEX': {
            _subject: 3,
            'Python pour tous': 0.5,
            'Programmation Pratique (Examens et Mini projets)': 2.5
        }
    },
    MCE1: {
        RE_S1: {
            _subject: 2
        }
    },
    'Parcours Thématique S5 avancés': {
        GIRE: {
            _subject: 2
        }
    }
};
