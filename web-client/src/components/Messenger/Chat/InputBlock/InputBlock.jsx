import React from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton } from '@material-ui/core';
import styles from './InputBlock.module.scss';
import { SendIcon } from '../../../Common/Icons/SendIcon';

const InputBlock = (props) => {
    const {} = props;
    return (
        <div className={styles.content}>
            <div className={styles.inputCont}>
                <TextField
                    className={styles.input}
                    placeholder="Message"
                    autoComplete={false}
                    autoFocus
                    variant="outlined"
                />
            </div>
            <IconButton
                naked
                className={styles.sendIcon}
            >
                <SendIcon />
            </IconButton>

        </div>
    );
};

InputBlock.propTypes = {

};

InputBlock.defaultProps = {

};

export default React.memo(InputBlock);
