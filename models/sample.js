const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Sample = mongoose.model('Sample', sampleSchema);

module.exports = Sample;
