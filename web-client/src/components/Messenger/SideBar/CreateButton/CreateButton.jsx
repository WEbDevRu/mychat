import React, {
    useState,
} from 'react';
import PropTypes from 'prop-types';
import CreateIcon from '@material-ui/icons/Create';
import { emptyFunc } from '../../../../utils/function/emptyFunc';
import styles from './CreateButton.module.scss';
import { IconButton } from '../../../Common/IconButton';
import { useBool } from '../../../../hooks/useBool';
import { DropDown } from '../../../Common/DropDown';

const CreateButton = (props) => {
    const {

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
                className={styles.menu}
                width="220px"
                anchorEl={menuAnchor}
            >
                content
            </DropDown>
            <IconButton
                color="blue"
                onClick={(e) => handleButtonClick(e)}
            >
                <CreateIcon
                    className={styles.createIcon}
                />
            </IconButton>
        </div>
    );
};

CreateButton.propTypes = {

};

CreateButton.defaultProps = {

};

export default React.memo(CreateButton);
