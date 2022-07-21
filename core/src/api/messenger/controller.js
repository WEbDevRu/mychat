const httpStatus = require('http-status');
const { getChats } = require('../../services/messenger/getChats');
const { findChats } = require('../../services/messenger/findChats');
const { createGroup } = require('../../services/messenger/createGroup');
const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');

exports.getChats = wrapAsyncMiddleware( async(req, res) => {
    const result = await getChats({
        userId: req.data.user?._id,
    });
    return res.status(httpStatus.OK).json(result);
});

exports.findChats = wrapAsyncMiddleware( async(req, res) => {
    const result = await findChats({ searchString: req.query.searchString });
    return res.status(httpStatus.OK).json(result);
});

exports.createGroup = wrapAsyncMiddleware( async(req, res) => {
    const result = await createGroup({
        userId: req.data.user._id,
        name: req.body.name,
        description: req.body.description
    });

    return res.status(httpStatus.OK).json(result);
})
