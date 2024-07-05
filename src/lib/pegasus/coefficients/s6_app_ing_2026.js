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
  AEE2: {
    A_EAE2: {
      _subject: 6,
    },
    M_ANSSI: {
      _subject: 0.5,
    },
    REX2: {
      _subject: 1.5,
    }
  },
  MAF2: {
    ALSD: {
      _subject: 2,
    },
    ERO: {
      _subject: 1,
    },
    APFX: {
      _subject: 2,
    },
    FMSI: {
      _subject: 1,
    },
    CODO_A: {
      _subject: 1,
    }
  },
  IF2: {
    MOB1: {
      _subject: 1,
    },
    THL: {
      _subject: 1.5,
    },
    A_PFON: {
      _subject: 1.5,
    },
    THEG_A: {
      _subject: 1,
    }
  },
  MCE2: {
    ANGLA_2: {
      _subject: 1,
    },
    BMARK1: {
      _subject: 1,
    },
    'TEORA 2': {
      _subject: 1,
    },
    GPRO1_A: {
    _subject: 1,
    }
  },
  GLSR2: {
    JAVA_A: {
      _subject: 1.5,
    },
    JWS: {
      _subject: 1,
    },
    Js: {
      _subject: 1.5,
    },
    SYS2_A: {
      _subject: 2,
    },
    NET2_A: {
      _subject: 1,
    }
  }
};
