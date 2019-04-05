const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    torrents: {
        type: Array,
        required: true
    },
    imdb_id: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
    },
    cover_image: {
        type: String,
        required: true        
    },
    synopsis: {
        type: String,
        required: true
    },
    uploaded: {
        type: Number,
        default: 0,
        enum: [0, 1],
        required: true
    },
    last_watched: {
        type: Date,
        default: Date.now
    },
    file_path: {
        type: String
    }
})

const Movies = mongoose.model('Movies', moviesSchema);


module.exports = Movies;