import React from 'react';
import PropTypes from 'prop-types';

import styles from './ControlBar.module.scss';

const ControlBar = (props) => (
    <div className={styles.content}>
        navbar
    </div>
);

ControlBar.propTypes = {

};

ControlBar.defaultProps = {

};

export default React.memo(ControlBar);
