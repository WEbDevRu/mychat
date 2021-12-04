const httpStatus = require('http-status');
const { getChatInfo } = require('../../services/chat/getChatInfo');
const { getChatHistory } = require('../../services/chat/getChatHistory');
const { joinUserToChatWT } = require('../../services/chat/joinUserToChat');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');

exports.getChatInfo = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChatInfo({
        chatId: req.params.chatId,
        userId: req.data.user._id
    })
    return res.status(httpStatus.OK).json(result);
})

exports.getChatHistory = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChatHistory({
        chatId: req.params.chatId,
    })
    return res.status(httpStatus.OK).json(result);
})

exports.putChatJoin = wrapAsyncMiddleware( async(req, res) => {
    const result = await joinUserToChatWT({
        chatId: req.params.chatId,
        userId: req.data.user._id,
    });
    return res.status(httpStatus.OK).json(result);
})
