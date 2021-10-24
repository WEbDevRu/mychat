import React from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from './SearchBar';
import { ChatsList } from './ChatsList';
import { emptyFunc } from '../../../../utils/function/emptyFunc';
import { SIDEBAR_STATES } from '../../../../const/messenger/SIDEBAR_STATES';
import styles from './ChatsBlock.module.scss';

const ChatsBlock = (props) => {
    const {
        onGetSearchChats,
        sidebarState,
        setSideBarState,
        chats,
        setSidebarBlock,
    } = props;
    return (
        <div className={styles.cont}>
            <SearchBar
                onGetSearchChats={onGetSearchChats}
                sidebarState={sidebarState}
                setSideBarState={setSideBarState}
            />
            <ChatsList
                chats={chats}
                setSidebarBlock={setSidebarBlock}
            />
        </div>
    );
};

ChatsBlock.propTypes = {
    onGetSearchChats: PropTypes.func,
    sidebarState: PropTypes.string,
    setSideBarState: PropTypes.func,
    chats: PropTypes.object,
    setSidebarBlock: PropTypes.func,
};

ChatsBlock.defaultProps = {
    onGetSearchChats: emptyFunc,
    sidebarState: SIDEBAR_STATES.CHATS,
    setSideBarState: emptyFunc,
    chats: {},
    setSidebarBlock: emptyFunc,
};

export default React.memo(ChatsBlock);
