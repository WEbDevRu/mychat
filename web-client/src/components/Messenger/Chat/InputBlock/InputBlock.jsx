import React from 'react';
import PropTypes from 'prop-types';
import { FilledInput, IconButton, FormControl } from '@material-ui/core';
import styles from './InputBlock.module.scss';
import { SendIcon } from '../../../Common/Icons/SendIcon';

const InputBlock = (props) => {
    const {
        socketRef
    } = props;
    return (
        <div className={styles.content}>
            <div className={styles.inputCont}>
                <FilledInput
                    className={styles.inputWr}
                    placeholder="Message"
                    autoComplete={false}
                    autoFocus
                    variant="outlined"
                    disableUnderline
                    inputProps={{
                        className: styles.input,
                    }}
                />
            </div>
            <IconButton
                className={styles.sendIcon}
            >
                <SendIcon />
            </IconButton>

        </div>
    );
};

InputBlock.propTypes = {
    socketRef: PropTypes.object,
};

InputBlock.defaultProps = {
    socketRef: {},
};

export default React.memo(InputBlock);
