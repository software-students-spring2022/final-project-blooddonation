const mongoose = require('mongoose');

const { Schema } = mongoose;

const medicaltreatSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const medicaltreatData = mongoose.model('MedicalTreatData', medicaltreatSchema);

// export the model so other modules can import it
module.exports = {
  medicaltreatData,
};
