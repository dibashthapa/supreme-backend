const express = require('express');
const smsValidation = require('../../validations/sms.validation');
const validate = require('../../middlewares/validate');
const smsController = require('../../controllers/sms.controller');

const router = express.Router();

router.route('/').post(validate(smsValidation.smsPayload), smsController.sendSms);

module.exports = router;
