const express = require('express');
const router = express.Router();
const passport = require('passport');
const Business = require("../models/business");
const Service = require("../models/service");
const business = require("../controllers/business");

router.route("/business/signup")
    .post(business.signup);

router.route('/business/signin')
    .post(business.signin);

router.route('/business/signout')
    .post(business.signout);


router.route('/business/info')
    .post(business.fetchInfo);

router.route('/business/updateinfo')
    .post(business.updateInfo);

router.route('/business/addservice')
    .post(business.createService);

router.route('/business/myservices')
    .post(business.fetchService);

router.route('/business/myservices/:id')
    .post(business.fetchServiceProfile);

router.route('/business/userinfo')
    .post(business.fetchUserInfo);

router.route('/business/deleteservice')
    .post(business.removeService);

router.route('/business/updateservice')
    .post(business.updateService);

module.exports = router;