const router = require('express').Router();
const {
    createUser,
    sourLogin
} = require('../../controllers/userController');

// /api/users endpoint to create new user
router.route('/').post(createUser);

// /api/users/login endpoint to login
router.route('/login').post(sourLogin);


module.exports = router;