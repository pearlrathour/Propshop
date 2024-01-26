const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const timeslot = new Schema({
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
});

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
    appointments: [{
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        },
        date: {
            type: String,
            required: true
        },
        timeslot: timeslot
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);