import React from 'react';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { cnb } from 'cnbuilder';
import { emptyFunc } from '../../../utils/function/emptyFunc';
import styles from './IconButton.module.scss';

const DropDown = (props) => {
    const {
        children,
        onClick,
        color,
        innerRef,
    } = props;

    return (
        <IconButton
            onClick={onClick}
            className={cnb(styles.cont, {
                [styles.blueColor]: color === 'blue',
            })}
            ref={innerRef}
        >
            {children}
        </IconButton>
    );
};

DropDown.propTypes = {
    children: PropTypes.object,
    onClick: PropTypes.func,
    color: PropTypes.string,
    innerRef: PropTypes.object,
};

DropDown.defaultProps = {
    children: {},
    onClick: emptyFunc,
    color: 'white',
    innerRef: {},
};

export default React.memo(DropDown);
