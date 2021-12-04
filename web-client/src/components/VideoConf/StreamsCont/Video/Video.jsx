import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { STREAM_STATES } from '../StreamsCont';
import styles from './Video.module.scss';

const Video = (props) => {
    const {
        userData,
        type,
        state,
        stream,
    } = props;

    const videoRef = useRef();

    useEffect(() => {
        if (state === STREAM_STATES.STREAM) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className={styles.content}>
            <div className={styles.streamCont}>
                {state === STREAM_STATES.STREAM && (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className={styles.videoElem}
                    />
                )}
                {state === STREAM_STATES.FETCHING && (
                    <div className={styles.streamLoading}>
                        <CircularProgress />
                    </div>
                )}
            </div>
            <p>{userData.username}</p>
        </div>
    );
};

Video.propTypes = {
    userData: PropTypes.object,
    type: PropTypes.string,
    state: PropTypes.string,
    stream: PropTypes.object,

};

Video.defaultProps = {
    userData: {},
    type: '',
    state: '',
    stream: {},
};

export default React.memo(Video);
