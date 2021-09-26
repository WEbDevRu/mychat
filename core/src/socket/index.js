const router = require('../utils/socket/socketRouter');
const chatRouter = require('../socket/chat/router');

router.use('chat', chatRouter);

module.exports =  router
