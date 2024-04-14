const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    answer: {
        type: String,
    }
});

const Reading = mongoose.model('Reading', readingSchema);

module.exports = Reading;