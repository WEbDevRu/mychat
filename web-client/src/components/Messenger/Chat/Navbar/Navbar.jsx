import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.scss';
import { Avatar } from '@material-ui/core';

const Navbar = (props) => {
    const {} = props;
    return (
        <div className={styles.content}>
            <div className={styles.contentRow}>
                <div className={styles.avatarCont}>
                    <Avatar />
                </div>
                <div className={styles.chatInfoCont}>
                    <p className={styles.chatName}>
                        Chat
                    </p>
                    <p className={styles.chatSubInfo}>
                        last seen
                    </p>
                </div>
            </div>
        </div>
    );
};

Navbar.propTypes = {

};

Navbar.defaultProps = {

};

export default React.memo(Navbar);
