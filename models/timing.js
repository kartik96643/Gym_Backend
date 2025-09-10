const mongoose = require('mongoose');

const timingSchema = new mongoose.Schema({

    morning: {
      open: { type: Number, required: true },  
      close: { type: Number, required: true } 
    },
    evening: {
      open: { type: Number, required: true }, 
      close: { type: Number, required: true }  
    }
}, { timestamps: true });

const Timing = new mongoose.model('timing', timingSchema);

module.exports = Timing;