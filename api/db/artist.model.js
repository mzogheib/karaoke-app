var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    songIds: [String]
});

// Compile the model from the schema
mongoose.model('Artist', artistSchema, 'artists');
