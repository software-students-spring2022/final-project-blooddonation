const MedicationData = [
  {
    question: 'Aspirin',
    answer: [
      {
        subHeading: '',
        points: [
          'Aspirin, no waiting period for donating whole blood. However, you must wait 2 full days after taking aspirin or any medication containing aspirin before donating platelets by apheresis. For example, if you take aspirin products on Monday, the soonest you may donate platelets is Thursday.',
        ],
      },
    ],
  },

  {
    question: 'Antibiotics',
    answer: [
      {
        subHeading: '',
        points: [
          'A donor with an acute infection should not donate. The reason for antibiotic use must be evaluated to determine if the donor has a bacterial infection that could be transmissible by blood.',
          'Acceptable after finishing oral antibiotics for an infection (bacterial or viral). May have taken last pill on the date of donation. Antibiotic by injection for an infection acceptable 10 days after last injection. Acceptable if you are taking antibiotics to prevent an infection for the following reasons: acne, chronic prostatitis, peptic ulcer disease, periodontal disease, pre-dental work, rosacea, ulcerative colitis, after a splenectomy, or valvular heart disease. If you have a temperature above 99.5 F, you may not donate.',
        ],
      },
    ],
  },

  {
    question: 'Birth Control',
    answer: [
      {
        subHeading: '',
        points: [
          'Women on oral contraceptives or using other forms of birth control are eligible to donate.',
        ],
      },
    ],
  },

  {
    question: 'Immunization,Vaccination',
    answer: [
      {
        subHeading: '',
        points: [
          'Acceptable if you were vaccinated for influenza, pneumonia, tetanus or meningitis, providing you are symptom-free and fever-free. Includes the Tdap vaccine. ',
          'Acceptable if you received an HPV Vaccine (example, Gardasil).',
          'Acceptable if you were vaccinated with SHINGRIX (shingles vaccine) providing you are symptom-free and fever-free. SHINGRIX vaccine is administered in 2 doses (shots). The second shot is administered 2-6 months after the first shot. This distinguishes it from Zostavax, the live shingles vaccine, which is given as a single dose (shot) and requires a 4-week deferral.',
          'Wait 4 weeks after immunizations for German Measles (Rubella), MMR (Measles, Mumps and Rubella), Chicken Pox and Zostavax, the live shingles vaccine.',
          'Wait 2 weeks after immunizations for Red Measles (Rubeola), Mumps, Polio (by mouth), and Yellow Fever vaccine.',
          'Wait 21 days after immunization for hepatitis B as long as you are not given the immunization for exposure to hepatitis B.',
          'Acceptable if you were vaccinated with a non-replicating, inactivated, or RNA-based COVID-19 vaccine manufactured by AstraZeneca, Janssen/J&J, Moderna, Novavax, or Pfizer providing you are symptom-free and fever-free.',
          'Wait 2 weeks if you were vaccinated with a live attenuated COVID-19 vaccine.',
          'Wait 2 weeks if you were vaccinated with a COVID-19 vaccine but do not know if it was a non-replicating, inactivated, RNA based vaccine or a live attenuated vaccine.',
          'Smallpox vaccination and did not develop complications Wait 8 weeks (56 days) from the date of having a smallpox vaccination as long as you have had no complications. Complications may include skin reactions beyond the vaccination site or general illness related to the vaccination.',
          'Smallpox vaccination and developed complications Wait 14 days after all vaccine complications have resolved or 8 weeks (56 days) from the date of having had the smallpox vaccination whichever is the longer period of time. You should discuss your particular situation with the health historian at the time of donation. Complications may include skin reactions beyond the vaccination site or general illness related to the vaccination.',
          'Smallpox vaccination - close contact with someone who has had the smallpox vaccine in the last eight weeks and you did not develop any skin lesions or other symptoms. Eligible to donate.',
          'Smallpox vaccination - close contact with someone who has had the vaccine in the last eight weeks and you have since developed skin lesions or symptoms. Wait 8 weeks (56 days) from the date of the first skin lesion or sore. You should discuss your particular situation with the health historian at the time of donation. Complications may include skin reactions or general illness related to the exposure.',
        ],
      },
    ],
  },

  {
    question: 'Insulin',
    answer: [
      {
        subHeading: '',
        points: [
          'Donors with diabetes who take any kind of insulin are eligible to donate as long their diabetes is well controlled. ',
        ],
      },
    ],
  },

  {
    question: 'Medications',
    answer: [
      {
        subHeading: '',
        points: [
          'Accutane, Amnesteem, Absorica, Claravis, Myorisan, Sotret or Zenatane (isotretinoin), Proscar (finasteride), and Propecia (finasteride) - wait 1 month from the last dose. ',
          'Avodart or Jalyn (dutasteride) - wait 6 months from the last dose.',
          'Aspirin, no waiting period for donating whole blood. However, you must wait 2 full days after taking aspirin or any medication containing aspirin before donating platelets by apheresis. For example, if you take aspirin products on Monday, the soonest you may donate platelets is Thursday.',
          'Effient (prasugrel)  and Brilinta (ticagrelor)- no waiting period for donating whole blood. However you must wait 7 days after taking Brilinta (ticagrelor) before donating platelets by apheresis. You must wait 3 days after taking Effient (prasugrel) before donating platelets by apheresis.',
          'Feldene (piroxicam), no waiting period for donating whole blood. However, you must wait 2 days after taking Feldene (piroxicam) before donating platelets by apheresis.',
          'Coumadin, Warfilone, Jantoven (warfarin) and Heparin, are prescription blood thinners- you should not donate since your blood will not clot normally. If your doctor discontinues your treatment with blood thinners, wait 7 days before returning to donate.',
          'Arixtra (fondaparinux), Fragmin (dalteparin), Eliquis (apixaban), Pradaxa (dabigatran),Savaysa (edoxaban), Xarelto (rivaroxaban),and Lovenox (enoxaparin) are also prescription blood thinners- you should not donate since your blood will not clot normally. If your doctor discontinues your treatment with these blood thinners, wait 2 days before returning to donate.',
          'Hepatitis B Immune Globulin - given for exposure to hepatitis, wait 12 months after exposure to hepatitis.',
          'HIV Prevention (PrEP and PEP) medications - Truvada (Tenofovir), Descovy (emtricitabine), Tivicay (dolutegravir) and  Isentress (raltegravir) are given for exposure to HIV, you must wait 3 months after the last dose of medication to donate.',
          'HIV treatment also known as antiretroviral therapy (ART) at any time - you are not eligible to donate blood.',
          'Plavix (clopidogrel) and Ticlid (ticlopidine) - no waiting period for donating whole blood. However, you must wait 14 days after taking this medication before donating platelets by apheresis.',
          'Zontivity (vorapaxar) - no waiting period for donating whole blood. However, you must wait 1 month after taking this medication before donating platelets by apheresis.',
          'Rinvoq (upadacitinib) - wait 1 month',
          'Thalomid (thalidomide) - wait 1 month.',
          'Cellcept (mycophenolate mofetil) - an immunosuppressant - wait 6 weeks',
          'Soriatane (acitretin) - wait 3 years.',
          'Tegison (etretinate) at any time - you are not eligible to donate blood.',
          'Arava (leflunomide),  Erivedge (vismodegib) and Odomzo (sonidegib)- wait 2 years.',
          'Aubagio (teriflunomide) - wait 2 years.',
        ],
      },
    ],
  },
];

module.exports = MedicationData;
