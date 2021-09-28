const controller = require('../chat/controller');
const router = require('../../utils/socket/socketRouter');
const { withUser } = require('../../middelwares/withUser');
const { withAuthorization } = require('../../middelwares/withAuthorization');

router.addRoute(
    'ENTER',
    withUser(),
    withAuthorization(),
    controller.enterChat
);

router.addRoute(
    'NEW_MESSAGE',
    withUser(),
    withAuthorization(),
    controller.sendNewMessage
);

router.addRoute(
    'LEAVE',
    withUser(),
    withAuthorization(),
    controller.leaveChat
);

module.exports = router;
