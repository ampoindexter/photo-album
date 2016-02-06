'use strict';

var mongoose = require('mongoose');

var Album;

var albumSchema = mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
});

Album = mongoose.model('Album', albumSchema);

module.exports = Album;