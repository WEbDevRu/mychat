import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './ChatsList.module.scss';
import { ShortChat } from './ShortChat';

const ChatsList = (props) => {
    const { chats } = props;
    return (
        <div className={styles.content}>
            <Scrollbars
                renderTrackVertical={(style) => <div className={styles.trackVertical} style={style} />}
                renderTrackHorizontal={() => <div />}
            >
                <ul className={styles.list}>
                    {
                        chats.items?.map((i) => (
                            <ShortChat
                                key={i.id}
                                id={i.id}
                                name={i.name}
                                lastMessage={i.lastMessage}
                            />
                        ))
                    }
                </ul>

            </Scrollbars>
        </div>
    );
};

ChatsList.propTypes = {
    chats: PropTypes.object,
};

ChatsList.defaultProps = {
    chats: {},
};

export default React.memo(ChatsList);
