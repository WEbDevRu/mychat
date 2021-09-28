const httpStatus = require('http-status');

exports.withAuthorization = () => (req, res, next) => {
    const {
        data: { user } = {},
    } = req;
    if (!user && res) {
        res.status(httpStatus.UNAUTHORIZED).json({status: 'error'});
    }
    if (next) {
        next();
    }
    return req
};
