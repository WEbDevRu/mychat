const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');

class socketServer {
    constructor() {
        this.io = {}
        this.socket = {}
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
            currentSocket.on(path, (data) => {
                this.socket = currentSocket;
                this._regSocket(currentSocket, data);

                cb({
                    ...data,
                    headers: {
                        ...data.headers,
                        socket: {
                            socketId: currentSocket.id
                        }
                    }
                });
            });
        });
    }

    _regSocket = (socket, data) => {
        if (!socket.userData && data?.headers?.authToken) {
            const decoded = jwt.verify(data.headers.authToken, process.env.TOKEN_SECRET);
            socket.userData = {
                ...socket.userData,
                userId: decoded.userId
            }
        }
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
        this.socket.join(roomId);
    }

    /**
     * @param {String} roomId
     **/
    leaveRoom(roomId) {
        this.socket.leave(roomId);
    }

    /**
     * @param {String} roomId
     * @param {String} action
     * @param {Object} data
     */

    sendToRoom(roomId, action, data) {
        this.io.to(roomId).emit(action, { ...data })
    }

    /**
     * @param {String} roomId
     * @param {String} action
     * @param {Object} data
     */
    broadcastToRoom(roomId, action, data) {
        this.socket.broadcast.in(roomId).emit(action, { ...data })
    }

    /**
     * @param {String} userId
     * @param {String} action
     * @param {Object} data
     */
    sendToUserByUserId(userId, action, data) {
        this.socket.broadcast.to(otherSocket.id).emit('hello', msg);
    }

    /**
     * @param {String} action
     * @param {Object} data
     */
    sendResponseToUser(action, data) {
        this.socket.emit(action, data);
    }

    /**
     * @param {String} action
     * @param {String} socketId
     * @param {Object} data
     */
    sendToSocketBySocketId(action, socketId, data) {
        this.io.to(socketId).emit(action, data);
    }
}

module.exports = new socketServer();
