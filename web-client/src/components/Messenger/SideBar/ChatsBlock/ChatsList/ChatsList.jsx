import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './ChatsList.module.scss';
import { ShortChat } from './ShortChat';
import { CreateButton } from '../../CreateButton';
import { emptyFunc } from '../../../../../utils/function/emptyFunc';

const ChatsList = (props) => {
    const {
        chats,
        setSidebarBlock,
    } = props;
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
            <CreateButton
                setSidebarBlock={setSidebarBlock}
            />
        </div>
    );
};

ChatsList.propTypes = {
    chats: PropTypes.object,
    setSidebarBlock: PropTypes.func,
};

ChatsList.defaultProps = {
    chats: {},
    setSidebarBlock: emptyFunc,
};

export default React.memo(ChatsList);
