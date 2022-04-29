const mongoose = require('mongoose');

const { Schema } = mongoose;

const wholebloodquestionsSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const wholebloodquestions = mongoose.model('WholeBloodQuestions', wholebloodquestionsSchema);

// export the model so other modules can import it
module.exports = {
  wholebloodquestions,
};
