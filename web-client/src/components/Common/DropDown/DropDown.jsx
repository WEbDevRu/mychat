import React from 'react';
import { Menu } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './DropDown.module.scss';

const DropDown = (props) => {
    const {
        children,
        open,
        className,
        anchorEl,
        anchorOrigin,
        transformOrigin,
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
            hideBackdrop
            disableScrollLock={false}
            anchorEl={anchorEl}
        >
            {children}
        </Menu>
    );
};

DropDown.propTypes = {
    children: PropTypes.object,
    open: PropTypes.bool,
    className: PropTypes.string,
    anchorEl: PropTypes.object,
    anchorOrigin: PropTypes.object,
    transformOrigin: PropTypes.object,
};

DropDown.defaultProps = {
    children: {},
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
};

export default React.memo(DropDown);
