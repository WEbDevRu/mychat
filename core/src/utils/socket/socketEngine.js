const socketIO = require("socket.io");

class socketServer {
    constructor() {

    }

    start(httpServer) {
            this.io = (socketIO)(httpServer, {
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

    use(routes) {
        routes.forEach((i) => this.addRoute({ path: i.path, cb: i.cb }));
    }
}

module.exports = new socketServer();
