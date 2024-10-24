const router = require('express').Router();
const {
    createUser,
    sourLogin,
    getUserProfile,
    addTopTracks,
    addTopArtists,
    getUserTracks,
    getUserArtists,
} = require('../../controllers/userController');

// /api/users endpoint to create new user
router.route('/').post(createUser);

// /api/users/login endpoint to login
router.route('/login').post(sourLogin);

// /api/users/:spotifyId
router.route('/:spotifyId').get(getUserProfile);

// /api/users/topTracks
router.route('/topTracks').post(addTopTracks)

// /api/users/topArtists
router.route('/topArtists').post(addTopArtists);

// /api/users/topTracks/:userId
router.route('/topTracks/:userId').get(getUserTracks);

// /api/users/topArtists/:userId
router.route('/topArtists/:userId').get(getUserArtists);

module.exports = router;