import {
    JOIN_VIDEO_CONF,
    VIDEO_CONF_SUCCESS_JOIN,
    UPDATE_VIDEO_CONF_ONLINE_STATUS,
    VIDEO_CONF_NEW_SDP_OFFER,
    LEAVE_VIDEO_CONF,
} from '../../const/socket/EVENTS';

class WebRTCConnection {
    constructor({ roomId, socket }) {
        this.roomId = roomId;
        this.socket = socket;
    }

    joinRoomSubscribers = [];

    peerConnections = {};

    joinRoom() {
        console.log('instance');
        this.socket.onEmit(JOIN_VIDEO_CONF, { roomId: this.roomId });

        this.socket.onSubscribe(VIDEO_CONF_SUCCESS_JOIN, (data) => {
            if (data.participants.length > 0) {
                data.participants.map((u) => this.createOffer(u.userId));
            }
            this.joinRoomSubscribers.forEach((cb) => cb(data));
        });
        this.updateStatusInterval = setInterval(() => {
            this.socket.onEmit(UPDATE_VIDEO_CONF_ONLINE_STATUS, { roomId: this.roomId });
        }, 10000);
    }

    handleSuccessJoin(data) {
        if (data.participants.length > 0) {
            data.participants.map((u) => this.createOffer(u.userId));
        }
        this.joinRoomSubscribers.forEach((cb) => cb(data));
    }

    createOffer = async (userId) => {
        const connection = new RTCPeerConnection();
        const offer = await connection.createOffer();
        this.peerConnections[userId] = {
            connection: offer,
        };

        this.socket.onEmit(VIDEO_CONF_NEW_SDP_OFFER, {
            offer,
            roomId: this.roomId,
        });
    }

    onJoinRoom(cb) {
        this.joinRoomSubscribers.push(cb);
    }

    onForceConfLeave() {
        this.socket.onEmit(LEAVE_VIDEO_CONF, { roomId: this.roomId });
        this.socket.onUnSubscribeFromEvent(VIDEO_CONF_SUCCESS_JOIN);
        clearInterval(this.updateStatusInterval);
    }
}

export default WebRTCConnection;
