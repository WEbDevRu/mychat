const httpStatus = require('http-status');
const { getChats } = require('../../services/messenger/getChats');
const { getChatsList } = require('../../services/messenger/getChatsList');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');

exports.getChats = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChats({
        userId: req.data.user._id,
    })
    return res.status(httpStatus.OK).json(result);
})

exports.getChatsList = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChatsList({ searchString: req.query.searchString });
    return res.status(httpStatus.OK).json(result);
})

