const express = require('express');
const chatRouter = require('./chat/router');
const authRouter = require('./auth/router');
const messengerRouter = require('./messenger/router');
const router = express.Router();
const httpStatus = require('http-status');

const startedAt = new Date();
router.use('/v1/chat', chatRouter);
router.use('/v1/auth', authRouter);
router.use('/v1/messenger', messengerRouter);

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        startedAt,
        serverTime: new Date(),
    });
});
module.exports = router;
