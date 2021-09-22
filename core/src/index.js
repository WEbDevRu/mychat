const { app } = require('./config/express');
const { connectMongoose } = require('./config/mongoose')
const socketIO = require("socket.io");
const socketServer = require('./utils/socket/socketEngine');
const socketRouter =  require('./socket/chat/router');

async function start() {
    await connectMongoose();

    const server = app.listen(3001, () => {
        console.log(`MyChat core started on port ${3001}`);
    });

    const socket = new socketServer(server);
    socket.start()
    socket.onConnection(()=> console.log('ergrwth'))
    socketRouter(socket);

     /*io.on("connection", (socket) => {
        require('../src/services/chat/socketSendMessage')(socket, io)
        require('../src/services/chat/socketVideoConf')(socket, io)
    }) */

}

start()

module.exports = app;
