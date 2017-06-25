var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    songs: [{
        _id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }]
});

// Compile the model from the schema
mongoose.model('Artist', artistSchema, 'artists');
