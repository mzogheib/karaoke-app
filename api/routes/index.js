const express = require('express');
const router = express.Router();

const ctrlSongs = require('../controllers/songs.controller.js');
const ctrlUsers = require('../controllers/users.controller.js');

router
    .route('/songs')
    .get(ctrlSongs.getAll)
    .post(ctrlSongs.create);

router
    .route('/songs/:id')
    .get(ctrlSongs.getOne)
    .put(ctrlSongs.update);
    // .delete(ctrlSongs.delete);

router
    .route('/register')
    .post(ctrlUsers.register);

router
    .route('/login')
    .post(ctrlUsers.login);

module.exports = router;