const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');

exports.joinConf = wrapAsyncMiddleware( async(req, res) => {
    await joinConf({ user: req.data.user,  chatId: req.data.chatId});
});

