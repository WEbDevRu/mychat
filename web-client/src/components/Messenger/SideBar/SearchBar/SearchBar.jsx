import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.scss';

const SearchBar = (props) => {
    const {} = props;
    return (
        <div className={styles.content}>
            SearchBar
        </div>
    );
};

SearchBar.propTypes = {

};

SearchBar.defaultProps = {

};

export default React.memo(SearchBar);
