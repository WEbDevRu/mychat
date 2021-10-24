import React, { useEffect, useRef } from 'react';
import {
    ClickAwayListener,
    Menu,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './DropDown.module.scss';
import { emptyFunc } from '../../../utils/function/emptyFunc';

const DropDown = (props) => {
    const {
        children,
        open,
        className,
        anchorEl,
        anchorOrigin,
        transformOrigin,
        onClose,
    } = props;

    return (
        <Menu
            elevation={0}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            open={open}
            PopoverClasses={{
                paper: styles.root,
                root: className,
            }}
            onClose={onClose}
            disableScrollLock={false}
            anchorEl={anchorEl}
        >
            {children}
        </Menu>
    );
};

DropDown.propTypes = {
    children: PropTypes.any,
    open: PropTypes.bool,
    className: PropTypes.string,
    anchorEl: PropTypes.object,
    anchorOrigin: PropTypes.object,
    transformOrigin: PropTypes.object,
    onClose: PropTypes.func,
};

DropDown.defaultProps = {
    children: '',
    open: false,
    className: '',
    anchorEl: {},
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
    },
    transformOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
    },
    onClose: emptyFunc,
};

export default React.memo(DropDown);
