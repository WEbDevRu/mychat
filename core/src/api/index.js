const express = require('express');
const chatRouter = require('./chat/router');
const router = express.Router();
const httpStatus = require('http-status');

const startedAt = new Date();
router.use('/chat', chatRouter);

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        startedAt,
        serverTime: new Date(),
    });
});
module.exports = router;
