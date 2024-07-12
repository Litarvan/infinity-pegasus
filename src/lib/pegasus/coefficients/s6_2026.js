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
    II2:{
        IDVOC: {
            _subject: 1
        },
        TI:{
            _subject: 1,
            'EXAMEN': .3,
            'PROJET': .35,
            'Sout.*': .35
        },
        SEDE:{
            _subject: 1
        },
        NET2:{
            _subject: 1,
            '.*': .5,
        }
    },
    APR2: {
        CPP: {
            _subject: 1,
            'QCM CPP': .2,
            'Rush CPP': .4,
            'Exo CPP': .4
        },
        JAVA: {
            _subject: 1
        },
        JS: {
            _subject: 1
        },
        JWS: {
            _subject: 1
        },
        PING: {
            _subject: 2
        },
        TC: {
            _subject: 3,
            'CMP': 0.3,
            'TIGER': 0.7
        }
    },
    MAT2: {
        PBS1: {
            _subject: 3,
            'TP': 0.25,
            '.* 1': 0.4 * 0.65,
            '.* 2': 0.6 * 0.65,
            'EFs': 0.1
        },
        CHIFR: {
            _subject: 1,
            '.*TP.*': 0.1,
            'EFs': 0.1,
            'Examen.*': 0.35
        },
        CAMA: {
            _subject: 2,
            '.*': 1
        }
    },
    IF2: {
        IAML: {
            _subject: 2,
            'Examen': 1 / 3,
            'Projet': 2 / 3
        },
        TYLA: {
            _subject: 1,
            'EXAMEN': 0.25,
            'TPs': 0.25,
            '.*': 0.5
        },
        THEG: {
            _subject: 3
        },
        MOD2: {
            _subject: 2
        }
    },
    IRT1: {
        ERO1: {
            _subject: 2,
            '.*Examen': 0.25,
            '.*': 0.75
        },
        TIFT: {
            _subject: 1
        },
        TIFIR: {
            _subject: 1
        }
    },
    MSH2: {
        'ANGL-1_S6':{
            'Anglais-1 .*': .3,
            'QCM Moodle': .4,
            'Suivi/oral': .3
        },
        LV_SI6:{
            _subject:1
        },
        ODP2CO:{
            _subject:1
        },
        CPT:{
            _subject:1
        },
        GEPRO:{
            _subject:1
        }
    },
    CCE2: {
        M_SST_SI6: {
            _subject: 1
        },
        REPP: {
            _subject: 1
        },
        MARK: {
            _subject: 1,
            'Projet': 0.7,
            '.*': 0.3
        },
        RSE: {
            _subject: 1,
        }
    }
};
