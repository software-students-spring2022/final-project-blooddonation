const mongoose = require('mongoose');

const { Schema } = mongoose;

const plasmaquestionsSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const plasmaquestions = mongoose.model('PlasmaQuestions', plasmaquestionsSchema);

// export the model so other modules can import it
module.exports = {
  plasmaquestions,
};
