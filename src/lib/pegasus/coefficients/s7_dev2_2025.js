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
  GLPS3: {
    D_SOCRA: {
      _subject: 1,
    },
    D_PPEX3: {
      _subject: 1,
    },
    P_42SH: {
      _subject: 2,
    },
    THL: {
      _subject: 2,
    },
    D_BAGD1: {
      _subject: 2,
    },
    D_JEE: {
      _subject: 2,
    }
  },
  PWM1: {
    D_WEB: {
      _subject: 2,
    },
    D_P_WEB: {
      _subject: 1,
    },
    D_IJST: {
      _subject: 1,
    },
    D_UXUI: {
      _subject: 1,
    },
    D_IANDO: {
      _subject: 1,
    }
  },
  MCE3: {
    "D_LV1-3": {
      _subject: 1.5,
    },
    D_GPROAA: {
      _subject: 1.5,
    },
    D_DRTR: {
      _subject: 1,
    }
  },
  MAF3: {
    D_FUNCT: {
      _subject: 1,
    },
    D_SUITE: {
      _subject: 1,
    },
    D_SERIE: {
      _subject: 1,
    }
  },
  AEE3: {
    D_EAE3: {
      _subject: 7,
    }
  }
};
