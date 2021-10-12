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
        this.io.on("connection", (currentSocket) => {
            this.socket = currentSocket;
            console.log('socket Connected', currentSocket);
            currentSocket.on(path, (data) => cb(data))
        });
    }

    use(routes) {
        routes.forEach((i) => this.addRoute({ path: i.path, cb: i.cb }));
    }

    /**
    * @param {String} name
    **/
    addName(name) {
        this.socket.name = name
    }

    /**
     * @param {String} roomId
     **/
    joinRoom(roomId) {
        this.socket.join(roomId)
    }

    /**
     * @param {String} roomId
     **/
    leaveRoom(roomId) {
        this.socket.leave(roomId)
    }

    /**
     * @param {String} roomId
     * @param {String} action
     * @param {Object} data
     */

    sendToRoom(roomId, action, data) {
        this.io.to(roomId).emit(action, { ...data })
    }
}

module.exports = new socketServer();
