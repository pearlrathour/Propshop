const Business = require("../models/business");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const business = await Business.findById(req.params.id);
  const review = new Review(req.body.review);
  business.author = req.user._id;
  business.reviews.push(review);
  await review.save();
  await business.save();
  res.redirect(`/business/${business._id}`);
};