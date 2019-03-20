var mongoose = require('mongoose');

var usersSchema = require('../schemas/Newproject');

module.exports = mongoose.model('Newproject', usersSchema, 'newProject');