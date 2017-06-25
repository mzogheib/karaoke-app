var mongoose = require('mongoose');

var songScheme = new mongoose.Schema({
    // path: schemaType
    title: {
        type: String,
        required: true
    },
    artist: {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    notes: {
        type: String
    }
});

// Compile the model from the schema
// The third argument, db collection, can be omitted. Mongoose will pluralise 'Song' in its absence
mongoose.model('Song', songScheme, 'songs');
