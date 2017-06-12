var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

var songScheme = new mongoose.Schema({
    // path: schemaType
    title: {
        type: String,
        required: true
    },
    artist: artistSchema
});

// Compile the model from the schema
// The third argument, db collection, can be omitted. Mongoose will pluralise 'Song' in its absence
mongoose.model('Song', songScheme, 'songs');
