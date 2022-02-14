const { Schema, model } = require('mongoose');


const beerSchema = new Schema(
  {
    title: String,
    description: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    }

  },
  {
    timestamps: true
  }
);

module.exports = model('Beer', beerSchema);