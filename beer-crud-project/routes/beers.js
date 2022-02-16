const router = require("express").Router();
const Beer = require("../models/Beer.model");
const User = require("../models/User.model");


router.get("/beer-list", (req, res, next) => {
    Beer.find()
        .then(beersFromDB => {
            res.render("beers/beer-list", {beers: beersFromDB, userInSession: req.session.user}, )
        })
        .catch(err => {
            console.log("Error getting beers from DB.", err)
        })
});

router.get("/beer-create", (req, res, next) => {
            res.render("beers/beer-create", {userInSession: req.session.user})
});

router.post("/beer-create", (req, res, next) => {
    const beerDetails = {
        title: req.body.title,
        brewery: req.body.brewery,
        //alcoholontent: req.body.alcoholontent,
        description: req.body.description,
        image: req.body.image,
        rating: req.body.rating
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
        .then(beerFromDB => {
            res.render("beers/beer-details", {beer: beerFromDB , userInSession: req.session.user})
        })
        .catch(err => {
            console.log("Error getting beer from DB", err)
        })
});

router.get("/:beerId/edit", (req, res, next) => {
    Beer.findById(req.params.beerId)
        .then(beer => {
            res.render("beers/beer-edit", beer)
        })
        .catch(err => {
            console.log("Error getting beer details from DB", err)
        })
});

router.post("/:beerId/edit", (req, res, next) => {
    const beerId = req.params.beerId;
    const beerDetails = {
        title: req.body.title,
        brewery: req.body.brewery,
        //alcoholcontent: req.body.alcoholontent,
        description: req.body.description,
        image: req.body.image,
        rating: req.body.rating
    };
    Beer.findByIdAndUpdate(beerId, beerDetails)
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