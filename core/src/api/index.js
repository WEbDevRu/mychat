const express = require('express');
const chatRouter = require('./chat/router');
const authRouter = require('./auth/router');
const router = express.Router();
const httpStatus = require('http-status');

const startedAt = new Date();
router.use('/v1/messenger', chatRouter);
router.use('/v1/auth', authRouter);

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        startedAt,
        serverTime: new Date(),
    });
});
module.exports = router;
