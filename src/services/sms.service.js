const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const sendSms = async (number, msg) => {
  const resp = await fetch(
    `http://api.sparrowsms.com/v2/sms/?token=${config.sms.token}&from=${config.sms.identity}&to=${number}&text=${msg}`
  );

  console.log('status', resp.status);

  const data = await resp.text();
  console.log('response', data);

  if (resp.status >= 400) {
    throw new ApiError(httpStatus.BAD_REQUEST, data);
  }
};

module.exports = {
  sendSms,
};
