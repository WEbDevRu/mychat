import React, {
    useEffect,
    useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Input, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from './SearchBar.module.scss';
import { SearchIcon } from '../../../../Common/Icons/SearchIcon';
import { SIDEBAR_STATES } from '../../../../../const/messenger/SIDEBAR_STATES';

const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState();
    const {
        onGetSearchChats,
        sidebarState,
        setSideBarState,
    } = props;

    const handleChange = ({ value }) => {
        setSearchInput(value);
        if (value.trim()) {
            onGetSearchChats({ searchString: value });
        }
    };

    useEffect(() => {
        if (sidebarState === SIDEBAR_STATES.CHATS) {
            setSearchInput('');
        }
    }, [sidebarState]);

    const handleSearchList = () => {
        setSideBarState(SIDEBAR_STATES.SEARCH);
    };
    return (

        <div className={styles.navCont}>
            <div className={styles.stateButtonCont}>
                {sidebarState === SIDEBAR_STATES.CHATS && (
                    <IconButton
                        className={styles.stateButton}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {sidebarState === SIDEBAR_STATES.SEARCH && (
                    <IconButton
                        onClick={() => setSideBarState(SIDEBAR_STATES.CHATS)}
                        className={styles.stateButton}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                )}
            </div>
            <form className={styles.formBlock}>
                <SearchIcon
                    className={styles.searchIcon}
                />
                <Input
                    placeholder="Search"
                    variant="outlined"
                    className={styles.input}
                    name="usernameText"
                    required
                    onFocus={handleSearchList}
                    value={searchInput}
                    onChange={(e) => handleChange({ value: e.target.value, name: e.target.name })}
                    inputProps={{
                        className: styles.inputInner,
                    }}
                />
            </form>
        </div>

    );
};

SearchBar.propTypes = {
    onGetSearchChats: PropTypes.func,
    sidebarState: PropTypes.string,
    setSideBarState: PropTypes.func,
};

SearchBar.defaultProps = {
    onGetSearchChats: (f) => f,
    sidebarState: SIDEBAR_STATES.CHATS,
    setSideBarState: (f) => f,
};

export default React.memo(SearchBar);
