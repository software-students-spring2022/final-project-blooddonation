const mongoose = require('mongoose');

const { Schema } = mongoose;

const medicationSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const medicationData = mongoose.model('FAQData', medicationSchema);

// export the model so other modules can import it
module.exports = {
  medicationData,
};
