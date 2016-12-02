// Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

// Grab the schema object from mongoose.
var Schema = mongoose.Schema;

// Create a schema for the Track.
var trackSchema = new Schema ({
    program : String,
    number : Number,
    quarter : Number,
    year : Number,
    sizzler : String,
    numBonus : Number,
    track1 : String,
    track2 : String,
    numPresenters : Number,
    presenter1 : String
});

// Create the Track model object.
var Track = mongoose.model ('Track', trackSchema);

// Make my Track object available to other nodejs modules.
module.exports = Track;
