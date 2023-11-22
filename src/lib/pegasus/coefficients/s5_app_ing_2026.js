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
    MAIF1: {
        A_ALSD: {
            _subject: 2.5,
        },
        A_CAMA: {
            _subject: 1.5,
        },
        A_FOLO: {
            _subject: 2.5,
        },
        A_FPVA: {
            _subject: 1.5,
        }
    },
    CCE1: {
        A_GPRO0: {
            _subject: 1.7,
        },
        A_M_ANSSI: {
            _subject: 0.8,
        },
        A_REX1: {
            _subject: 2.5,
        }
    },
    MSH1: {
        A_TEORA1: {
            _subject: 1.8,
        },
        'A_ANGL-1': {
            _subject: 1.6,
        },
        A_DRG1: {
            _subject: 1.6,
        }
    },
    GLSR1: {
        A_CNIX: {
            _subject: 2,
        },
        A_PPEX1: {
            _subject: 1.5,
        },
        A_NET1: {
            _subject: 2,
        },
        A_A_BDD: {
            _subject: 2,
        },
        A_SYS1: {
            _subject: 2.5,
        },
        A_PTON1: {
            _subject: 2,
        }
    }
};
