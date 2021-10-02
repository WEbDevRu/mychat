const { enterChat } = require('../../services/chat/enterChat');
const { sendNewMessage } = require('../../services/chat/sendNewMessage');
const { leaveChat } = require('../../services/chat/leaveChat');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');

exports.enterChat = wrapAsyncMiddleware( async(req, res) => {
    await enterChat({ user: req.data.user,  chatId: req.data.chatId});
});

exports.sendNewMessage = wrapAsyncMiddleware(async(req, res) => {
    await sendNewMessage({ senderId: req.data.user._id, data: req.data })
});

exports.leaveChat = wrapAsyncMiddleware(async(req, res) => {
    await leaveChat({ chatId: req.data.chatId })
});
