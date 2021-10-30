import React from 'react';
import PropTypes from 'prop-types';
import { cnb } from 'cnbuilder';
import styles from './SideBar.module.scss';
import { ChatsBlock } from './ChatsBlock';
import { emptyFunc } from '../../../utils/function/emptyFunc';
import { SIDEBAR_BLOCKS } from '../../../const/messenger/SIDEBAR_BLOCKS';

const SideBar = (props) => {
    const {
        chats,
        onGetSearchChats,
        sidebarState,
        setSideBarState,
        sidebarBlock,
        setSidebarBlock,
    } = props;


    return (
        <div className={styles.content}>
            <div className={cnb(styles.collapseCont, {
                [styles.isCollapse]: sidebarBlock === SIDEBAR_BLOCKS.DEFAULT,
            })}
            >
                <ChatsBlock
                    onGetSearchChats={onGetSearchChats}
                    sidebarState={sidebarState}
                    setSideBarState={setSideBarState}
                    chats={chats}
                    setSidebarBlock={setSidebarBlock}
                />
            </div>
        </div>
    );
};

SideBar.propTypes = {
    chats: PropTypes.object,
    onGetSearchChats: PropTypes.func,
    sidebarState: PropTypes.string,
    setSideBarState: PropTypes.func,
    sidebarBlock: PropTypes.string,
    setSidebarBlock: PropTypes.func,
};

SideBar.defaultProps = {
    chats: {},
    onGetSearchChats: (f) => f,
    sidebarState: '',
    setSideBarState: (f) => f,
    sidebarBlock: SIDEBAR_BLOCKS.CREATE_GROUP,
    setSidebarBlock: emptyFunc,
};

export default React.memo(SideBar);
