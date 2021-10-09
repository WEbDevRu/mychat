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
    '/chats',
    withUser(),
    withAuthorization(),
    schemeValidator.getChatsList,
    controller.findChats,
);

module.exports = router;
