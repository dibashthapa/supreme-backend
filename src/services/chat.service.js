const Message = require('../models/message.model');
const Room = require('../models/room.model');

const createRoom = async ({ name }) => {
  const room = await Room.create({ name });
  return room;
};

const getMessages = async (roomId) => {
  const messages = await Message.find({ room_id: roomId }).lean();
  return messages;
};
module.exports = {
  createRoom,
  getMessages,
};
