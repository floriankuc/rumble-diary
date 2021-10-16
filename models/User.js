const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

//comments: [{ body: String, date: Date }],

// meta: {
//   votes: Number,
//   favs:  Number
// }
// age:     { type: Number, min: 18, max: 65 },

// keys:
// validate: function, adds a validator function for this property
module.exports = User = mongoose.model('user', UserSchema);
