import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const SearchIcon = (props) => {
    const { className } = props;
    return (
        <SvgIcon className={className} viewBox="0 0 32 32">
            <path fill="currentColor" d="M27.414 24.586l-5.077-5.077A9.932 9.932 0 0024 14c0-5.514-4.486-10-10-10S4 8.486 4 14s4.486 10 10 10a9.932 9.932 0 005.509-1.663l5.077 5.077a2 2 0 102.828-2.828zM7 14c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7z" />
        </SvgIcon>
    );
};

SearchIcon.propTypes = {
    className: PropTypes.string,
};

SearchIcon.defaultProps = {
    className: null,
};

export default React.memo(SearchIcon);
