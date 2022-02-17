const router = require("express").Router();
const Beer = require("../models/Beer.model");
const User = require("../models/User.model");
const Brewery = require("../models/Brewery.model");
const isLoggedIn = require("../middleware/isLoggedIn");


router.get("/beer-list", (req, res, next) => {
    Beer.find()
        .populate("brewery")
        .then(beersFromDB => {
            res.render("beers/beer-list", { beers: beersFromDB, userInSession: req.session.user })
        })
        .catch(err => {
            console.log("Error getting beers from DB.", err)
        })
});

router.get("/beer-create", (req, res, next) => {

    let dbInfo;
    const findBeer = Beer.find()
    .populate("brewery")

Brewery.find()
    .then(info => {
        dbInfo = info
      return findBeer
    })
    .then((beerSingle) => {
            console.log(dbInfo)
            res.render("beers/beer-create", {beer: beerSingle, beerstyle: Beer.schema.path("beerstyle"), info: dbInfo, userInSession: req.session.user})
        })
        .catch();
});

    


router.post("/beer-create", (req, res, next) => {
    console.log(req.body)
    const beerDetails = {
        title: req.body.title,
        abv: req.body.abv,
        brewery: req.body.brewery,
        description: req.body.description,
        image: req.body.image,
        beerstyle: req.body.beerstyle,
        rating: req.body.rating,
    };
    Beer.create(beerDetails)
        .then(() => {
            res.redirect("/beers/beer-list");
        })
        .catch(err => {
            console.log("Error creating new beer.", err);
        })
});

router.get("/:beerId", (req, res, next) => {
    Beer.findById(req.params.beerId)
        .populate("brewery")
        .then(beerFromDB => {
            
            res.render("beers/beer-details", { beer: beerFromDB, userInSession: req.session.user })
        })
        .catch(err => {
            console.log("Error getting beer from DB", err)
        })
});

router.get("/:beerId/edit", isLoggedIn, (req, res, next) => {
    let dbInfo;
    const findBeer = Beer.findById(req.params.beerId)
    .populate("brewery")

Brewery.find()
    .then(info => {
        dbInfo = info
      return findBeer })
        .then(beerFromDB => {
            res.render("beers/beer-edit", {beer: beerFromDB , userInSession: req.session.user, beerstyle: Beer.schema.path("beerstyle"), info: dbInfo})
        })
        .catch(err => {
            console.log("Error getting beer details from DB", err)
        })
});

router.post("/:beerId/edit", (req, res, next) => {
    const beerId = req.params.beerId;
    const beerDetails = {
        title: req.body.title,
        abv: req.body.abv,
        brewery: req.body.brewery,
        description: req.body.description,
        image: req.body.image,
        beerstyle: req.body.beerstyle,
        rating: req.body.rating
    };
    Beer.findByIdAndUpdate(beerId, beerDetails)
        .populate("brewery")
        .then(() => {
            res.redirect(`/beers/${beerId}`);
        })
        .catch(err => {
            console.log("Error updating beer...", err);
        });
});

router.post("/:beerId/delete", (req, res, next) => {
    Beer.findByIdAndDelete(req.params.beerId)
        .then(() => {
            res.render("beers/beer-delete");
        })
        .catch(err => {
            console.log("Error deleting beer from DB", err)
        })
});


module.exports = router;