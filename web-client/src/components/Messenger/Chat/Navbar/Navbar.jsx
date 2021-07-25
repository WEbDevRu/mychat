import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.scss';
import { Avatar } from '@material-ui/core';

const Navbar = (props) => {
    const {
        currentChatInfo,
    } = props;
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
};

Navbar.defaultProps = {
    currentChatInfo: {},
};

export default React.memo(Navbar);
