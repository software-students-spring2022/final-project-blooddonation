const questions = [
  {
    questionText: 'Do you have an Account?',
    answerOptions: [
      { answerText: 'Yes', isCorrect: 't' },
      { answerText: 'No', isCorrect: 'f' },
    ],
  },
  {
    questionText: 'Would you like to create an account?',
    answerOptions: [
      { answerText: 'Yes', isCorrect: 't' },
      { answerText: 'No', isCorrect: 'f' },
    ],
  },
  {
    questionText: 'What type of donation would you like to make?',
    answerOptions: [
      { answerText: 'Whole Blood', isCorrect: 'Whole' },
      { answerText: 'Power Red (Double Red Cell)', isCorrect: 'Power' },
      { answerText: 'Platelet', isCorrect: 'Platelet' },
      { answerText: 'Plasma', isCorrect: 'Plasma' },
    ],
  },
];

module.exports = questions;
