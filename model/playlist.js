// Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

// Grab the schema object from mongoose.
var Schema = mongoose.Schema;

// Create a schema for the Presenter.
var playlistSchema = new Schema ({
    name : String,
    format: Number, // format type (30 or 60)
                    // 30 min format has 5 tracks
                    // 60 min format has 10 tracks

    // Playlist belongs to one user.
    user: { type: Schema.Types.ObjectId, ref: 'User'},

    // Need to know which release for each track.
    releases: [{ type: Schema.Types.ObjectId, ref: 'Release'}]

});

// Create the Presenter model object.
var Playlist = mongoose.model ('Playlist', playlistSchema);

// Make my Presenter object available to other nodejs modules.
module.exports = Playlist;
