const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    // Create user on DB
    async createUser(req, res) {
        console.log('VARIABLES IN CREATE USER', req.body);
        const { username, spotify_id, external_url, profile_image } = req.body;
        try {
            const user = await User.create(req.body);
            console.log('CREATED USER', user);
            const token = signToken({ username: user.username, _id: user._id, spotify_id: user.spotify_id });
            res.status(200).json({ user, token, message: 'User created successfully!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Error communicating with server.  Failed to create new user.', error: error.message });
            console.error(error);
        }
    },

    async sourLogin(req, res) {
        try {
            const { spotify_id } = req.body
            console.log('REQ BODY FROM SOUR LOGIN', req.body)
            const user = await User.findOne({ spotify_id });

            if (!user) {
                console.log('User not part of DB');
                return res.status(404).json({ message: 'User not found' });
            }
            const token = signToken(user);
            return res.status(200).json({ token, user });
        } catch (error) {
            console.error('Login error,', error.message)
        }
    }
}