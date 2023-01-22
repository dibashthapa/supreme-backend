const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const messageSchema = new mongoose.Schema({
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Room',
    required: true,
  },
  sender: {
    type: String,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.plugin(toJSON);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
