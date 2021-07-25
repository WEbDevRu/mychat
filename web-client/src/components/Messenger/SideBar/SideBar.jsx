import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideBar.module.scss';
import { SearchBar } from './SearchBar';
import { ChatsList } from './ChatsList';

const SideBar = (props) => {
    const { chats } = props;

    return (
        <div className={styles.content}>
            <SearchBar />
            <ChatsList
                chats={chats}
            />
        </div>
    );
};

SideBar.propTypes = {
    chats: PropTypes.object,

};

SideBar.defaultProps = {
    chats: {},
};

export default React.memo(SideBar);
