// Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

// Grab the schema object from mongoose.
var Schema = mongoose.Schema;

// Create a schema for the Release.
var releaseSchema = new Schema ({
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

// Create the Release model object.
var Release = mongoose.model ('Release', releaseSchema);

// Make my Release object available to other nodejs modules.
module.exports = Release;
