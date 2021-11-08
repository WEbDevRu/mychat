import { useSocket } from '../../context/SocketContext';
import { JOIN_VIDEO_CONF } from '../../const/socket/EVENTS';

class WebRTCConnection {
    constructor({ roomId }) {
        this.roomId = roomId;
        this.socket = useSocket();
        this.joinRoomSubscribers = [];
    }

    joinRoom() {
        this.socket.onEmit(JOIN_VIDEO_CONF, { roomId: this.roomId });
        this.socket.onSubscribe(JOIN_VIDEO_CONF, (data) => {
            this.joinRoomSubscribers.forEach((cb) => cb(data));
        });
    }

    onJoinRoom(cb) {
        this.joinRoomSubscribers.push(cb);
    }
}

export default WebRTCConnection;
