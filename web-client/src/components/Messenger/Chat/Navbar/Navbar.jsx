import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@material-ui/core';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { getCookie } from '../../../../utils/auth/getCookie';

const Navbar = (props) => {
    const {
        currentChatInfo,
        socketRef,
        chatId,
        isJoinedToChat,
        onJoinUserToChat,
    } = props;

    useEffect(() => {
        socketRef.current.emit('chat/ENTER', { chatId, token: getCookie('AUTHORIZATION') });
        return () => {
            socketRef.current.emit('chat/LEAVE', { chatId, token: getCookie('AUTHORIZATION') });
        };
    }, [chatId]);
    return (
        <div className={styles.content}>
            <div className={styles.contentRow}>
                <div className={styles.avatarCont}>
                    <Avatar />
                </div>
                <div>
                    <p className={styles.chatName}>
                        {currentChatInfo.name}
                    </p>
                    <p className={styles.chatSubInfo}>
                        {`members${ currentChatInfo.participants?.length}`}
                    </p>
                </div>
                {!isJoinedToChat ? (
                    <Button
                        className={styles.joinButton}
                        onClick={() => { onJoinUserToChat({ chatId }); }}
                    >
                        Subscribe
                    </Button>
                ) : (
                    <Link
                        to={`/conf/${chatId}`}
                        className={styles.chatIcon}
                    >
                        <VoiceChatIcon />
                    </Link>
                )}

            </div>
        </div>
    );
};

Navbar.propTypes = {
    currentChatInfo: PropTypes.object,
    socketRef: PropTypes.object,
    chatId: PropTypes.string,
    isJoinedToChat: PropTypes.string,
    onJoinUserToChat: PropTypes.func,
};

Navbar.defaultProps = {
    currentChatInfo: {},
    socketRef: {},
    chatId: '',
    isJoinedToChat: false,
    onJoinUserToChat: (f) => f,
};

export default React.memo(Navbar);
