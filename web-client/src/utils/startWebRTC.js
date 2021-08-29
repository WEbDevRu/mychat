import { getCookie } from './auth/getCookie';

const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:19302',
    }],
};

const onError = (error) => {
    console.error(error);
};

function onSuccess() {}

const localDescCreated = ({
    desc, pc, socketRef, chatId,
}) => {
    pc.setLocalDescription(
        desc,
        () => socketRef.current.emit('videoConf/NEW_SDP', {
            sdp: pc.localDescription,
            token: getCookie('AUTHORIZATION'),
            chatId,
        }),
        onError,
    );
};

export const startWebRTC = ({
    isOffering, socketRef, myStream, userId, chatId, setForeignStream,
}) => {
    const pc = new RTCPeerConnection(configuration);
    console.log(chatId);

    if (myStream) {
        myStream
            .getTracks()
            .forEach((track) => {
                pc.addTrack(track, myStream);
            });
    }

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            socketRef.current.emit('videoConf/NEW_ICE_CANDIDATE', {
                candidate: event.candidate,
                token: getCookie('AUTHORIZATION'),
                chatId,
            });
        }
    };

    if (isOffering) {
        pc.onnegotiationneeded = () => {
            pc.createOffer()
                .then((desc) => localDescCreated({
                    desc, pc, socketRef, chatId,
                }))
                .catch((err) => console.log(err));
        };
    }

    pc.ontrack = (event) => {
        console.log(event.streams)
        setForeignStream(event.streams[0]);
    };

    socketRef.current.on('videoConf/NEW_SDP', (data) => {
        if (data.userId !== userId) {
            pc.setRemoteDescription(new RTCSessionDescription(data.sdp), () => {
                // When receiving an offer lets answer it
                if (pc.remoteDescription.type === 'offer') {
                    pc.createAnswer()
                        .then((desc) => {
                            localDescCreated({
                                desc, pc, chatId, socketRef,
                            });
                        })
                        .catch(onError);
                }
            }, onError);
        }
    });

    socketRef.current.on('videoConf/NEW_ICE_CANDIDATE', (data) => {
        console.log(data.userId, userId);
        if (data.userId !== userId) {
            pc.addIceCandidate(
                new RTCIceCandidate(data.candidate), onSuccess, onError,
            );
        }
    });
};
