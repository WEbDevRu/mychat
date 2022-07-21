const httpStatus = require('http-status');
const { generateAccessToken} = require('../../services/stream/generateAccessToken');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');

exports.generateAccessToken = wrapAsyncMiddleware( async(req, res) => {
    const result = await generateAccessToken({
        userId: req.data.user?._id,
        chatId: req.params?.chatId
    });
    return res.status(httpStatus.OK).json(result);
});
