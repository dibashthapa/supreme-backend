const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

roleSchema.plugin(toJSON);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
