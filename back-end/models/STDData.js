const mongoose = require('mongoose');

const { Schema } = mongoose;

const STDSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const stdData = mongoose.model('STDData', STDSchema);

// export the model so other modules can import it
module.exports = {
  stdData,
};
