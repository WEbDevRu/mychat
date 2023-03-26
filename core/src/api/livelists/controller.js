const httpStatus = require('http-status');
const { getChat } = require('../../services/livelists/getChat');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');

exports.getChat = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChat({
        userId: req.data.user?._id,
        chatId: req.params.chatId,
    });
    return res.status(httpStatus.OK).json(result);
});
