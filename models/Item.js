const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    //namen wird nicht benötigt
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
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
    //rechnet FE aus
    type: Number,
    required: false,
  },
  nightmares: {
    type: Boolean,
    required: false,
  },
  noise: {
    type: Boolean,
    required: false,
  },
  quality: {
    type: Number,
    min: 0,
    max: 5,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  entry_date: {
    type: Date,
    default: Date.now,
    required: false,
  },
  user: {
    type: String,
    required: false,
  },
  conditions: {
    temperature: {
      type: Number,
      required: false,
    },
    freshAir: {
      type: Boolean,
      required: false,
    },
    fed: {
      type: Boolean,
      required: false,
    },
    mentalStatus: {
      type: Number,
      min: 0,
      max: 5,
      required: false,
    },
    noDrinks1HourBefore: {
      type: Boolean,
      required: false,
    },
    noCaffeine4HoursBefore: {
      type: Boolean,
      required: false,
    },
    noElectronicDevices: {
      type: Boolean,
      required: false,
    },
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
