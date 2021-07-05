const express = require('express');
const chatRouter = require('./chat/router');

const router = express.Router();

router.use('/chat', chatRouter);


module.exports = router;
