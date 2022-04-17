const mongoose = require('mongoose');

const { Schema } = mongoose;

const medicalcondSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const medicalcondData = mongoose.model('MedicalCondData', medicalcondSchema);

// export the model so other modules can import it
module.exports = {
  medicalcondData,
};
