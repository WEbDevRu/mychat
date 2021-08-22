const express = require('express');
const httpStatus = require('http-status');
const routes = require('./api');
const router = express.Router();
const { app } = require('./config/express');
const { connectMongoose } = require('./config/mongoose')
const server = require("http").createServer();
const socketIO = require("socket.io");

async function start() {
    await connectMongoose();
    const io = (socketIO)(server, {
        cors: {
            origin: "*",
        },
    });
    io.sockets.on('connection', function (socket) {
        socket.on('message', function () { });
        socket.on('disconnect', function () { });
    });

    app.listen(3001, () => {
        console.log(`MyChat core started on port ${3001}`);
    });

}

start()

module.exports = app;

