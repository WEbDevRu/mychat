const httpStatus = require('http-status');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');
const { getUserInfo } = require('../../services/auth/getUserInfo');
const { createUserWT } =  require('../../services/auth/createUser');

exports.getMe = wrapAsyncMiddleware( async(req, res) => {
    const result = await getUserInfo({
        user: req.data.user,
    })
    return res.status(httpStatus.OK).json(result);
})

exports.postMe = wrapAsyncMiddleware(async(req, res) => {
    const result = await createUserWT({
        username: req.body.username,
    })

    const expiresDate = Date.now() + 365*24*60*60*1000;
    res.cookie('AUTHENTICATION', result.accessToken, {
        expires: new Date(expiresDate)
    });

    return res.status(httpStatus.OK).json(result);
})
