const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const chatService = require('../services/chat.service');

const createRoom = catchAsync(async (req, res) => {
  const room = await chatService.createRoom(req.body);
  res.status(httpStatus.CREATED).send({ room });
});

const getMessages = catchAsync(async (req, res) => {
  const messages = await chatService.getMessages(req.params.roomId);
  res.send({ messages });
});

module.exports = {
  createRoom,
  getMessages,
};
