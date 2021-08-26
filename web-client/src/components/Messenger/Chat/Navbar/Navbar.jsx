import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.scss';
import { Avatar } from '@material-ui/core';
import { getCookie } from '../../../../utils/auth/getCookie';

const Navbar = (props) => {
    const {
        currentChatInfo,
        socketRef,
    } = props;

    useEffect(() => {
        socketRef.current.emit('chat/ENTER', { chatId: props.chatId, token: getCookie('AUTHORIZATION') });
        return () => {
            socketRef.current.emit('chat/LEAVE', { chatId: props.chatId, token: getCookie('AUTHORIZATION') });
        };
    }, []);
    return (
        <div className={styles.content}>
            <div className={styles.contentRow}>
                <div className={styles.avatarCont}>
                    <Avatar />
                </div>
                <div className={styles.chatInfoCont}>
                    <p className={styles.chatName}>
                        {currentChatInfo.name}
                    </p>
                    <p className={styles.chatSubInfo}>
                        {`members${ currentChatInfo.participants?.length}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    currentChatInfo: PropTypes.object,
    socketRef: PropTypes.object,
    chatId: PropTypes.string,
};

Navbar.defaultProps = {
    currentChatInfo: {},
    socketRef: {},
    chatId: '',
};

export default React.memo(Navbar);
