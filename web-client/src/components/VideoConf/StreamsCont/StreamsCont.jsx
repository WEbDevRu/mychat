import React, {
    useEffect,
    useRef,
} from 'react';
import PropTypes from 'prop-types';

import styles from './StreamsCont.module.scss';

const StreamsCont = (props) => {
    const myVideoRef = useRef();

    const {
        streamConstraints,
    } = props;

    console.log(streamConstraints);

    async function getMedia(constraints) {
        try {
            return await navigator.mediaDevices.getUserMedia(constraints);
        } catch (err) {
            return '';
        }
    }
    useEffect(() => {
        if (myVideoRef.current !== null) {
            const myStream = getMedia(streamConstraints);
            myStream
                .then((stream) => {
                    myVideoRef.current.srcObject = stream;
                    myVideoRef.current.play();
                }).catch((err) => {
                    console.log(err);
                });
        }
    }, [streamConstraints]);

    return (
        <div className={styles.content}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                ref={myVideoRef}
                autoPlay
                playsInline
            />
        </div>
    );
};

StreamsCont.propTypes = {
    streamConstraints: PropTypes.object,
};

StreamsCont.defaultProps = {
    streamConstraints: {},
};

export default React.memo(StreamsCont);
