const express = require('express');
const router = express.Router();
const Business = require('../models/business');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');

router.post('/home/:id', reviews.createReview);

module.exports = router;