import React from 'react';
import PropTypes from 'prop-types';
import styles from './Chat.module.scss';
import { ChatMessages } from './ChatMessages';
import { InputBlock } from './InputBlock';
import { Navbar } from './Navbar';

const Chat = (props) => {
    const {} = props;
    return (
        <div className={styles.content}>
            <Navbar />
            <div className={styles.chatCont}>
                <ChatMessages />
                <InputBlock />
            </div>
        </div>
    );
};

Chat.propTypes = {

};

Chat.defaultProps = {

};

export default React.memo(Chat);
