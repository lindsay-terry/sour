const router = require('express').Router();
const {
    createUser,
} = require('../../controllers/userController');

// /api/users endpoint to create new user
router.route('/').post(createUser);


module.exports = router;