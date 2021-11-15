import 'webrtc-adapter';

import {
    JOIN_VIDEO_CONF,
    VIDEO_CONF_SUCCESS_JOIN,
    UPDATE_VIDEO_CONF_ONLINE_STATUS,
    VIDEO_CONF_NEW_SDP_OFFER,
    LEAVE_VIDEO_CONF,
    VIDEO_CONF_SDP_ANSWER,
    VIDEO_CONF_ICE_CANDIDATE,
} from '../../const/socket/EVENTS';
import { getUserMedia } from './getUserMedia';

class WebRTCConnection {
    constructor({
        roomId,
        socket,
        servers,
        mediaConstraints,
    }) {
        this.roomId = roomId;
        this.socket = socket;
        this.servers = servers;
        this.mediaConstraints = mediaConstraints;
        this.localStream = '';
    }

    joinRoomSubscribers = [];

    peerConnections = {};

    joinRoom = async () => {
        this.localStream = await getUserMedia({ constraints: this.mediaConstraints });
        this.socket.onEmit(JOIN_VIDEO_CONF, { roomId: this.roomId });
        this.socket.onSubscribe(VIDEO_CONF_SUCCESS_JOIN, async (data) => {
            if (data.participants.length > 0) {
                const createOffersPromises = data.participants.map((u) => this.createOffer(u.userId));
                await Promise.all(createOffersPromises);

                const peerConnection = new RTCPeerConnection(this.servers);

                this.localStream.getTracks().forEach((track) => {
                    peerConnection.addTrack(track, this.localStream);
                });

                let negotiating = false;
                peerConnection.onnegotiationneeded = async () => {
                    try {
                        if (negotiating || peerConnection.signalingState !== 'stable') return;
                        negotiating = true;
                        const offer = await peerConnection.createOffer();
                        await peerConnection.setLocalDescription(offer);
                        this.socket.onEmit(VIDEO_CONF_NEW_SDP_OFFER, {
                            offer,
                            roomId: this.roomId,
                        });
                    } finally {
                        negotiating = false;
                    }
                };
            }

            this.joinRoomSubscribers.forEach((cb) => cb(data));
            this.socket.onSubscribe(VIDEO_CONF_NEW_SDP_OFFER, (d) => this.handleSDPOffer(d));
            this.socket.onSubscribe(VIDEO_CONF_SDP_ANSWER, (d) => this.handleSDPAnswer(d));
            this.socket.onSubscribe(VIDEO_CONF_ICE_CANDIDATE, (d) => this.handleICECandidate(d));
        });
        this.updateStatusInterval = setInterval(() => {
            this.socket.onEmit(UPDATE_VIDEO_CONF_ONLINE_STATUS, { roomId: this.roomId });
        }, 10000);
    }

    createOffer = async (userId) => {
        const peerConnection = new RTCPeerConnection(this.servers);
        this.localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, this.localStream);
        });
        let negotiating = false;
        peerConnection.onnegotiationneeded = async () => {
            try {
                if (negotiating || peerConnection.signalingState !== 'stable') return;
                negotiating = true;
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                this.peerConnections[userId] = {
                    connection: peerConnection,
                };
            } finally {
                negotiating = false;
            }
        };
    }

    onJoinRoom(cb) {
        this.joinRoomSubscribers.push(cb);
    }

    handleSDPOffer = async (data) => {
        const peerConnection = new RTCPeerConnection(this.servers);
        this.localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, this.localStream);
        });
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        this.peerConnections[data.userId] = {
            connection: peerConnection,
        };

        this.socket.onEmit(VIDEO_CONF_SDP_ANSWER, {
            answer,
            receiverSocketId: data.senderSocketId,
        });
    }

    handleSDPAnswer = async (data) => {
        await this.peerConnections[data.userId].connection.setRemoteDescription(new RTCSessionDescription((data.answer)));

        this.peerConnections[data.userId].connection.onicecandidate = (event) => {
            if (event.candidate) {
                this.socket.onEmit(VIDEO_CONF_ICE_CANDIDATE, {
                    receiverSocketId: data.senderSocketId,
                    candidate: event.candidate,
                });
            }
        };
    }

    handleICECandidate = async (data) => {
        this.peerConnections[data.userId]?.connection.addIceCandidate(
            new RTCIceCandidate(data.candidate),
        );
    }

    onForceConfLeave() {
        this.socket.onEmit(LEAVE_VIDEO_CONF, { roomId: this.roomId });
        this.socket.onUnSubscribeFromEvent(VIDEO_CONF_SUCCESS_JOIN);
        this.socket.onUnSubscribeFromEvent(VIDEO_CONF_NEW_SDP_OFFER);
        clearInterval(this.updateStatusInterval);
    }
}

export default WebRTCConnection;
