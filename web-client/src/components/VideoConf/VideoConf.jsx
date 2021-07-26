import React from 'react';
import PropTypes from 'prop-types';
import styles from './VideoConf.module.scss';
import { ControlBar } from './ControlBar';
import { StreamsCont } from './StreamsCont';


const VideoConf = (props) => (
    <div className={styles.content}>
        <StreamsCont />
        <ControlBar />
    </div>
);

VideoConf.propTypes = {

};

VideoConf.defaultProps = {

};

export default React.memo(VideoConf);
