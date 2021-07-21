const httpStatus = require('http-status');

exports.withAuthorization = () => (req, res, next) => {
    const {
        data: { user } = {},
    } = req;
    console.log(req.data)
    if (!user) {
        res.status(httpStatus.UNAUTHORIZED).json({status: 'error'});
    }

    next();
};
