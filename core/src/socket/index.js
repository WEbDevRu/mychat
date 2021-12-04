const { router } = require('../utils/socket/socketRouter');
const chatRouter = require('../socket/chat/router');
const videoConfRouter = require('../socket/videoconf/router');

router.use('videoConf', videoConfRouter);
router.use('chat', chatRouter);

module.exports = router
