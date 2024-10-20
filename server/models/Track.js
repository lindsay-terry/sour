const { Schema, model } = require('mongoose');

const trackSchema = new Schema(
    {
        name: { type: String, required: true },
        album_name: { type: String },
        album_art: { type: String },
        artist: [{ type: String, required: true },],
        preview_url: { type: String },
    },
);

const Track = model('track', trackSchema);

module.exports = Track;