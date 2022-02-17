const { Schema, model } = require('mongoose');


const beerSchema = new Schema(
  {
    title: String,
    abv: String,
    brewery: { type: Schema.Types.ObjectId, ref: 'Brewery' },
    description: String,
    image: String,
    beerstyle: { type: String,
      enum: ['Altbier', 'Amber ale', 'Barley wine', 'Berliner Weisse', 'Biere de Garde', 'Bitter', 'Blonde Ale', 'Bock', 'Brown ale', 'California Common/Steam Beer', 'Cream Ale', 'Dortmunder Export', 'Doppelbock', 'Dunkel', 'Dunkelweizen', 'Eisbock', 'Flanders red ale', 'Golden/Summer ale', 'Gose', 'Gueuze', 'Hefeweizen', 'Helles', 'India pale ale', 'Koelsch', 'Lambic', 'Light ale', 'Maibock/Helles bock', 'Malt liquor', 'Mild', 'Oktoberfestbier/Maerzenbier', 'Old ale', 'Oud bruin', 'Pale ale', 'Pilsener/Pilsner/Pils', 'Porter', 'Red ale', 'Roggenbier', 'Saison', 'Scotch ale', 'Stout', 'Schwarzbier', 'Vienna lager', 'Witbier', 'Weissbier', 'Weizenbock'],
    }, 
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
