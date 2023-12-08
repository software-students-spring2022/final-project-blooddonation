const mongoose = require('mongoose');

const { Schema } = mongoose;

const eligibilityquestionnaireSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const eligibilityquestionnaireData = mongoose.model(
  'EligibilityQuestionnaireData',
  eligibilityquestionnaireSchema
);

// export the model so other modules can import it
module.exports = {
  eligibilityquestionnaireData,
};
