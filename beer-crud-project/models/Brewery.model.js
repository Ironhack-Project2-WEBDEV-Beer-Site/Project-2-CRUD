const { Schema, model } = require('mongoose');


const brewerySchema = new Schema(
    {
        name: String,
        lat: Number,
        long: Number,
        city: String,
        state: String,
        country: String,
        zip: String,
        website: String,
        description: String,
    },
    {
        timestamps: true
    }
);

module.exports = model('Brewery', brewerySchema);
