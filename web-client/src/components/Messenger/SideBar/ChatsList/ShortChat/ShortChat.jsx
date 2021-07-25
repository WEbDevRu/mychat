import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import format from 'date-fns/format';
import { NavLink } from 'react-router-dom';
import styles from './ShortChat.module.scss';
import { MESSAGE_TYPES } from '../../../../../const/messenger/MESSAGE_TYPES';

const ShortChat = (props) => {
    const {
        id,
        name,
        lastMessage,
    } = props;
    return (
        <NavLink
            className={styles.content}
            activeClassName={styles.active}
            to={`/chat/${id}`}
        >
            <div className={styles.avatarCont}>
                <Avatar className={styles.avatar} />
            </div>
            <div className={styles.infoCont}>
                <div className={styles.title}>
                    <p className={styles.name}>
                        {name}
                    </p>
                    <p className={styles.time}>
                        {format(new Date(lastMessage.createdAt), 'p')}
                    </p>
                </div>
                <div className={styles.subTitle}>
                    <p className={styles.messageText}>
                        <span className={styles.messageAuthor}>
                            {lastMessage.author.username}
                        </span>
                        {lastMessage.type === MESSAGE_TYPES.JOIN_CHAT && ' join the chat'}
                    </p>
                    {/*
                    <p className={styles.unreadCount}>
                        149
                    </p>
                     */}
                </div>
            </div>
        </NavLink>

    );
};

ShortChat.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    lastMessage: PropTypes.object,
};

ShortChat.defaultProps = {
    id: '',
    name: '',
    lastMessage: {},
};

export default React.memo(ShortChat);
