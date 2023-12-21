const Salon = require("../models/salon");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const salon = await Salon.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  salon.reviews.push(review);
  await review.save();
  await salon.save();
  res.redirect(`/home/${salon._id}`);
};