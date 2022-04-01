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
    MAIF2: {
        CMP1: {
            _subject: 0.5
        },
        CMP2: {
            _subject: 0.5
        },
        LOFO: {
            _subject: 2
        },
        THEG: {
            _subject: 2
        },
        COCO: {
            _subject: 0.5
        },
        FMSI: {
            _subject: 0.5
        }
    },
    GLSR2: {
        A_AC: {
            _subject: 1.5
        },
        A_JAVA: {
            _subject: 1.5
        },
        IDVO: {
            _subject: 0.5
        },
        P_ING: {
            _subject: 2.5
        },
        P_JWS: {
            _subject: 0.5
        },
        JANGU: {
            _subject: 0.5
        },
        SOCRA: {
            _subject: 0.5
        },
        SPIDER: {
            _subject: 2.5,
            'Projet SPIDER': 2,
            'Projet TIGROU': 0.25,
            'Projet SPIDOU': 0.25
        }
    },
    MCE2: {
        ENAC2: {
            _subject: 0.5
        },
        GPRO0: {
            _subject: 0.5
        },
        M_ANSSI: {
            _subject: 0.5
        },
        M_ORA: {
            _subject: 0.5
        }
    }
};
