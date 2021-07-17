import React from 'react';
import PropTypes from 'prop-types';
import styles from './Registration.module.scss';

const Registration = (props) => {
    return (
        <div className={styles.content}>
            <p>
                Registration
            </p>
        </div>
    );
};

Registration.propTypes = {

};

Registration.defaultProps = {

};

export default React.memo(Registration);
