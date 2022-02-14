const router = require("express").Router();
const Beer = require("../models/Beer.model");
const User = require("../models/User.model");


router.get("/", (req, res, next) => {
    Beer.find()
    .then(beersFromDB => {
        res.render("beers/beer-collection", {beers: beersFromDB})
    })
    .catch(err => {console.log("Error getting beers from DB.", err)
    })
});

router.post("/beer-create", (req, res, next) => {
    const beerDetails = {
        title: req.body.title,
        brewery: req.body.brewery,
        description: req.body.description,
        rating: req.body.rating
        };
    Beer.create(beerDetails)
    .then(() => {
        res.redirect("/beer-collection")
    })
    .catch(err => {
        console.log("Error creating new beer.", err)
    })
});

router.get("/:beerId", (req, res, next) => {
    Beer.findById(req.params.beerId)
    .then(beer => {
        res.render("beers/beer-details", beer)
    })
    .catch(err => {
        console.log("Error getting beer from DB.", err)
    })
});

router.get("/:beerId/edit", (req, res, next) => {
    Beer.findById(req.params.beerId)
    .then(beer => {
        res.render("beers/beer-edit", beer)
    })
    .catch(err => {
        console.log("Error getting beer details.", err)
    })
});

router.post("/:beerId/edit", (req, res, next) => {
    const beerId = req.params.beerId;
    const beerDetails = {
        title: req.body.title,
        brewery: req.body.brewery,
        description: req.body.description,
        rating: req.body.rating
        };
    Beer.findByIdAndUpdate(beerId, beerDetails)
    .then( () => {
        res.redirect(`beers/${beerId}`)
    })
    .catch(err => {
        console.log("Error updating beer.", err)
    })
});


router.post("/:beerId/delete", req, res, next) => {
    const beerId = req.params.beerId;
    Beer.findByIdAndDelete(beerId)
    .then( () => res.redirect("/beer-collection"))
    .catch(err => {
        console.log("Error deleting beer from DB.", err)
    })
});


module.exports = router;