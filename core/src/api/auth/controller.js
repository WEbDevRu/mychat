const httpStatus = require('http-status');
const { getMessagesWT } = require('../../services/chat/getMessages');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');
const { getUserInfo } = require('../../services/auth/getUserInfo');
const { createUser } =  require('../../services/auth/createUser');

exports.getMe = wrapAsyncMiddleware( async(req, res) => {
    const result = await getUserInfo({
        user: req.data.user,
    })
    return res.status(httpStatus.OK).json(result);
})

exports.postMe = wrapAsyncMiddleware(async(req, res) => {
    const result = await createUser({
        username: req.body.username,
    })
    return res.status(httpStatus.OK).json(result);
})
