import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const MessageTail = (props) => {
    const { className } = props;
    return (
        <SvgIcon viewBox="0 0 11 20">
            <g transform="translate(9 -14)" fill="currentColor" fillRule="evenodd">
                <path d="M-6 16h6v17c-.193-2.84-.876-5.767-2.05-8.782-.904-2.325-2.446-4.485-4.625-6.48A1 1 0 01-6 16z" transform="matrix(1 0 0 -1 0 49)" id="corner-fill" fill="inherit" />
            </g>
        </SvgIcon>
    );
};

MessageTail.propTypes = {
    className: PropTypes.string,
};

MessageTail.defaultProps = {
    className: null,
};

export default React.memo(MessageTail);
