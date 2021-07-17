const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { withUser } = require('../../middelwares/withUser');
const { withAuthorization } =  require('../../middelwares/withAuthorization');

router.get(
    '/',
    withUser(),
    withAuthorization(),
    controller.getMe,
);

module.exports = router;
