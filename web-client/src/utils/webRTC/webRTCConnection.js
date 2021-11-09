import { useSocket } from '../../context/SocketContext';
import {
    JOIN_VIDEO_CONF,
    VIDEO_CONF_SUCCESS_JOIN,
    UPDATE_VIDEO_CONF_ONLINE_STATUS,
} from '../../const/socket/EVENTS';

class WebRTCConnection {
    constructor({ roomId }) {
        this.roomId = roomId;
        this.socket = useSocket();
    }

    joinRoomSubscribers = [];

    updateStatusInterval = '';

    joinRoom() {
        this.socket.onEmit(JOIN_VIDEO_CONF, { roomId: this.roomId });

        this.socket.onSubscribe(VIDEO_CONF_SUCCESS_JOIN, (data) => {
            this.joinRoomSubscribers.forEach((cb) => cb(data));
            this.updateStatusInterval = setInterval(() => {
                this.socket.onEmit(UPDATE_VIDEO_CONF_ONLINE_STATUS, { roomId: this.roomId });
            }, 10000);
        });
    }

    onJoinRoom(cb) {
        this.joinRoomSubscribers.push(cb);
    }

    onForceConfLeave() {
        if (this.updateStatusInterval) {
            clearInterval(this.updateStatusInterval);
        }
    }
}

export default WebRTCConnection;
