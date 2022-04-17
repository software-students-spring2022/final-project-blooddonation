const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionsSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const questions = mongoose.model('questions', questionsSchema);

// export the model so other modules can import it
module.exports = {
  questions,
};
