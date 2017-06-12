const express = require('express');
const router = express.Router();

const ctrlSongs = require('../controllers/songs.controller.js');

router
    .route('/songs')
    .get(ctrlSongs.getAll)
    .post(ctrlSongs.create);

router
    .route('/songs/:id')
    .get(ctrlSongs.getOne)
    .put(ctrlSongs.update);
    // .delete(ctrlSongs.delete);

module.exports = router;