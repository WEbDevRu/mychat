import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideBar.module.scss';
import { SearchBar } from './SearchBar';
import { ChatsList } from './ChatsList';

const SideBar = (props) => {
    const {} = props;
    return (
        <div className={styles.content}>
            <SearchBar />
            <ChatsList />
        </div>
    );
};

SideBar.propTypes = {

};

SideBar.defaultProps = {

};

export default React.memo(SideBar);
