const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  conditions: {
    fluidIntake: {
      type: Number,
      required: true,
    },
    medication: {
      type: String,
      required: false,
    },
    meals: {
      type: [
        {
          name: String,
          mealType: String,
        },
      ],
      required: false,
    },
    activities: {
      type: String,
      required: false,
    },
    stressLevel: {
      type: Number,
      required: true,
    },
    stoolPerDay: {
      type: Number,
      required: true,
    },
    wellbeing: {
      type: Number,
      required: true,
    },
  },
  observations: {
    bloating: {
      type: Boolean,
      required: false,
    },
    nausea: {
      type: Boolean,
      required: false,
    },
    cramps: {
      type: Boolean,
      required: false,
    },
    diarrhoea: {
      type: Boolean,
      required: false,
    },
    flatulence: {
      type: Boolean,
      required: false,
    },
    diffusePain: {
      type: Boolean,
      required: false,
    },
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
