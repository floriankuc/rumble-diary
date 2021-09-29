const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  frequency: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  subItems: {
    type: Array,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  user: {
    type: String,
    required: false,
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
