const controller = require('../chat/controller');
const router = require('../../utils/socket/socketRouter');
const { withUser } = require('../../middelwares/withUser');
const { withAuthorization } = require('../../middelwares/withAuthorization');

router.addRoute(
    'JOIN',
    withUser(),
    withAuthorization(),
    controller.join
);

module.exports = router;
