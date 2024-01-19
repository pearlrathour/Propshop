const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
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
    appointments: []
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);