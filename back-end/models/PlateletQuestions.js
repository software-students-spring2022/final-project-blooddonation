const mongoose = require('mongoose');

const { Schema } = mongoose;

const plateletquestionsSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const plateletquestions = mongoose.model('PlateletQuestions', plateletquestionsSchema);

// export the model so other modules can import it
module.exports = {
  plateletquestions,
};
