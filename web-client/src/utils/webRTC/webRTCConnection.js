import 'webrtc-adapter';

import {
    JOIN_VIDEO_CONF,
    VIDEO_CONF_SUCCESS_JOIN,
    UPDATE_VIDEO_CONF_ONLINE_STATUS,
    VIDEO_CONF_NEW_SDP_OFFER,
    LEAVE_VIDEO_CONF,
    VIDEO_CONF_SDP_ANSWER,
    VIDEO_CONF_ICE_CANDIDATE,
    VIDEO_CONF_PARTICIPANT_LEAVE,
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
        this.inited = false;
    }

    joinRoomSubscribers = [];

    participantLeaveSubscribers = [];

    localStreamSubscribers = [];

    remoteStreamSubscribers = [];

    newPeerSubscribers = [];

    peerConnections = {};

    joinRoom = async () => {
        this.localStream = await getUserMedia({ constraints: this.mediaConstraints });
        this.localStreamSubscribers.forEach((cb) => cb(this.localStream));
        this.socket.onEmit(JOIN_VIDEO_CONF, { roomId: this.roomId });
        this.socket.onSubscribe(VIDEO_CONF_SUCCESS_JOIN, async (data) => {
            if (data.participants.length > 0) {
                const createOffersPromises = data.participants.map((u) => this.createOffer({ userData: u }));
                await Promise.all(createOffersPromises);
            }

            this.joinRoomSubscribers.forEach((cb) => cb(data));
            this.socket.onSubscribe(VIDEO_CONF_NEW_SDP_OFFER, (d) => this.handleSDPOffer(d));
            this.socket.onSubscribe(VIDEO_CONF_SDP_ANSWER, (d) => this.handleSDPAnswer(d));
            this.socket.onSubscribe(VIDEO_CONF_ICE_CANDIDATE, (d) => this.handleICECandidate(d));
        });

        this.socket.onSubscribe(VIDEO_CONF_PARTICIPANT_LEAVE, async (data) => {
            delete this.peerConnections[data.userId];
            this.participantLeaveSubscribers.forEach((cb) => cb(data));
        });

        this.updateStatusInterval = setInterval(() => {
            this.socket.onEmit(UPDATE_VIDEO_CONF_ONLINE_STATUS, { roomId: this.roomId });
        }, 10000);
    }

    createOffer = async ({ userData }) => {
        const peerConnection = new RTCPeerConnection(this.servers);
        this.localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, this.localStream);
        });

        this.newPeerSubscribers.forEach((cb) => cb({
            userData: {
                userId: userData.userId,
                username: userData.username,
            },
        }));

        const offer = await peerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        });

        this.peerConnections[userData.userId] = {
            connection: peerConnection,
        };

        this.peerConnections[userData.userId].connection.ontrack = ({ streams: [remoteStream] }) => {
            this.peerConnections[userData.userId].remoteStream = remoteStream;
            this.remoteStreamSubscribers.forEach((cb) => cb({ userId: userData.userId }));
        };

        await peerConnection.setLocalDescription(offer);

        this.peerConnections[userData.userId] = {
            connection: peerConnection,
            userData: {
                userId: userData.userId,
                username: userData.username,
            },
        };
        if (!this.inited) {
            this.socket.onEmit(VIDEO_CONF_NEW_SDP_OFFER, {
                offer,
                roomId: this.roomId,
            });
            this.inited = true;
        }
    }

    onJoinRoom(cb) {
        this.joinRoomSubscribers.push(cb);
    }

    onParticipantLeave(cb) {
        this.participantLeaveSubscribers.push(cb);
    }

    handleSDPOffer = async (data) => {
        const peerConnection = new RTCPeerConnection(this.servers);
        this.localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, this.localStream);
        });

        this.peerConnections[data.userId] = {
            connection: peerConnection,
            userData: {
                userId: data.userId,
                username: data.username,
            },
        };

        this.newPeerSubscribers.forEach((cb) => cb({
            userData: {
                userId: data.userId,
                username: data.username,
            },
        }));

        this.peerConnections[data.userId].connection.ontrack = ({ streams: [remoteStream] }) => {
            this.peerConnections[data.userId].remoteStream = remoteStream;
            this.remoteStreamSubscribers.forEach((cb) => cb({ userId: data.userId }));
        };

        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        this.peerConnections[data.userId] = {
            connection: peerConnection,
        };

        this.peerConnections[data.userId].connection.onicecandidate = (event) => {
            if (event.candidate) {
                this.socket.onEmit(VIDEO_CONF_ICE_CANDIDATE, {
                    receiverSocketId: data.senderSocketId,
                    candidate: event.candidate,
                });
            }
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
        if (this.peerConnections[data.userId].connection.iceConnectionState !== 'connected') {
            console.log(this.peerConnections[data.userId]);
            await this.peerConnections[data.userId].connection.addIceCandidate(
                new RTCIceCandidate(data.candidate),
            );
        }
    }

    onLocalStream = (cb) => {
        this.localStreamSubscribers.push(cb);
    }

    onRemoteStream = (cb) => {
        this.remoteStreamSubscribers.push(cb);
    }

    onNewPeer = (cb) => {
        this.newPeerSubscribers.push(cb);
    }

    onForceConfLeave = () => {
        this.socket.onEmit(LEAVE_VIDEO_CONF, { roomId: this.roomId });
        this.socket.onUnSubscribeFromEvent(VIDEO_CONF_SUCCESS_JOIN);
        this.socket.onUnSubscribeFromEvent(VIDEO_CONF_NEW_SDP_OFFER);
        if (this.localStream) {
            this.localStream.getTracks().forEach(function(track) {
                if (track.readyState === 'live') {
                    console.log('stop tracks');
                    track.stop();
                }
            });
        }
        clearInterval(this.updateStatusInterval);
    }
}

export default WebRTCConnection;
