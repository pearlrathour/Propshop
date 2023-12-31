const express = require('express');
const router = express.Router();
const passport = require('passport');
const Business = require("../models/business");
const Service= require("../models/service");
const business = require("../controllers/business");

router.route("/business/signup")
    .post(business.signup);

router.route('/business/signin')
    .post(passport.authenticate('local', { failureRedirect: '/business/signin' }), business.signin);

router.route('/business/myservices')
    .post(business.signin);

module.exports = router;