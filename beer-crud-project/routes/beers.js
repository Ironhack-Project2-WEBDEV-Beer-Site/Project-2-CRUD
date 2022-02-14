const router = require("express").Router();
const Beer = require("../models/Beer.model");
const User = require("../models/User.model");


router.get("/", (req, res, next) => {
    Beer.find()
    .then(beersFromDB => {
        res.render("beers/beer-collection", {beers: beersFromDB})
    })
    .catch(err => {console.log("Error getting beers from DB", err)
    })
});

router.post("/beer-create", (req, res, next) => {
    const beerDetails
}


module.exports = router;