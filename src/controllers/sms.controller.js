const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const smsService = require('../services/sms.service');

const sendSms = catchAsync(async (req, res) => {
  const { number, msg } = req.body;
  await smsService.sendSms(number, msg);
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  sendSms,
};
