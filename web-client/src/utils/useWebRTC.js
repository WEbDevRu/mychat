import { useEffect, useRef, useCallback } from 'react';
import useStateWithCallback from './useStateWithCallback';
import { getCookie } from './auth/getCookie';

const ACTIONS = {
    JOIN: 'conf/JOIN',
    LEAVE: 'conf/LEAVE',
    ADD_PEER: 'conf/ADD_PEER',
    REMOVE_PEER: 'conf/REMOVE_PEER',
    RELAY_SDP: 'conf/RELAY_SDP',
    RELAY_ICE: 'conf/RELAY_ICE',
    ICE_CANDIDATE: 'conf/ICE_CANDIDATE',
    SESSION_DESCRIPTION: 'conf/SESSION_DESCRIPTION',
};

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export default function useWebRTC({ roomID, socketRef }) {
    const [clients, updateClients] = useStateWithCallback([]);

    const addNewClient = useCallback((newClient, cb) => {
        updateClients((list) => {
            if (!list.find((c) => c.peerID === newClient.peerID)) {
                return [...list, newClient];
            }

            return list;
        }, cb);
    }, [clients, updateClients]);

    const peerConnections = useRef({});
    const localMediaStream = useRef(null);
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null,
    });

    useEffect(() => {
        async function handleNewPeer({
            peerID,
            userId,
            username,
            createOffer,
        }) {
            if (peerID in peerConnections.current) {
                return console.warn(`Already connected to peer ${peerID}`);
            }

            peerConnections.current[peerID] = new RTCPeerConnection({
                iceServers: [{
                    url: 'stun:stun.l.google.com:19302',
                }],
            });

            peerConnections.current[peerID].onicecandidate = (event) => {
                if (event.candidate) {
                    socketRef.current.emit(ACTIONS.RELAY_ICE, {
                        peerID,
                        iceCandidate: event.candidate,
                    });
                }
            };

            let tracksNumber = 0;
            peerConnections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
                tracksNumber++;

                if (tracksNumber === 2) {
                    tracksNumber = 0;
                    addNewClient({
                        peerID,
                        userId,
                        username,
                        isMe: false,
                    }, () => {
                        if (peerMediaElements.current[peerID]) {
                            peerMediaElements.current[peerID].srcObject = remoteStream;
                        } else {
                            let settled = false;
                            const interval = setInterval(() => {
                                if (peerMediaElements.current[peerID]) {
                                    peerMediaElements.current[peerID].srcObject = remoteStream;
                                    settled = true;
                                }

                                if (settled) {
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }
                    });
                }
            };

            localMediaStream.current.getTracks().forEach((track) => {
                peerConnections.current[peerID].addTrack(track, localMediaStream.current);
            });

            if (createOffer) {
                const offer = await peerConnections.current[peerID].createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });

                await peerConnections.current[peerID].setLocalDescription(offer);

                socketRef.current.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    sessionDescription: offer,
                });
            }
        }

        socketRef.current.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            socketRef.current.off(ACTIONS.ADD_PEER);
        };
    }, []);

    useEffect(() => {
        async function setRemoteMedia({ peerID, sessionDescription: remoteDescription }) {
            await peerConnections.current[peerID]?.setRemoteDescription(
                new RTCSessionDescription(remoteDescription),
            );

            if (remoteDescription.type === 'offer') {
                const answer = await peerConnections.current[peerID].createAnswer();

                await peerConnections.current[peerID].setLocalDescription(answer);

                socketRef.current.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    sessionDescription: answer,
                });
            }
        }

        socketRef.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

        return () => {
            socketRef.current.off(ACTIONS.SESSION_DESCRIPTION);
        };
    }, []);

    useEffect(() => {
        socketRef.current.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }) => {
            peerConnections.current[peerID]?.addIceCandidate(
                new RTCIceCandidate(iceCandidate),
            );
        });

        return () => {
            socketRef.current.off(ACTIONS.ICE_CANDIDATE);
        };
    }, []);

    useEffect(() => {
        const handleRemovePeer = ({ peerID }) => {
            if (peerConnections.current[peerID]) {
                peerConnections.current[peerID].close();
            }

            delete peerConnections.current[peerID];
            delete peerMediaElements.current[peerID];

            updateClients((list) => list.filter((c) => c.peerID !== peerID));
        };

        socketRef.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return () => {
            socketRef.current.off(ACTIONS.REMOVE_PEER);
        };
    }, []);

    useEffect(() => {
        async function startCapture() {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 1280,
                    height: 720,
                },
            });

            addNewClient({
                isMe: true,
                peerID: LOCAL_VIDEO,
            }, () => {
                const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

                if (localVideoElement) {
                    localVideoElement.volume = 0;
                    localVideoElement.srcObject = localMediaStream.current;
                }
            });
        }

        startCapture()
            .then(() => socketRef.current.emit(ACTIONS.JOIN, {
                room: roomID,
                token: getCookie('AUTHORIZATION'),
            }))
            .catch((e) => console.error('Error getting userMedia:', e));

        return () => {
            if (localMediaStream.current) {
                localMediaStream.current.getTracks().forEach((track) => track.stop());
                socketRef.current.emit(ACTIONS.LEAVE);
            }
        };
    }, [roomID]);

    const provideMediaRef = useCallback((id, node) => {
        peerMediaElements.current[id] = node;
    }, []);

    return {
        clients,
        provideMediaRef,
    };
}
