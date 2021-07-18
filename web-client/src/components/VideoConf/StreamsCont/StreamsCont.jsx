import React from 'react';
import PropTypes from 'prop-types';

import styles from './StreamsCont.module.scss';

const StreamsCont = (props) => (
    <div className={styles.content}>
        streams
    </div>
);

StreamsCont.propTypes = {

};

StreamsCont.defaultProps = {

};

export default React.memo(StreamsCont);
