const { app } = require('./config/express');
const { connectMongoose } = require('./config/mongoose')
const socketServer = require('./utils/socket/socketEngine');
const routes =  require('./socket/index');

async function start() {
    await connectMongoose();

    const server = app.listen(3001, () => {
        console.log(`MyChat core started on port ${3001}`);
    });

    socketServer.start(server)
    socketServer.use(routes.routes);
}

start()

