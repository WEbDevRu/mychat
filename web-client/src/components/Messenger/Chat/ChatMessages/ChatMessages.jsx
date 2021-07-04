import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChatMessages.module.scss';

const ChatMessages = (props) => {
    const {} = props;
    return (
        <div className={styles.content}>
            messages
        </div>
    );
};

ChatMessages.propTypes = {

};

ChatMessages.defaultProps = {

};

export default React.memo(ChatMessages);
