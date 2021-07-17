const express = require('express');
const httpStatus = require('http-status');
const routes = require('./api');
const router = express.Router();
const { app } = require('./config/express');
const { connectMongoose } = require('./config/mongoose')

async function start() {
    await connectMongoose();

    app.listen(3001, () => {
        console.log(`MyChat core started on port ${3001}`);
    });
}

start()

module.exports = app;

