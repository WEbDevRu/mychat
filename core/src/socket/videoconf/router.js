const controller = require('../videoconf/controller');
const router = new (require('../../utils/socket/socketRouter'));
const { withUser } = require('../../middelwares/withUser');
const { withAuthorization } = require('../../middelwares/withAuthorization');

router.addRoute(
    'JOIN',
    withUser(),
    withAuthorization(),
    controller.joinConf,
);

module.exports = router;
