const { User, Track, Artist } = require('../models');
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
            // overwrite tracks so there are only 20 at a time
            user.top_tracks = [...new Set([...trackIds, ...user.top_tracks])].slice(0, 20);
            await user.save();

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error saving top tracks', error);
            return res.status(500).json({ message: 'Server error saving track data.' });
        }
    },

    async addTopArtists(req, res) {
        const { spotify_id, topArtists } = req.body;
  
        try {
            const user = await User.findOne({ spotify_id });

            if (!user) {
                return res.status(404).json({ message: 'User not found with that Spotify ID.' });
            }

            const artistIds = [];

            for (const artistData of topArtists) {
                let artist = await Artist.findOne({ name: artistData.name });
                if (!artist) {
                    artist = await Artist.create(artistData);
                }
                artistIds.push(artist._id);
            }
            // Overwrite artists so there are only 20 at a time
            user.top_artists = [...new Set(artistIds)].slice(0, 20);
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            console.error('Error saving top artists', error);
            return res.status(500).json({ message: 'Server error saving artist data.' });
        }
    },

    async getUserTracks(req, res) {
        const { userId } = req.params;
        try {
            const user = await User.findOne({ spotify_id: userId }).populate('top_tracks');

            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const tracks = user.top_tracks;
            return res.status(200).json(tracks);
        } catch (error) {
            console.error('Error retrieving user tracks', error);
            return res.status(500).json({ message: 'Server error retrieving track data.' });
        }
    },

    async getUserArtists(req, res) {
        const { userId } = req.params;
        try {
            const user = await User.findOne({ spotify_id: userId }).populate('top_artists');

            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const artists = user.top_artists;
            return res.status(200).json(artists);
        } catch (error) {
            console.error('Error retrieving user artists', error);
            return res.status(500).json({ message: 'Server error retrieving artist data.' });
        }
    }
}