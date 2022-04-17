const mongoose = require('mongoose');

const { Schema } = mongoose;

const lifestyleSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const lifestyleData = mongoose.model('LifestyleData', lifestyleSchema);

// export the model so other modules can import it
module.exports = {
  lifestyleData,
};
