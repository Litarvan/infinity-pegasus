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
    APR2: {
        CPP: {
            _subject: 1/9, // TODO: Le syllabus marque 1/19, probablement une erreur
            // TODO: QCM: 20% (ça a normalement changé?)
            // TODO: Piscine: 35% (ça a normalement changé?)
            // TODO: Rush: 35%
        },
        JAVA: {
            _subject: 1/9
        },
        JS: {
            _subject: 1/9
        },
        TC: {
            _subject: 3/9,
            // TODO: Projet: 80%
            // TODO: CM: 20%
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
            _subject: 3/6
        },
        CHIFR: {
            _subject: 1/6
        },
        CAMA: {
            _subject: 1/3
        }
    },
    IF2: {
        LOFO: {
            _subject: 2/8,
            '.* CC[1-3]': 1/3 / 3,
            '.*': 2/3
        },
        TYLA: {
            _subject: 1/8,
            // TODO: 30% DM
            // TODO: 70% EXAM
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
        // TODO: TIFT
        // TODO: TIFIR
    },
    MSH2: {
        LV: {
            // TODO: 30% Oral
            // TODO: 40% Écrit
            // TODO: 30% CC/Suivi
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
        MSST: {
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
        GEPRO0: {
            _subject: 1/4,
            // TODO: 80% QCM
            // TODO: 20% Présence
        },

    }
};
