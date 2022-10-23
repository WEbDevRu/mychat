import React from 'react';
import styles from './Chat.module.scss';

const Chat = () => (
    <div className={styles.content}>
        Chat live lists
    </div>
);

export default React.memo(Chat);
