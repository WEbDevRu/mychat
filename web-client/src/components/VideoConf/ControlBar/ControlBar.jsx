import React from 'react';
import PropTypes from 'prop-types';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import styles from './ControlBar.module.scss';

const ControlBar = (props) => {
    const {
        streamConstraints,
        setStreamConstraints,
    } = props;

    const handleDisableCam = () => {
        setStreamConstraints((c) => ({
            ...c,
            video: false,
        }));
    };

    const handleEnableCam = () => {
        setStreamConstraints((c) => ({
            ...c,
            video: true,
        }));
    };

    const handleDisableAudio = () => {
        setStreamConstraints((c) => ({
            ...c,
            audio: false,
        }));
    };

    const handleEnableAudio = () => {
        setStreamConstraints((c) => ({
            ...c,
            audio: true,
        }));
    };

    return (
        <div className={styles.content}>
            <div className={styles.controlsCont}>
                <Link to="/chat">
                    <IconButton>
                        <ExitToAppIcon />
                    </IconButton>
                </Link>
                {
                    /*
                     {streamConstraints.video ? (
                    <IconButton onClick={handleDisableCam}>
                        <VideocamOffIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleEnableCam}>
                        <VideocamIcon />
                    </IconButton>
                )}
                {streamConstraints.audio ? (
                    <IconButton onClick={handleDisableAudio}>
                        <MicOffIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleEnableAudio}>
                        <MicIcon />
                    </IconButton>
                )}

                     */
                }

            </div>
        </div>
    );
};

ControlBar.propTypes = {
    streamConstraints: PropTypes.object,
    setStreamConstraints: PropTypes.func,
};

ControlBar.defaultProps = {
    streamConstraints: {},
    setStreamConstraints: (f) => f,
};

export default React.memo(ControlBar);
