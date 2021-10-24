import React from 'react';
import {
    MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './DropDownItem.module.scss';
import { emptyFunc } from '../../../utils/function/emptyFunc';

const DropDownItem = (props) => {
    const {
        children,
        icon,
        text,
        onClick
    } = props;

    return (
        <MenuItem
            classes={{
                root: styles.root,
            }}
            onClick={onClick}
        >
            <div className={styles.iconCont}>
                {icon}
            </div>
            <div className={styles.content}>
                <p className={styles.text}>
                    {text}
                </p>
                {children && children}
            </div>
        </MenuItem>
    );
};

DropDownItem.propTypes = {
    children: PropTypes.any,
    icon: PropTypes.any,
    text: PropTypes.string,
    onClick: PropTypes.func,
};

DropDownItem.defaultProps = {
    children: '',
    icon: '',
    text: '',
    onClick: emptyFunc,
};

export default React.memo(DropDownItem);
