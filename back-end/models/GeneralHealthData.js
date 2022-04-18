const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalhealthSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const generalhealthData = mongoose.model('GeneralHealthData', generalhealthSchema);

// export the model so other modules can import it
module.exports = {
  generalhealthData,
};
