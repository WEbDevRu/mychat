const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');
const { joinConf } = require('../../services/videoConf/joinConf');

exports.joinConf = wrapAsyncMiddleware( async(req, res) => {
    await joinConf({
        user: req.data.user,
        roomId: req.data.roomId
    });
});

