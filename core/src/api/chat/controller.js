const httpStatus = require('http-status');
const { getMessages } = require('../../..')

exports.getMessages = async (req, res) => {
    const result = await getMessages({
        message: 'test'
    })
    return res.status(httpStatus.OK).json(result);
}
