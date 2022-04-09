const MedicalCondData = [
  {
    question: 'Allergies',
    answer: [
      {
        subHeading: '',
        points: [
          'You are eligible as long as you feel well, have no fever, and have no problems breathing through your mouth.',
        ],
      },
    ],
  },

  {
    question: 'Asthma',
    answer: [
      {
        subHeading: '',
        points: [
          'You are eligible as long as you do not have any limitations on daily activities and are not having difficulty breathing at the time of donation and you otherwise feel well. Medications for asthma do not disqualify you from donating.',
        ],
      },
    ],
  },

  {
    question: 'Bleeding Condition',
    answer: [
      {
        subHeading: '',
        points: [
          'Atrixa (fondaparinux)',
          'Coumadin (warfarin)',
          'Eliquis (apixaban)',
          'Fragmin (dalteparin)',
          'Heparin',
          'Jantoven (warfarin)',
          'Lovenox (enoxaparin)',
          'Pradaxa (dabigatran)',
          'Savaysa (edoxaban)',
          'Warfilone (warfarin)',
          'Xarelto (rivaroxaban)',
        ],
      },
    ],
  },

  {
    question: 'Blood Pressure (High or Low)',
    answer: [
      {
        subHeading: '',
        points: [
          'High Blood Pressure - You are eligible as long as your blood pressure is below 180 systolic (first number) and below 100 diastolic (second number) at the time of donation. Medications for high blood pressure do not disqualify you from donating.',
          'Low Blood Pressure - You are eligible as long as you feel well when you come to donate, and your blood pressure is at least 90/50 (systolic/diastolic).',
        ],
      },
    ],
  },

  {
    question: 'Pulse (High or Low)',
    answer: [
      {
        subHeading: '',
        points: [
          'You are eligible as long as your pulse is no more than 100 and no less than 50.  A pulse that is regular and less than 50 will require evaluation by the physician at the site.',
        ],
      },
    ],
  },

  {
    question: 'Cancer',
    answer: [
      {
        subHeading: '',
        points: [
          'Eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, including Hodgkin’s Disease and other cancers of the blood, you are not eligible to donate. Other types of cancer are acceptable if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.',
          'Precancerous conditions of the uterine cervix do not disqualify you from donation if the abnormality has been treated successfully. You should discuss your particular situation with the health historian at the time of donation.',
        ],
      },
    ],
  },

  {
    question: 'Chronic Illnesses',
    answer: [
      {
        subHeading: '',
        points: [
          'Most chronic illnesses are acceptable as long as you feel well, the condition is under control, and you meet all other eligibility requirements.',
        ],
      },
    ],
  },

  {
    question: 'CJD, vCJD, Mad Cow Disease',
    answer: [
      {
        subHeading: '',
        points: [
          'Creutzfeldt-Jakob Disease (CJD) If you ever received a dura mater (brain covering) transplant you are not eligible to donate.  If you received an injection of cadaveric pituitary human growth hormone (hGH) you cannot donate. Human cadaveric pituitary-derived hGH was available in the U.S. from 1958 to 1985.  Growth hormone received after 1985 is acceptable. If you have been diagnosed with vCJD, CJD or any other TSE or have a blood relative diagnosed with genetic CJD (e.g., fCJD, GSS, or FFI) you cannot donate.',
        ],
      },
    ],
  },

  {
    question: 'Diabetes',
    answer: [
      {
        subHeading: '',
        points: [
          'Diabetics who are well controlled on insulin or oral medications are eligible to donate.',
        ],
      },
    ],
  },

  {
    question: 'Heart Disease',
    answer: [
      {
        subHeading: '',
        points: [
          'In general, you are eligible as long as you have been medically evaluated and treated, have no current (within the last 6 months) heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities.',
          'Wait at least 6 months following an episode of angina',
          'Wait at least 6 months following a heart attack.',
          'Wait at least 6 months after bypass surgery or angioplasty.',
          'Wait at least 6 months after a change in your heart condition that resulted in a change to your medications',
          'If you have a pacemaker, you may donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria. You should discuss your particular situation with your personal healthcare provider and the health historian at the time of donation.',
        ],
      },
    ],
  },

  {
    question: 'Heart Murmur, Heart Valve Disorder',
    answer: [
      {
        subHeading: '',
        points: [
          'You are eligible if you have a heart murmur as long as you have been medically evaluated and treated and have not had symptoms in the last 6 months and have no restrictions on your normal daily activities.',
        ],
      },
    ],
  },

  {
    question: 'Hemochromatosis (Hereditary)',
    answer: [
      {
        subHeading: '',
        points: ['Individuals with hemochromatosis can not be blood donors.'],
      },
    ],
  },

  {
    question: 'Hemoglobin, Hematocrit, Blood Count',
    answer: [
      {
        subHeading: '',
        points: [
          'In order to donate blood, a woman must have a hemoglobin level of at least 12.5 g/dL, and a man must have a hemoglobin level of at least 13.0 g/dL. For all donors, the hemoglobin level can be no greater than 20 g/dL.',
        ],
      },
    ],
  },

  {
    question: 'Hepatitis, Jaundice',
    answer: [
      {
        subHeading: '',
        points: [
          'If you have signs or symptoms of hepatitis (inflammation of the liver) caused by a virus, or unexplained jaundice (yellow discoloration of the skin), you are not eligible to donate blood. If you ever tested positive for hepatitis B or hepatitis C, at any age, you are not eligible to donate, even if you were never sick or jaundiced from the infection.',
        ],
      },
    ],
  },

  {
    question: 'Hepatitis Exposure',
    answer: [
      {
        subHeading: '',
        points: [
          'If you live with or have had sexual contact with a person who has hepatitis, you must wait 12 months after the last contact.',
          'Persons who have been detained or incarcerated in a facility (juvenile detention, lockup, jail, or prison) for 72 hours or more consecutively (3 days) are deferred for 12 months from the date of last occurrence. This includes work release programs and weekend incarceration. These persons are at higher risk for exposure to infectious diseases.',
          "Wait 3 months after receiving a blood transfusion (unless it was your own 'autologous' blood), non-sterile needle stick or exposure to someone else's blood.",
        ],
      },
    ],
  },

  {
    question: 'HIV, AIDS',
    answer: [
      {
        subHeading: '',
        points: [
          'have used needles to take any drugs, steroids, or anything not prescribed by your doctor in the last 3 months.',
          'are a male who has had sexual contact with another male, in the last 3 months',
          'have taken money, drugs or other payment for sex in the last 3 months',
          'had sexual contact in the past 3 months with anyone described above',
        ],
      },
    ],
  },

  {
    question: 'Infections',
    answer: [
      {
        subHeading: '',
        points: [
          'If you have a fever or an active infection, wait until the infection has resolved completely before donating blood.',
          'Wait until finished taking oral antibiotics for an infection (bacterial or viral). Wait 10 days after the last antibiotic injection for an infection.',
        ],
      },
    ],
  },

  {
    question: 'Sickle Cell',
    answer: [
      {
        subHeading: '',
        points: [
          'You are eligiblie if you have sickle cell trait. Those with sickle cell disease are not eligible to donate.',
        ],
      },
    ],
  },

  {
    question: 'Skin Disease, Rash, Acne',
    answer: [
      {
        subHeading: '',
        points: [
          'You are eligible as long as the skin over the vein to be used to collect blood is not affected. If the skin disease has become infected, wait until the infection has cleared before donating. Taking antibiotics to control acne does not disqualify you from donating.',
        ],
      },
    ],
  },

  {
    question: 'Skin Disease, Rash, Acne',
    answer: [
      {
        subHeading: '',
        points: [
          'If you have active tuberculosis or are being treated for active tuberculosis you are not eligible to donate. Youe are eligible if you have a positive skin test or blood test, but no active tuberculosis and are NOT taking antibiotics. If you are receiving antibiotics for a positive TB skin test or blood test only or if you are being treated for a tuberculosis infection, wait until treatment is successfully completed before donating.',
        ],
      },
    ],
  },

  {
    question: 'Measles Exposure',
    answer: [
      {
        subHeading: '',
        points: [
          'You are eligible if you are healthy and well and have been vaccinated for measles more than 4 weeks ago or were born before 1956. If you have not been vaccinated or it has been less than 4 weeks since being vaccinated, wait 4 weeks from the date of the vaccination or exposure before donating.',
        ],
      },
    ],
  },
];

module.exports = MedicalCondData;
