const { Schema, model } = require('mongoose');

const artistSchema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        popularity: { type: Number },
        genres: [{ type: String },],
        external_url: { type: String },
    },
);

const Artist = model('artist', artistSchema);

module.exports = Artist;