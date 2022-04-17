const mongoose = require('mongoose');

const { Schema } = mongoose;

const medicationSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const medicationData = mongoose.model('MedicationData', medicationSchema);

// export the model so other modules can import it
module.exports = {
  medicationData,
};
