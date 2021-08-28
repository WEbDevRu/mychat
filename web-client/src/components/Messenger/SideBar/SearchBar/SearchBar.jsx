import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import styles from './SearchBar.module.scss';
import { SearchIcon } from '../../../Common/Icons/SearchIcon';

const SearchBar = (props) => {
    const {
        onGetSearchChats,
    } = props;
    return (
        <form className={styles.formBlock}>
            <Button
                className={styles.button}
                variant="contained"
                color="primary"
                type="submit"
            >
                <SearchIcon className={styles.searchIcon} />
            </Button>
            <TextField
                placeholder="Search"
                variant="outlined"
                className={styles.input}
                name="usernameText"
                required
                onFocus={onGetSearchChats}
                inputProps={{
                    className: styles.inputInner,
                }}
            />
        </form>
    );
};

SearchBar.propTypes = {
    onGetSearchChats: PropTypes.func,
};

SearchBar.defaultProps = {
    onGetSearchChats: (f) => f
};

export default React.memo(SearchBar);
