import React from 'react';
import Loop from '@material-ui/icons/Loop';
import styles from './LoadingPage.module.scss';

const LoadingPage = () => (
    <div className={styles.content}>
        <Loop className={styles.loopIcon} />
    </div>
);

export default React.memo(LoadingPage);
