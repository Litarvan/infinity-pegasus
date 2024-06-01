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
  MAIF4: {
    A_A_CRYP1: {
      _subject: 2,
    },
    A_PROC: {
      _subject: 1,
    },
    A_TEC1: {
      _subject: 1,
    }
  },
  GLPS4: {
    A_IDVOC: {
      _subject: 1,
    },
    A_A_CMAN: {
      _subject: 1,
    },
    A_WSEC1: {
      _subject: 2,
    },
    A_ARS2: {
      _subject: 1,
    }
  },
  SIS4: {
    A_SWARD: {
      _subject: 1,
    },
    A_REVE: {
      _subject: 1.5,
    },
    "A_TATT S8": {
      _subject: 1.5,
    },
    A_FOR_A: {
      _subject: 1,
    },
    A_AMAL: {
      _subject: 1,
    }
  },
  MCE4: {
    'A_ANGL-4': {
      _subject: 1,
    },
    A_APOLS: {
      _subject: 1,
    },
    A_M_SST: {
      _subject: 1,
    }
  },
  MININT: {
    A_NETT: {
      _subject: 1,
    },
    A_IOT: {
      _subject: 1,
    },
    A_FINT: {
      _subject: 1,
    },
    "A-IA": {
      _subject: 1,
    }
  },
  AEE4: {
    A_EAE4: {
      _subject: 8
    }
  }
};
