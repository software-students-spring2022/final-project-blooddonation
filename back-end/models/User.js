const mongoose = require('mongoose');
const bycrpt = require('bcrypt');

const { Schema } = mongoose;
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
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    eligible: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Save encrypted password to database
userSchema.pre('save', function(next){
    if(!this.isModified('password'))
      return next();
    bycrpt.hash(this.password,10,(err,passwordHash)=>{
      if(err)
        return next(err);
      this.password = passwordHash;
      next();
    });
});

// create mongoose Model
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

// export the model so other modules can import it
module.exports = {
  User,
};
