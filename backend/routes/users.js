const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const user = require('../models/user');

router.route('/usersignup')
    // .get(users.renderUserSignup)
    .post(users.usersignup);


router.route('/signin')
    .post(passport.authenticate('local', { failureRedirect: '/' }), users.signin);

// router.get('/singout', users.signout)

module.exports = router;