const express = require('express');
const httpStatus = require('http-status');
const routes = require('./api');
const router = express.Router();
const startedAt = new Date();

router.use('/api', routes);

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        startedAt,
        serverTime: new Date(),
    });
});

module.exports = router;
