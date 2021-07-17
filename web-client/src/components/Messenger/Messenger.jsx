import React from 'react';
import PropTypes from 'prop-types';
import styles from './Messenger.module.scss';
import { Chat } from './Chat';
import { SideBar } from './SideBar';
import { ChatProvider } from '../../context/ChatContext';

const Messenger = (props) => {
    return (
        <div className={styles.content}>
            <ChatProvider>
                <SideBar />
                <Chat />
            </ChatProvider>
        </div>
    );
};

Messenger.propTypes = {

};

Messenger.defaultProps = {

};

export default React.memo(Messenger);
