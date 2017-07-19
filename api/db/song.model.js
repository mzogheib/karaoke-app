var mongoose = require('mongoose');

var songScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artistId: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
});

// Compile the model from the schema
// The third argument, db collection, can be omitted. Mongoose will pluralise 'Song' in its absence
mongoose.model('Song', songScheme, 'songs');
