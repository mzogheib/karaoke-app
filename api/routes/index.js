const express = require('express');
const router = express.Router();

const ctrlArtists = require('../controllers/artists.controller.js');
const ctrlSongs = require('../controllers/songs.controller.js');
const ctrlUsers = require('../controllers/users.controller.js');

const routeArtists = require('./artists.route.js');

router
    .route('/artists')
    .all(ctrlUsers.authenticate)
    .get(routeArtists.getAll)
    .post(routeArtists.create);

router
    .route('/artists/:id')
    .all(ctrlUsers.authenticate)
    .get(routeArtists.get)
    .put(routeArtists.update)
    .delete(routeArtists.delete);

router
    .route('/songs')
    .all(ctrlUsers.authenticate)
    .get(ctrlSongs.getAll)
    .post(ctrlSongs.create);

router
    .route('/songs/:id')
    .all(ctrlUsers.authenticate)
    .get(ctrlSongs.getOne)
    .put(ctrlSongs.update)
    .delete(ctrlSongs.delete);

router
    .route('/sign-up')
    .post(ctrlUsers.signUp);

router
    .route('/login')
    .post(ctrlUsers.login);

module.exports = router;