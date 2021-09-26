const controller = require('../chat/controller');
const router = require('../../utils/socket/socketRouter');

router.addRoute(
    'ENTER',
    controller.enterChat
);

module.exports = router;
