const socketIO = require("socket.io");

class socketServer {
    constructor(httpServer) {
        this.httpServer = httpServer
    }

    start() {
            this.io = (socketIO)(this.httpServer, {
                cors: {
                    origin: "*",
                },
            });
    }

    onConnection(cb) {
        this.io.sockets.on('connection', cb);
    }

    addRoute({ path, cb }) {
        this.io.on("connection", (socket) =>
            socket.on(path, cb)
        )
    }
}

module.exports = socketServer;
