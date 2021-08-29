import React, {
    useEffect,
    useRef,
} from 'react';
import PropTypes from 'prop-types';

import styles from './StreamsCont.module.scss';

const StreamsCont = (props) => {
    const myVideoRef = useRef();
    const foreignVideoRef = useRef();

    const {
        streams,
        videoRef,
        foreignStream,
    } = props;

    useEffect(() => {
        console.log(streams)
        if (myVideoRef.current !== null) {
            myVideoRef.current.srcObject = streams[0];
            myVideoRef.current.play();

            foreignVideoRef.current.srcObject = streams[0];
            foreignVideoRef.current.play();
        }
    }, [streams]);


    useEffect(() => {
        console.log(foreignStream)
        if (foreignVideoRef.current !== null && foreignStream) {
            try {
                foreignVideoRef.current.srcObject = foreignStream;
                foreignVideoRef.current.play();
            } catch {(err)=>{
                console.log( err)
            }}

        }
    }, [foreignStream]);

    return (
        <div className={styles.content}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                ref={myVideoRef}
                autoPlay
                playsInline
            />
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                ref={foreignVideoRef}
                autoPlay
                playsInline
            />
        </div>
    );
};

StreamsCont.propTypes = {
    streams: PropTypes.array,
    videoRef: PropTypes.object,
    foreignStream: PropTypes.object,
};

StreamsCont.defaultProps = {
    streams: [],
    videoRef: {},
    foreignStream: {},
};

export default React.memo(StreamsCont);
