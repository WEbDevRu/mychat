const jwt = require("jsonwebtoken");
const { User } = require('../../models/user');

const ACTIONS = {
    JOIN: 'conf/JOIN',
    LEAVE: 'conf/LEAVE',
    ADD_PEER: 'conf/ADD_PEER',
    REMOVE_PEER: 'conf/REMOVE_PEER',
    RELAY_SDP: 'conf/RELAY_SDP',
    RELAY_ICE: 'conf/RELAY_ICE',
    ICE_CANDIDATE: 'conf/ICE_CANDIDATE',
    SESSION_DESCRIPTION: 'conf/SESSION_DESCRIPTION'
};


module.exports = (socket, io) => {
    socket.on(ACTIONS.JOIN, async (data) => {
        const {
            room: roomID,
            token,
        } = data;
        const { rooms: joinedRooms } = socket;
        const userId = jwt.verify(token, process.env.TOKEN_SECRET).userId;
        const user = await User
            .findOne({ _id: userId })

        if (Array.from(joinedRooms).includes(roomID)) {
            return console.warn(`Already joined to ${roomID}`);
        }

        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        clients.forEach(clientID => {
            io.to(clientID).emit(ACTIONS.ADD_PEER, {
                peerID: socket.id,
                userId,
                username: user.toDto().username,
                createOffer: false
            });

            socket.emit(ACTIONS.ADD_PEER, {
                peerID: clientID,
                userId,
                username: user.toDto().username,
                createOffer: true,
            });
        });

        socket.join(roomID);
    });

    function leaveRoom() {
        const {rooms} = socket;

        Array.from(rooms)
            .forEach(roomID => {

                const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

                clients
                    .forEach(clientID => {
                        io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
                            peerID: socket.id,
                        });

                        socket.emit(ACTIONS.REMOVE_PEER, {
                            peerID: clientID,
                        });
                    });

                socket.leave(roomID);
            });
    }

    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);

    socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
        io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerID: socket.id,
            sessionDescription,
        });
    });

    socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
        io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
            peerID: socket.id,
            iceCandidate,
        });
    });
}
