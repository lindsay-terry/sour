const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        external_url: { type: String, required: true },
        profile_image: { type: String },
        spotify_id: { type: String, required: true, unique: true },
        top_tracks: [{ type: Schema.Types.ObjectId, ref: 'track' },],
        top_artists: [{ type: Schema.Types.ObjectId, ref: 'artist' },],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' },],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;