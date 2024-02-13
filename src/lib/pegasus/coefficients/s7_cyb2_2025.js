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
  MAIF3: {
    A_PROD: {
      _subject: 1.5,
    },
    A_COCO: {
      _subject: 1.5,
    }
  },
  GLPS3: {
    A_CLAN: {
      _subject: 1,
    },
    A_IBMZ1: {
      _subject: 1.5,
    },
    A_PPEX3: {
      _subject: 1,
    },
    ASSE: {
      _subject: 1.5,
    },
    A_P_42SH: {
      _subject: 1,
    }
  },
  SIS3: {
    A_DEVSEC: {
      _subject: 2,
    },
    A_KERN: {
      _subject: 2,
    },
    A_A_PENT: {
      _subject: 2,
    },
    A_ARS1: {
      _subject: 1.5,
    },
    A_NMSS: {
      _subject: 1.5,
    }
  },
  MCE3: {
    'A_ANGL-3': {
      _subject: 1,
    },
    X_COLIN: {
      _subject: 1,
    },
    A_GPROAA: {
      _subject: 1,
    },
    A_DRTR: {
      _subject: 1,
    }
  },
  AEE3: {
    A_EAE3: {
      _subject: 8
    }
  }
};
