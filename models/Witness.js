var mongoose = require('mongoose');

var usersSchema = require('../schemas/Witness');

module.exports = mongoose.model('Witness', usersSchema, 'witness');