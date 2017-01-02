// Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

// Grab the schema object from mongoose.
var Schema = mongoose.Schema;

// Create a schema for the Track.
var trackSchema = new Schema ({
    type : String,
    songTitle : String,
    artist : String,
    length : String,
    exercises : String,
    lyrics : String,
    searchTags : String,
    pdfPage: Number,

    release: { type: Schema.Types.ObjectId, ref: 'Release'},

    // Set an array of presenter objects to be
    // linked or referenced by the Track schema.
    presenters: [{ type: Schema.Types.ObjectId, ref: 'Presenter'}]
});

// Create the Track model object.
var Track = mongoose.model ('Track', trackSchema);

// Make my Track object available to other nodejs modules.
module.exports = Track;
