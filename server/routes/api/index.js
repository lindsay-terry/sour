const router = require('express').Router();
const userRoutes = require('./userRoutes');

// /api endpoint
router.use('/users', userRoutes);

module.exports = router;