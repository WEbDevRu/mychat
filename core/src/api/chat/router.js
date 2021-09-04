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

router.put(
    '/chat/:chatId/join',
    withUser(),
    withAuthorization(),
    schemeValidator.putChatJoin,
    controller.putChatJoin,
);

router.get(
    '/chat/history/:chatId',
    withUser(),
    withAuthorization(),
    schemeValidator.getChatHistory,
    controller.getChatHistory,
)

router.get(
    '/chats',
    withUser(),
    withAuthorization(),
    schemeValidator.getChatsList,
    controller.getChatsList,
)

module.exports = router;
