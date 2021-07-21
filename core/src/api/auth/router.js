const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { withUser } = require('../../middelwares/withUser');
const { withAuthorization } =  require('../../middelwares/withAuthorization');
const schemeValidator = require('./scheme.validator');
const dataValidator = require('./data.validator');

router.get(
    '/',
    withUser(),
    withAuthorization(),
    controller.getMe,
);

router.post(
    '/',
    schemeValidator.postMe,
    dataValidator.postMe,
    controller.postMe,
);

module.exports = router;
