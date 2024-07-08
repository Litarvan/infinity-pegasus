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
    A_M_ANSSI: {
      _subject: 0.5,
    },
    A_REX2: {
      _subject: 1.5,
    }
  },
  MAF2: {
    A_ALSD: {
      _subject: 2,
    },
    A_ERO: {
      _subject: 1,
    },
    A_APFX: {
      _subject: 2,
    },
    A_FMSI: {
      _subject: 1,
    }
  },
  IF2: {
    MOB1: {
      _subject: 1,
    },
    A_THL: {
      _subject: 1.5,
    },
    PFON: {
      _subject: 1.5,
    },
    A_THEG: {
      _subject: 1,
    }
  },
  MCE2: {
    'A_ANGL-2': {
      _subject: 1,
    },
    A_EMARK: {
      _subject: 1,
    },
    A_TEORA2: {
      _subject: 1,
    },
    A_GPRO1: {
    _subject: 1,
    }
  },
  GLSR2: {
    A_A_JAVA: {
      _subject: 1.5,
    },
    A_JWS: {
      _subject: 1,
    },
    A_E_JS: {
      _subject: 1.5,
    },
    A_SYS2: {
      _subject: 2,
    },
    A_NET2: {
      _subject: 1,
    }
  }
};
