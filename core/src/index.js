const express = require('express');
const httpStatus = require('http-status');
const routes = require('./api');
const router = express.Router();
const { app } = require('./config/express');

router.use('/api', routes);

app.listen(3001, () => {
    console.log(`MyChat core started on port ${3001}`);
});

module.exports = app;

