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
  GLPS4: {
    X_BAGD2: {
      _subject: 1.5,
    },
    X_CLARC: {
      _subject: 2,
    },
    X_DEVOPS: {
      _subject: 1,
    },
    x_DOTN: {
      _subject: 1.5,
    }
  },
  PWM2: {
    X_GAMJA: {
      _subject: 3,
    },
    X_NDJS8: {
      _subject: 2.5,
    },
    X_SEO: {
      _subject: 1.5,
    }
  },
  MCE4: {
    'X_ANGL-4': {
      _subject: 1.5,
    },
    X_M_SST: {
      _subject: 1.5,
    }
  },
  AEE4: {
    X_EAE4: {
      _subject: 10,
    }
  }
};
