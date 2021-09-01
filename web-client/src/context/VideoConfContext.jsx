import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import { getMedia } from '../utils/getMedia';

const VideoConfContext = createContext({});
export const useVideoConf = () => useContext(VideoConfContext);

export const VideoConfProvider = (props) => {
    const {
        children,
        socketRef,
    } = props;
    const [streamConstraints, setStreamConstraints] = useState({
        audio: true,
        video: true,
    });

    const myStream = useRef();

    useEffect(() => {
        const media = getMedia(streamConstraints);
        media
            .then((stream) => {
                myStream.current = stream;
            }).catch((err) => {
                console.log(err);
            });
    }, [streamConstraints]);

    const onVideoConfJoin = () => {
        const media = getMedia(streamConstraints);
        media
            .then((stream) => {
                myStream.current = stream;
            }).catch((err) => {
                console.log(err);
            });
    };

    return (
        <VideoConfContext.Provider value={{
            streamConstraints,
            setStreamConstraints,
            onVideoConfJoin,
            myStream,
            socketRef,
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
