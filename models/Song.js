// models/Song.js
const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,

    },
    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Song', SongSchema);
