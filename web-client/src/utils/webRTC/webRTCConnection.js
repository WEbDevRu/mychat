import { useSocket } from '../../context/SocketContext';
import { JOIN_VIDEO_CONF } from '../../const/socket/EVENTS';

class WebRTCConnection {
    constructor({ roomId }) {
        this.roomId = roomId;
        this.socket = useSocket();
    }

    joinRoom() {
        this.socket.onEmit(JOIN_VIDEO_CONF, { roomId: this.roomId });
    }
}

export default WebRTCConnection;
