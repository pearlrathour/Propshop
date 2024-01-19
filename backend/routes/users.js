const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const user = require('../models/user');

router.route('/user/signup')
    .post(users.signup);

router.route('/user/signin')
    .post(users.signin);

router.route('/user/signout')
    .post(users.signout);

router.route('/user/updateinfo')
    .post(users.updateInfo);

router.route('/user/services')
    .post(users.fetchServices);

router.route('/user/appointments')
    .post(users.fetchAppointments);

module.exports = router;