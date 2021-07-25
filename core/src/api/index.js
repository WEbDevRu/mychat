const express = require('express');
const chatRouter = require('./chat/router');
const authRouter = require('./auth/router');
const router = express.Router();
const httpStatus = require('http-status');

const startedAt = new Date();
router.use('/messenger', chatRouter);
router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        startedAt,
        serverTime: new Date(),
    });
});
module.exports = router;
