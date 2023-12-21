const express = require('express');
const router = express.Router();
const passport = require('passport');
const salons = require("../controllers/salons");
const Salon = require("../models/salon");

router.route("/business/signup")
    .post(salons.signup);

router.route('/business/signin')
    .post(passport.authenticate('local', { failureRedirect: '/business/signin' }), salons.signin);

module.exports = router;