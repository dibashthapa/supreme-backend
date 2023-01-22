const Joi = require('joi');

const smsPayload = {
  body: Joi.object().keys({
    number: Joi.string().required(),
    msg: Joi.string().required(),
  }),
};

module.exports = {
  smsPayload,
};
