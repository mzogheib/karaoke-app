const express = require('express');
const router = express.Router();

const ctrlSongs = require('../controllers/songs.controller.js');

router
    .route('/songs')
    .get(ctrlSongs.getAll);

module.exports = router;