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
    'Sciences de base (Mathématiques)': {
        PBS2: {
            'PBS2_DM.*': 0.4, // DM
            'PBS2_PARTIEL_.*': 0.6, // Partiel stats
        },
    },
    'Architectures et Systèmes': {
        ELN: {
            _subject: 2.5
        },
        GPU: {
            _subject: 1
        },
        TRE: {
            _subject: 1.5
        },
    },
    'Interopérabilité': {
        PRO: {
            _subject: 0.5
        },
        CAN: {
            _subject: 0.5
        },
        IOT: {
            _subject: 1
        },
    },
    'Robustesse': {
        SUR: {
            _subject: 2.5
        },
        SEC: {
            _subject: 2.5
        },
    },
    'Projets': {
        PFEE: {
            _subject: 1
        },
        JROB: {
            _subject: 1
        }
    },
    'DATA & IADATA & AI': {
        IAE: {
            _subject: 2
        },
        CLO: {
            _subject: 2
        },
        ICL: {
            _subject: 2
        }
    },
    'Management et Connaissances pour l\'Entreprisereprise': {
        BUGA: {
            _subject: 1
        },
        DBRE: {
            _subject: 0.5
        },
        GRS_S8: {
            _subject: 1
        },
        M_CRIN: {
            _subject: 0.5
        },
        PFE_S8: {
            _subject: 2.5
        },
    }
};
