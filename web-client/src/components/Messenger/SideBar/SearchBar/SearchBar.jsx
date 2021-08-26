import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import styles from './SearchBar.module.scss';
import { SearchIcon} from '../../../Common/Icons/SearchIcon';

const SearchBar = (props) => {
    const {} = props;
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
                disableUnderline
                classes={{
                    notchedOutline: styles.inputRoot,
                }}
                inputProps={{
                    className: styles.inputInner,
                    disableUnderline: true,
                }}
            />
        </form>
    );
};

SearchBar.propTypes = {

};

SearchBar.defaultProps = {

};

export default React.memo(SearchBar);
