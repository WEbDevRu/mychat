import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideBar.module.scss';
import { SearchBar } from './SearchBar';
import { ChatsList } from './ChatsList';

const SideBar = (props) => {
    const {
        chats,
        onGetSearchChats,
    } = props;

    return (
        <div className={styles.content}>
            <SearchBar
                onGetSearchChats={onGetSearchChats}
            />
            <ChatsList
                chats={chats}
            />
        </div>
    );
};

SideBar.propTypes = {
    chats: PropTypes.object,
    onGetSearchChats: PropTypes.func,

};

SideBar.defaultProps = {
    chats: {},
    onGetSearchChats: (f) => f,
};

export default React.memo(SideBar);
