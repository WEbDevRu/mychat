const router = require('../utils/socket/socketRouter');
const chatRouter = require('../socket/chat/router');
const videoConfRouter = require('../socket/videoconf/router');

router.use('chat', chatRouter);
router.use('videoConf', videoConfRouter);

module.exports =  router
