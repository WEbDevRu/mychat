import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const SendIcon = (props) => {
    const { className } = props;
    return (
        <SvgIcon className={className} viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M 3 3 A 1 1 0 0 0 2 4 L 2 9.5957031 C 2 10.109703 2.3893906 10.538844 2.9003906 10.589844 L 17 12 L 2.9003906 13.410156 C 2.3893906 13.461156 2 13.890297 2 14.404297 L 2 20 A 1 1 0 0 0 3 21 A 1 1 0 0 0 3.5390625 20.84375 A 1 1 0 0 0 3.5410156 20.841797 L 21.339844 12.943359 L 21.337891 12.939453 A 1 1 0 0 0 22 12 A 1 1 0 0 0 21.337891 11.060547 L 21.339844 11.056641 L 3.5273438 3.1523438 A 1 1 0 0 0 3 3 z" />
        </SvgIcon>
    );
};

SendIcon.propTypes = {
    className: PropTypes.string,
};

SendIcon.defaultProps = {
    className: null,
};

export default React.memo(SendIcon);
