import React, {
    useState,
} from 'react';
import PropTypes from 'prop-types';
import CreateIcon from '@material-ui/icons/Create';
import PersonOutline from '@material-ui/icons/PersonOutline';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import { emptyFunc } from '../../../../utils/function/emptyFunc';
import styles from './CreateButton.module.scss';
import { IconButton } from '../../../Common/IconButton';
import { useBool } from '../../../../hooks/useBool';
import { DropDown } from '../../../Common/DropDown';
import { DropDownItem } from '../../../Common/DropDownItem';
import { SIDEBAR_BLOCKS } from '../../../../const/messenger/SIDEBAR_BLOCKS';

const CreateButton = (props) => {
    const {
        setSidebarBlock
    } = props;

    const isMenuOpen = useBool(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleButtonClick = (e) => {
        isMenuOpen.onToggle();
        setMenuAnchor(e.currentTarget);
    };

    return (
        <div className={styles.cont}>
            <DropDown
                open={isMenuOpen.value}
                onClose={isMenuOpen.setFalse}
                className={styles.menu}
                width="220px"
                anchorEl={menuAnchor}
            >
                <DropDownItem
                    text="New Group"
                    icon={<PersonOutline fontSize="inherit" />}
                    onClick={() => setSidebarBlock(SIDEBAR_BLOCKS.CREATE_GROUP)}
                />
                <DropDownItem
                    text="New Private Chat"
                    icon={<PeopleOutline fontSize="inherit" />}
                />
            </DropDown>
            <div
                className={styles.buttonCont}
                onClick={(e) => handleButtonClick(e)}
            >
                <IconButton
                    color="blue"
                >
                    <CreateIcon
                        className={styles.createIcon}
                    />
                </IconButton>
            </div>
        </div>
    );
};

CreateButton.propTypes = {
    setSidebarBlock: PropTypes.func,
};

CreateButton.defaultProps = {
    setSidebarBlock: emptyFunc,
};

export default React.memo(CreateButton);
