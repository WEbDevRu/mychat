const express = require('express');
const router = express.Router();
const controller = require('./controller')
const { withAuthorization } = require('../../middelwares/withAuthorization');
const { withUser } = require('../../middelwares/withUser');
const schemeValidator = require('./scheme.validator');

router.get(
    '/',
    withUser(),
    withAuthorization(),
    controller.getChats,
);

router.get(
    '/chat/:chatId',
    withUser(),
    withAuthorization(),
    schemeValidator.getChatInfo,
    controller.getChatInfo,
)

router.get(
    '/chat/history/:chatId',
    withUser(),
    withAuthorization(),
    schemeValidator.getChatHistory,
    controller.getChatHistory,
)

module.exports = router;
