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
    '[SG8]-Sciences de base (Mathématiques)': {
        PBS2: {
            /*
             *  QCMs => 40% de la note
             *  Exams: 60% de la note
             */
            'PBS2_DM.*': 0.4, // DM
            'PBS2_PARTIEL_.*': 0.6, // Partiel stats
        },
        // TODO: ERO2: QCM 1 et 2 -> 40% de la note, 60% pour le projet
    },
    'Culture de l\'Ingénieur & Electronique': {
        AUT1: {
            _subject: 1,
        },
        AUT2: {
            _subject: 1,
        },
        ELEC: {
            _subject: 2,
        },
    },
    'Architecture et Noyaux Systèmes': {
        IOTG: {
            _subject: 1
        },
        DRIL: {
            _subject: 1
        },
        HTS: {
            _subject: 3
        },
    },
    'Architecture des Systèmes Embarqués Temps Réel': {
        APAS: { // TODO: Check id
            _subject: 1
        },
        ARINC: { // TODO: Check id
            _subject: 2
        },
        VHDL: {
            _subject: 2
        },
    },
    'Programmation Systèmes': {
        ARM_SI8: {
            _subject: 1
        },
        TELE_S8: {
            _subject: 1
        },
        PFE_GISTRE8: { // TODO: Check id
            _subject: 2
        },
        IOT1: { // TODO: Check id
            _subject: 2
        },
    }
};
