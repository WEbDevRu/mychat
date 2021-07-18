const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');
const { User } = require('../../models/user');
const httpStatus = require('http-status');

exports.postMe = wrapAsyncMiddleware(async (req, res, next) => {
   const user = await User.findOne({
       username: req.body.username
   })
    console.log(user);
    if (user) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status: 'username exists'});
    }
    next();

})
