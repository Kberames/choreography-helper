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
    // ,
    // // Set an array of track objects to be
    // // linked or referenced by the Release schema.
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track'}],
    //
    // // Set an array of presenter objects to be
    // // linked or referenced by the Release schema.
    presenters: [{ type: Schema.Types.ObjectId, ref: 'Presenter'}]
});

// Create the Release model object.
var Release = mongoose.model ('Release', releaseSchema);

// Make my Release object available to other nodejs modules.
module.exports = Release;
