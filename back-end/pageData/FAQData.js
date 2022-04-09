const FAQData = [
  {
    question: 'What is the blood donation process?',
    answer: [
      { subHeading: 'Registration' },

      {
        subHeading: 'Health History',
        points: [
          "You'll answer a few questions about your health history and places you've traveled, during a private and confidential interview",
          "You'll tell us about any prescription and/or over the counter medications that may be in your system.",
          'Your temperature, pulse, blood pressure and hemoglobin level will be checked.',
        ],
      },
      { subHeading: 'Your donation' },

      {
        subHeading: 'Refreshment and recovery',
        points: [
          "After donating blood, you'll have a snack and something to drink in a designated refreshment area.",
          "You'll leave after 10-15 minutes.",
          'Inspire others to become blood donors!',
        ],
      },
    ],
  },

  {
    question: 'What to Do Before, During and After Your Donation',
    answer: [
      { subHeading: 'Before Your Donation' },

      {
        subHeading: 'On the Day of Your Donation',
        points: [
          "Bring your driver's license or two other forms of Identification. See FAQ below",
          "Know what medications you are taking. Those assisting you will need to know about all prescription and over-the-counter medications you're taking.",
          'Drink 16 oz. of water (or other nonalcoholic drink) before your appointment.',
          'Eat a healthy meal, avoiding fatty foods like hamburgers, fries or ice cream.',
          'Wear a shirt with sleeves that you can roll up above your elbows.',
        ],
      },

      {
        subHeading: 'After Your Donation',
        points: [
          "Relax for a few minutes and have a snack at the site's recovery area!",
          'Drink 8 oz. of liquids and avoid alcohol for the next 24 hours.',
          'Keep your bandage on for the next few hours and clean the area around the bandage with soap and water to avoid a rash.',
          "Don't do any heavy lifting or vigorous exercise for the rest of the day.",
          'If the needle site starts to bleed, apply pressure and raise your arm straight up for 5-10 minutes or until bleeding stops.',
          'Eat iron-rich foods.',
          'If you donate frequently, take multivitamins with iron to replenish your iron stores before your next donation.',
        ],
      },
    ],
  },

  {
    question: 'Am I eligible to donate blood?',
    answer: [{ subHeading: 'Eligible' }],
  },

  {
    question: 'Is it safe to donate?',
    answer: [
      {
        subHeading: '',
        points: [
          'Yes, it is safe to donate blood. New, sterile needles are used and are discarded after one use, so you can’t get AIDS or any other infectious disease. In addition to this, Those at the site will check your temperature, blood pressure, pulse, and hemoglobin to ensure that you are healthy enough to donate blood on the day of your appointment.',
        ],
      },
    ],
  },

  {
    question: 'How long does a blood donation take?',
    answer: [
      {
        subHeading: '',
        points: [
          "The time varies slightly depending on the donor's health history and how busy the center is, but the process generally takes one hour and 15 minutes. The actual donation of a pint of whole blood unit takes eight to 10 minutes.",
        ],
      },
    ],
  },

  {
    question: 'How often can I donate blood',
    answer: [
      {
        subHeading: '',
        points: [
          'You must wait at least eight weeks (56 days) between donations of whole blood and 16 weeks (112 days) between Power Red donations (Double Red Cell). Whole blood donors can donate up to 6 times a year. Platelet apheresis donors may give every 7 days up to 24 times per year. Regulations are different for those giving blood for themselves (autologous donors). ',
        ],
      },
    ],
  },

  {
    question: 'What are some acceptable forms of ID for blood donors?',
    answer: [
      {
        subHeading: 'Primary Form of ID (You will need one of the following)',
        points: [
          "Driver's license with photo",
          'Immigration and Naturalization Service card (green card)',
          'State ID',
          'Employee ID with photo',
          'Passport',
          'Student ID with photo',
          'Military ID',
        ],
      },

      {
        subHeading:
          'Secondary Form of ID (When a primary form of ID is not available, the donor needs two secondary forms of ID)',
        points: [
          'Student ID (without a photo)',
          "Driver's license without a photo",
          'Credit card or bank card',
          'Employee ID (without a photo)',
          'Birth certificate (original or certified copy)',
          'Personal checkbook with name and address',
          'Social Security card',
          'Voter registration card',
          'Payroll stub',
          'Vehicle registration',
          'Fishing or hunting license',
          'Grocery store frequent shopper card or VIP card',
          'Club or museum membership card',
          "Library card with donor's name",
          'Professional license (such as: RN, LPN or MT)',
          'Non-American Red Cross donor card',
          'Selective Service card',
          'Insurance card',
        ],
      },

      {
        subHeading:
          'High School Students (Without any of the previously listed forms of ID, the ID and date of birth of a high school student may be checked by the following listed below)',
        points: [
          "School officials determine the donor's identity and date of birth from a list of potentially eligible donors (may use the yearbook to assist with the determination).",
          "Adult volunteers instructed on ID verification using a current yearbook picture and an additional piece of ID containing the donor's name and age.",
          "A parent or legal guardian can provide a document with the donor's legal name and verbally provide the name and age when the donor does not have ID due to age",
          'High school students may not check identification on other high school students at high school blood drives.',
        ],
      },
    ],
  },
];

module.exports = FAQData;
