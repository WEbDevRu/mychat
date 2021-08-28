const httpStatus = require('http-status');
const { getChats } = require('../../services/chat/getChats');
const { getChatInfo } = require('../../services/chat/getChatInfo');
const { getChatHistory } = require('../../services/chat/getChatHistory');
const { getChatsList } = require('../../services/chat/getChatsList');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');

exports.getChats = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChats({
        userId: req.data.user._id,
    })
    return res.status(httpStatus.OK).json(result);
})

exports.getChatInfo = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChatInfo({
        chatId: req.params.chatId,
    })
    return res.status(httpStatus.OK).json(result);
})

exports.getChatHistory = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChatHistory({
        chatId: req.params.chatId,
    })
    return res.status(httpStatus.OK).json(result);
})

exports.getChatsList = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChatsList()
    return res.status(httpStatus.OK).json(result);
})
