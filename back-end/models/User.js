const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    eligible : {
      type: Array,
      required: false,
    }
  },
  {
    timestamps: true,
  }
)

// create mongoose Model
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

// export the model so other modules can import it
module.exports = {
  User,
}