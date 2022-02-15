const { Schema, model } = require('mongoose');


const beerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brewery: {
      type: String,
      required: true,
    },
    //alcoholcontent: Number, 

    category: {
      type: String,
      enum: ["pale ale", "pills", "whatever"]
    },


    description: String,
    //image: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    }

  },
  {
    timestamps: true
  }
);

module.exports = model('Beer', beerSchema);
