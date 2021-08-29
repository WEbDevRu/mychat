import React, {
    createContext,
    useContext,
    useState,
} from 'react';
import PropTypes from 'prop-types';

const VideoConfContext = createContext({});
export const useVideoConf = () => useContext(VideoConfContext);

export const VideoConfProvider = (props) => {
    const { children } = props;
    const [streamConstraints, setStreamConstraints] = useState({
        audio: true,
        video: true,
    });

    return (
        <VideoConfContext.Provider value={{
            streamConstraints,
            setStreamConstraints,
        }}
        >
            {children}
        </VideoConfContext.Provider>
    );
};

VideoConfProvider.propTypes = {
    children: PropTypes.any,
};

VideoConfProvider.defaultProps = {
    children: null,
};
