const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

roomSchema.plugin(toJSON);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
