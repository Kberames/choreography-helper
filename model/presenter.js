// Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

// Grab the schema object from mongoose.
var Schema = mongoose.Schema;

// Create a schema for the Presenter.
var presenterSchema = new Schema ({
    name : String,
    title : String,
    location : String,
    webPage : String});

// Create the Presenter model object.
var Presenter = mongoose.model ('Presenter', trackSchema);

// Make my Presenter object available to other nodejs modules.
module.exports = Presenter;
