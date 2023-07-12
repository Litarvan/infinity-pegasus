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
    APR2: {
        CPP: {
            _subject: 1/9, // TODO: Le syllabus marque 1/19, probablement une erreur
            'QCM CPP': .2,
            'Rush CPP': .4,
            'Exo CPP': .4
        },
        JAVA: {
            _subject: 1/9
        },
        JS: {
            _subject: 1/9
        },
        TC: {
            _subject: 3/9,
            "Projet TIGER QCM": 1/5,
            "Projet TIGER": 4/5
        },
        JWS: {
            _subject: 1/9
        },
        PING: {
            _subject: 2/9
        }
    },
    MAT2: {
        PBS1: {
            _subject: 3/6,
            '.* Finale': 3 / 5 * 6 / 8,
            '.* CC[1-2]': 1 / 5 * 6 / 8,
            'Probabilités et statistiques 1': 1 / 5 * 6 / 8,
            '.*': 2 / 8
        },
        CHIFR: {
            _subject: 1/6,
            '*_TP*': 0.1,
            '*_DM*': 0.1,
            '*_ES*': 0.3,
            '.*': .3
        },
        CAMA: {
            _subject: 1/3,
            '.* CC1': 1/2,
            '.*': 1/4
        }
    },
    IF2: {
        LOFO: {
            _subject: 2/8,
            '.* Final': 2 / 3,
            '.*': 1 / 3
        },
        TYLA: {
            _subject: 1/8,
            '*_EXAM': 0.4,
            '*_DM': 0.6
        },
        THEG: {
            _subject: 3/8
        },
        MOB2: {
            _subject: 2/8
        }
    },
    IRT1: {
        ERO1: {
            _subject: 2/4,
            // TODO: Tentative de ma part de deviner
            '.*Soutenance.*': 0.25,
            '.*': 0.75
        },
        TIFT: {
            _subject: 1/4
        },
        TIFIR: {
            _subject: 1/4
        }
    },
    MSH2: {
        'ANGL-1_S6': {
            'Anglais-1 .*': .3,
            'QCM Moodle': .4,
            'Suivi/oral': .3
        },
        CPT: {
            // TODO: TBD
        },
        ETHIX: {
            // TODO: 80% Travail de groupe
            // TODO: 20% Participation
        },
    },
    CCE2: {
        M_SST_SI6: {
            _subject: 1/4
        },
        REPP: {
            _subject: 1/4,
            // TODO: Rapport: 90%
            // TODO: Participation: 10%
        },
        MARK: {
            _subject: 1/4 // TODO: Le syllabus marque 1/5, probablement une erreur
        },
        GEPRO: {
            _subject: 1/4,
            // TODO: 80% QCM
            // TODO: 20% Présence
        },

    }
};
