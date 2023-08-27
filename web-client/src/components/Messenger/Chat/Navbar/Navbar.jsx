import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@material-ui/core';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = (props) => {
    const {
        currentChatInfo,
        chatId,
        onJoinUserToChat,
    } = props;

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
                {!currentChatInfo?.isSubscribed ? (
                    <Button
                        className={styles.joinButton}
                        onClick={() => { onJoinUserToChat({ chatId }); }}
                    >
                        Subscribe
                    </Button>
                ) : (
                    <>
                        <Link
                            to={`/conf/${chatId}`}
                            className={styles.chatIcon}
                        >
                            <VoiceChatIcon />
                        </Link>
                        <Link
                            to={`/stream/${chatId}`}
                            className={styles.streamIcon}
                        >
                            <PersonalVideoIcon />
                        </Link>
                        <Link
                            to={`/live_lists/${chatId}`}
                            className={styles.liveListsIcon}
                        >
                            <ChatIcon />
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

Navbar.propTypes = {
    currentChatInfo: PropTypes.object,
    chatId: PropTypes.string,
    onJoinUserToChat: PropTypes.func,
};

Navbar.defaultProps = {
    currentChatInfo: {},
    chatId: '',
    onJoinUserToChat: (f) => f,
};

export default React.memo(Navbar);
