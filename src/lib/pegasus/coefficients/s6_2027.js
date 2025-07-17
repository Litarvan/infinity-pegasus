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
    'ERO1 ': {  // SAE module names have a whitespace for some reason
        CONC_ERO1: {
            'Examen': 0.25,
            'Projet': 0.75
        }
    },
    Produire: {
        TI: {
            'Examen': 0.3,
            'Nano': 0.35,
            'PING': 0.35
        }
    },
    Concevoir: {
        IAML: {
            'Examen': 0.3,
            'Projet': 0.7
        },
        THEG: {
            _subject: 2
        },
        TYLA: {
            'Exercices': 0.4,
            'Projet': 0.4,
            'Examen': 0.2
        },
        PBS1: {
            'Examen 1': 0.65 * 0.4,
            'Examen 2': 0.65 * 0.6,
            'EFs': 0.1,
            'TPs': 0.25,
        },
        PVCM: {
            _subject: 2
        }
    },
    G: {  // Gérer module is badly encoded and has 'G' as identifier
        CHIFR: {
            _subject: 1.5,
            'Exam \\d': 0.9 / 2,
            'EFs': 0.1,
        },
        NET2: {
            'TPs': 0.7,
            'Examen': 0.3
        }
    },
    Formaliser: {
        MARK: {
            'Projet': 0.7,
            'Examen': 0.3
        }
    }
};
