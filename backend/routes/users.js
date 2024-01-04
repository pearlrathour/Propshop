const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const user = require('../models/user');

router.route('/user/signup')
    // .get(users.renderUserSignup)
    .post(users.signup);


router.route('/user/signin')
    .post(users.signin);

// router.get('/singout', users.signout)

module.exports = router;