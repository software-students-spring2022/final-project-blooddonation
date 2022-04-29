const mongoose = require('mongoose');

const { Schema } = mongoose;

const powerredquestionsSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const powerredquestions = mongoose.model('PowerRedQuestions', powerredquestionsSchema);

// export the model so other modules can import it
module.exports = {
  powerredquestions,
};
