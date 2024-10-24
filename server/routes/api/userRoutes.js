const router = require('express').Router();
const {
    createUser,
    sourLogin,
    getUserProfile,
    addTopTracks,
    addTopArtists,
} = require('../../controllers/userController');

// /api/users endpoint to create new user
router.route('/').post(createUser);

// /api/users/login endpoint to login
router.route('/login').post(sourLogin);

// /api/users/:spotifyId
router.route('/:spotifyId').get(getUserProfile);

// /api/users/addTopTracks
router.route('/addTopTracks').post(addTopTracks)

// /api/users/addTopArtists
router.route('/addTopArtists').post(addTopArtists);


module.exports = router;