const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  breaks: {
    type: [
      {
        start: Date,
        end: Date,
      },
    ],
    required: false,
  },
  duration: {
    type: Number,
    required: true,
  },
  nightmares: {
    type: Boolean,
    required: true,
  },
  noise: {
    type: Boolean,
    required: true,
  },
  quality: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  entry_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  conditions: {
    temperature: {
      type: Number,
      required: true,
    },
    freshAir: {
      type: Boolean,
      required: true,
    },
    fed: {
      type: Boolean,
      required: true,
    },
    mentalStatus: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    noDrinks1HourBefore: {
      type: Boolean,
      required: true,
    },
    noCaffeine4HoursBefore: {
      type: Boolean,
      required: true,
    },
    noElectronicDevices: {
      type: Boolean,
      required: true,
    },
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
