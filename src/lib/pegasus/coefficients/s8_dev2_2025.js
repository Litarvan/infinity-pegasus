// ----------------------
// READ ME!
// ----------------------
//
// Both ID and names can be used for both subjects and marks (marks ID are their order in the list)
// Subjects or marks with a coefficient of 1 (or equivalent) can be omitted
// Coefficient does not have to sum up to 1, since the sum of the coefficients will be used
// No need to specify module coefficients, since they are already retrieved from the PDF
// Also, regex are supported for marks name :^) (which means '[' must be escaped !)

// TODO: Update when available
export default {
  MAF2: {
    D_PROD: {
      _subject: 1,
    },
    D_FPVA: {
      _subject: 1,
    },
    P_PROC: {
      _subject: 2,
    }
  },
  GLSR4: {
    D_BADG2: {
      _subject: 1.5,
    },
    D_CLARC: {
      _subject: 2,
    },
    D_DEVOPS: {
      _subject: 1,
    },
    D_DOTN: {
      _subject: 1.5,
    }
  },
  PWM2: {
    D_GAMJA: {
      _subject: 2,
    },
    D_NDJS8: {
      _subject: 2,
    },
    D_SEO: {
      _subject: 1,
    }
  },
  MCE4: {
    D_M_SST: {
      _subject: 1.5,
    },
    "D_ANGL-4": {
      _subject: 1.5,
    }
  },
  AEE4: {
    D_EAE4: {
      _subject: 9,
    }
  }
};
