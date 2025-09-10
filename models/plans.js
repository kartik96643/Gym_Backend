const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    validity: {
        type: String,
        required: true,
    },
    benefits: [String],
    monthlyPricing: {
        threeMonths: Number,
        sixMonths: Number
    }
});

const Plan = new mongoose.model('plan', planSchema);
module.exports = Plan;