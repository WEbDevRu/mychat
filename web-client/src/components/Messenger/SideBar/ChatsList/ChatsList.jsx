import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './ChatsList.module.scss';
import { ShortChat } from './ShortChat';

const ChatsList = (props) => {
    const {} = props;
    return (
        <div className={styles.content}>
            <Scrollbars
                renderTrackVertical={(style) => <div className={styles.trackVertical} style={style} />}
                renderTrackHorizontal={() => <div />}
            >
                <ul className={styles.list}>
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                    <ShortChat />
                </ul>

            </Scrollbars>
        </div>
    );
};

ChatsList.propTypes = {

};

ChatsList.defaultProps = {

};

export default React.memo(ChatsList);
