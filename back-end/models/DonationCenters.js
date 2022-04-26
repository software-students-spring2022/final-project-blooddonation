const mongoose = require('mongoose');

const { Schema } = mongoose;

const donationCenterSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
  
});

const donationcenter = mongoose.model('DonationCenter', donationCenterSchema);

// export the model so other modules can import it
module.exports = {
    donationcenter,
};
