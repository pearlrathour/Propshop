const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateSlotSchema = new Schema({
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return this.startDate <= value;
            },
            message: 'End date must be greater than or equal to start date',
        },
    },
});

const TimeSlotSchema = new Schema({
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return this.startTime <= value;
            },
            message: 'End time must be greater than or equal to start time',
        },
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        required: false,
    }
});

const Slots= new Schema({
    date: {
        type: String,
        required: true,
    },
    timeslot: [TimeSlotSchema]
});


const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    date: DateSlotSchema,
    timeslots: [Slots],
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
});

module.exports = mongoose.model('Service', ServiceSchema);