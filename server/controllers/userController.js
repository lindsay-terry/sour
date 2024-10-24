const { User, Track } = require('../models');
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
    },

    async getUserProfile(req, res) {
        const { spotifyId } = req.params
        console.log('REQ BODY FROM GETUSERPROFILE', req.params)
        try {
            const user = await User.findOne({ spotify_id: spotifyId });

            if (!user) {
                return res.status(404).json({ message: 'User not found with that Spotify ID' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user profile', error);
            return res.status(500).json({ message: 'Internal server error, error fetching user profile.' });
        }
    },

    async addTopTracks(req, res) {
        const { spotify_id, topTracks } = req.body;
        try {
            const user = await User.findOne({ spotify_id });
            if (!user) {
                return res.status(404).json({ message: 'User not found with that Spotify ID.' });
            }
            const trackIds = [];

            for (const trackData of topTracks) {
                let track = await Track.findOne({ name: trackData.name, artist: { $in: trackData.artist.map(artist => artist.name) } });
                if (!track) {
                    track = await Track.create(trackData);
                }
                trackIds.push(track._id);
            }

            user.top_tracks = [...new Set([...trackIds, ...user.top_tracks])].slice(0, 20);
            await user.save();

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error saving top tracks', error);
            return res.status(500).json({ message: 'Server error saving track data.' });
        }
    }
}