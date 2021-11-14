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

router.addRoute(
    'V1_UPDATE_ONLINE_STATUS',
    withUser(),
    withAuthorization(),
    controller.updateOnlineStatus,
);

router.addRoute(
    'LEAVE',
    withUser(),
    withAuthorization(),
    controller.leaveConf,
);

router.addRoute(
    'V1_NEW_SDP_OFFER',
    withUser(),
    withAuthorization(),
    controller.sendSDPOfferToRoom,
);
module.exports = router;
