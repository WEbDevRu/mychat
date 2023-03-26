const express = require('express');
const router = express.Router();
const controller = require('./controller')
const { withAuthorization } = require('../../middelwares/withAuthorization');
const { withUser } = require('../../middelwares/withUser');
const schemeValidator = require('./scheme.validator');

router.get(
    '/chat/:chatId',
    withUser(),
    withAuthorization(),
    schemeValidator.getChat,
    controller.getChat,
);

module.exports = router;
