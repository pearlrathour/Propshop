const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateSlotSchema = new Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
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
});

const ServiceSchema = new Schema({
    title: {
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
    timeslots: [TimeSlotSchema]
});

module.exports = mongoose.model('Service', ServiceSchema);