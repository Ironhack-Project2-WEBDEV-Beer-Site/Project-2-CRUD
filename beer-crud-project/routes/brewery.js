const router = require("express").Router();
const Beer = require("../models/Beer.model");
const User = require("../models/User.model");
const Brewery = require("../models/Brewery.model");
const { json } = require("express/lib/response");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/brewery-list", (req, res, next) => {
    Brewery.find()
        .then(breweryFromDB => {
            res.render("brewery/brewery-list", {brewery: breweryFromDB, userInSession: req.session.user}, )
        })
        .catch(err => {
            console.log("Error getting brewery from DB.", err)
        })
});

router.get("/brewery-create", (req, res, next) => {
            res.render("brewery/brewery-create", {userInSession: req.session.user})
});

router.post("/brewery-create", (req, res, next) => {
    const breweryDetails = {
        title: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        code: req.body.code,
        country: req.body.country,
        website: req.body.website,
        description: req.body.description
    };
    Brewery.create(breweryDetails)
        .then(() => {
            res.redirect("/brewery/brewery-list");
        })
        .catch(err => {
            console.log("Error creating new brewery.", err);
        })
});

router.get("/:breweryId", (req, res, next) => {
    let location;
    Brewery.findById(req.params.breweryId)
        .then(breweryFromDB => {
            location = [breweryFromDB.lat, breweryFromDB.long]
            res.render("brewery/brewery-details", {brewery: breweryFromDB , userInSession: req.session.user, location: JSON.stringify(location)})
        })
        .catch(err => {
            console.log("Error getting brewery from DB", err)
        })
});

router.get("/:breweryId/edit", isLoggedIn, (req, res, next) => {
    Brewery.findById(req.params.breweryId)
        .then(brewery => {
            res.render("brewery/brewery-edit", {brewery: brewery ,userInSession: req.session.user})
        })
        .catch(err => {
            console.log("Error getting brewery details from DB", err)
        })
});

router.post("/:breweryId/edit", (req, res, next) => {
    const breweryId = req.params.breweryId;
    const breweryDetails = {
        title: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        code: req.body.code,
        country: req.body.country,
        website: req.body.website,
        description: req.body.description
    };
    Brewery.findByIdAndUpdate(breweryId, breweryDetails)
        .then(() => {
            res.redirect(`/brewery/${breweryId}`);
        })
        .catch(err => {
            console.log("Error updating brewery...", err);
        });
});

router.post("/:breweryId/delete", (req, res, next) => {
    Brewery.findByIdAndDelete(req.params.breweryId)
        .then(() => {
            res.render("brewery/brewery-delete");
        })
        .catch(err => {
            console.log("Error deleting brewery from DB", err)
        })
});


module.exports = router;