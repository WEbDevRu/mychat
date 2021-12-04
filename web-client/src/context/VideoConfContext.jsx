import React, {
    createContext,
    useContext,
    useState,
} from 'react';
import PropTypes from 'prop-types';

const VideoConfContext = createContext({});
export const useVideoConf = () => useContext(VideoConfContext);

export const VideoConfProvider = (props) => {
    const {
        children,
        socketRef,
    } = props;
    const [chatData, setChatData] = useState({});

    const [streamConstraints, setStreamConstraints] = useState({
        audio: true,
        video: true,
    });

    const onJoinChat = ({ data }) => {
        setChatData(data);
    };


    return (
        <VideoConfContext.Provider value={{
            streamConstraints,
            setStreamConstraints,
            socketRef,
            onJoinChat,
            chatData,
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
