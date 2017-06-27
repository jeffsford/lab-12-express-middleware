'use strict';

const mongoose = require('mongoose');

const studentSchema = mongoose.Schema( {
  name: {type: String, required: true, unique: true},
  age: {type: String, required: true},
  gender: {type: String, required: true},
});

const Student = module.exports = mongoose.model('student', studentSchema);
