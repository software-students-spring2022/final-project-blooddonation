const mongoose = require('mongoose');

const { Schema } = mongoose;

const travelSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const travelData = mongoose.model('TravelData', travelSchema);

// export the model so other modules can import it
module.exports = {
  travelData,
};
