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
  GLPS3: {
    X_SOCRA: {
      _subject: 1.5,
    },
    X_PPEX3: {
      _subject: 1.5,
    },
    X_BAGD1: {
      _subject: 2,
    },
    X_JEE: {
      _subject: 2,
    }
  },
  PWM1: {
    X_WEB: {
      _subject: 3,
    },
    X_P_WEB: {
      _subject: 2,
    },
    X_IJST: {
      _subject: 1,
    },
    X_UXUI: {
      _subject: 2,
    },
    X_IANDO: {
      _subject: 2
    }
  },
  MCE3: {
    'X_ANGL-3': {
      _subject: 1.5,
    },
    X_GPROAA: {
      _subject: 1.5,
    },
    X_DRTR: {
      _subject: 1,
    }
  },
  AEE3: {
    X_EAE3: {
      _subject: 9
    }
  }
};
