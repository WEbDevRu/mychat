import React from 'react';
import PropTypes from 'prop-types';
import { cnb } from 'cnbuilder';
import { Typography } from '@material-ui/core';
import format from 'date-fns/format';
import styles from './MessageGroup.module.scss';
import { MESSAGE_TYPES } from '../../../../../const/messenger/MESSAGE_TYPES';

const MessageGroup = (props) => {
    const {
        data,
        me,
    } = props;

    const myMessage = me.id === data.author.id;
    return (
        <>
            {data.type === MESSAGE_TYPES.DEFAULT ? (
                <div className={cnb(styles.content, {
                    [styles.myMessage]: myMessage,
                })}
                >
                    <div className={cnb(styles.messageBlock, {
                        [styles.myMessage]: myMessage,
                    })}
                    >
                        {!myMessage && (
                            <Typography
                                gutterBottom
                                component="p"
                                className={styles.authorName}
                            >
                                {data.author.username}
                            </Typography>
                        )}
                        <div className={styles.messageInfo}>
                            <Typography
                                gutterBottom
                                component="p"
                                className={styles.messageText}
                            >
                                {data.text}
                            </Typography>

                            <Typography
                                gutterBottom
                                component="p"
                                className={styles.messageDate}
                            >
                                {format(new Date(data.createdAt), 'p')}
                            </Typography>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.joinMessage}>
                    {data.author.username}
                    {' '}
                    join the chat
                </div>
            )}
        </>

    );
};

MessageGroup.propTypes = {
    data: PropTypes.object,
    me: PropTypes.object,
};

MessageGroup.defaultProps = {
    data: {},
    me: {},
};

export default React.memo(MessageGroup);
