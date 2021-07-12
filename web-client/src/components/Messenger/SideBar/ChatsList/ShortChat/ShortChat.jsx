import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import styles from './ShortChat.module.scss';

const ShortChat = (props) => {
    const {} = props;
    return (
        <div className={styles.content}>
            <div className={styles.avatarCont}>
                <Avatar className={styles.avatar} />
            </div>
            <div className={styles.infoCont}>
                <div className={styles.title}>
                    <p className={styles.name}>
                        Игорь
                    </p>
                    <p className={styles.time}>
                        11:55
                    </p>
                </div>
                <div className={styles.subTitle}>
                    <p className={styles.messageText}>
                        Ага...
                    </p>
                    <p className={styles.unreadCount}>
                        149
                    </p>
                </div>
            </div>
        </div>
    );
};

ShortChat.propTypes = {

};

ShortChat.defaultProps = {

};

export default React.memo(ShortChat);
