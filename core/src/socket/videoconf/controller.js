const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');
const { joinConf } = require('../../services/videoConf/joinConf');
const { updateOnlineStatus } = require('../../services/videoConf/updateOnlineStatus');

exports.joinConf = wrapAsyncMiddleware( async(req, res) => {
    await joinConf({
        user: req.data.user,
        roomId: req.data.roomId
    });
});

exports.updateOnlineStatus = wrapAsyncMiddleware( async(req, res) => {
    await updateOnlineStatus({
        user: req.data.user,
        roomId: req.data.roomId
    });
});
