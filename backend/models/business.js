const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const BusinessSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactno: {
    type: Number,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: String,
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ]
});

BusinessSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Business', BusinessSchema);