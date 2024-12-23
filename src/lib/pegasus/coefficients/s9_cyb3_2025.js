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
  SIS5: {
    A_CRYP3: {
      _subject: 2,
    },
    A_CLARC: {
      _subject: 1,
    },
    A_WSEC_2: {
      _subject: 3,
    },
    A_PYSEC: {
      _subject: 2,
    },
    A_CLOS: {
      _subject: 1,
    },
    A_CYMP: {
      _subject: 1,
    },
    "A_SYS 3": {
      _subject: 3,
    },
    A_THiNT: {
      _subject: 1,
    }
  },
  MCE5: {
    "A_RSE S9": {
      _subject: 1,
    },
    A_SPNE: {
      _subject: 1.5,
    },
    "A_ANGL-5": {
      _subject: 1.5,
    }
  },
  AEE5: {
    A_EAE5: {
      _subject: 12,
    }
  }
};
