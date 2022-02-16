const { Schema, model } = require('mongoose');


const brewerySchema = new Schema(
    {
        name: String,
        address: String,
        city: String,
        state: String,
        code: Number,
        country: String,
        website: String,
        description: String,
    },
    {
        timestamps: true
    }
);

module.exports = model('Brewery', brewerySchema);
