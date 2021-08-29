import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import { getCookie } from '../utils/auth/getCookie';
import { getMedia } from '../utils/getMedia';
import { startWebRTC } from '../utils/startWebRTC';
import { useAuth } from './AuthContext';

const VideoConfContext = createContext({});
export const useVideoConf = () => useContext(VideoConfContext);

export const VideoConfProvider = (props) => {
    const {
        children,
        socketRef,
    } = props;

    const {
        me,
    } = useAuth();
    const [streamConstraints, setStreamConstraints] = useState({
        audio: true,
        video: true,
    });

    const [currentChatId, setCurrentChatId] = useState('');
    const [streams, setStreams] = useState([]);
    const [foreignStream, setForeignStream] = useState();

    useEffect(() => {
        const myStream = getMedia(streamConstraints);
        myStream
            .then((stream) => {
                setStreams([stream]);
            }).catch((err) => {
                console.log(err);
            });
    }, [streamConstraints]);

    const onVideoConfJoin = ({ chatId }) => {
        const myStream = getMedia(streamConstraints);
        setCurrentChatId(chatId);
        myStream
            .then((stream) => {
                setStreams([stream]);
            }).catch((err) => {
                console.log(err);
            });

        socketRef.current.emit('videoConf/ENTER', {
            chatId,
            token: getCookie('AUTHORIZATION'),
        });
    };

    useEffect(() => {
        socketRef.current.on('videoConf/ENTER_SUCCESS', (data) => {
            const isOffering = data.participants.length === 2;
            startWebRTC({
                isOffering,
                socketRef,
                myStream: streams[0],
                myId: me.id,
                chatId: currentChatId,
                setForeignStream,
            });
        });
    }, [currentChatId, streams]);

    return (
        <VideoConfContext.Provider value={{
            streamConstraints,
            setStreamConstraints,
            onVideoConfJoin,
            streams,
            foreignStream,
        }}
        >
            {children}
        </VideoConfContext.Provider>
    );
};

VideoConfProvider.propTypes = {
    children: PropTypes.any,
    socketRef: PropTypes.object,
};

VideoConfProvider.defaultProps = {
    children: null,
    socketRef: {},
};
