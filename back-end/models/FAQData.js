const mongoose = require('mongoose');

const { Schema } = mongoose;

const FAQDataSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

const faqData = mongoose.model('FAQData', FAQDataSchema);

// export the model so other modules can import it
module.exports = {
  faqData,
};
