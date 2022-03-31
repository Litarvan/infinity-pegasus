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
    'Harmonisation mathématiques': {
        APXF: {
            _subject: 1.2
        },
        FPVA: {
            _subject: 0.6
        },
        FOLO: {
            _subject: 0.6
        },
        INT: {
            _subject: 0.6
        }
    },
    MAT1: {
        CPXA: {
            _subject: 2
        }
    },
    IF1: {
        MOB1: {
            _subject: 1,
            'Modélisation objet \\[1] CC3': 0.34,
            '.*': 0.33
        },
        PFON: {
            _subject: 1,
            'Programmation fonctionnelle CC3': 0.34,
            '.*': 0.33
        },
        THL: {
            _subject: 2
        }
    },
    APR1: {
        CNIX: {
            _subject: 3.4
        },
        'A-SQL': {
            _subject: 1.65
        },
        PPEX: {
            _subject: 1.65
        },
        P_42SH: {
            _subject: 3.3
        }
    },
    MSH1: {
        COMM1: {
            _subject: 0.6
        },
        ODP1: {
            _subject: 1.2
        },
        EQIT: {
            _subject: 0.6
        },
        LV: {
            _subject: 0.6
        }
    },
    CCE1: {
        DDPP: {
            0: 0.45,
            1: 0.3
        },
        RSE: {
            'Responsabilité sociétale des entreprises TD': 0.3,
            'Responsabilité sociétale des entreprises': 0.45
        }
    }
};
