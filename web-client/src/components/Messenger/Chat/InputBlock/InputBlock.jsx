import React, {
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { FilledInput, IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import styles from './InputBlock.module.scss';
import { SendIcon } from '../../../Common/Icons/SendIcon';

const InputBlock = (props) => {
    const {
        setValue,
        register,
        handleSubmit: onSend,
    } = useForm({
        resolver: undefined,
    });

    const [messageInput, setMessageInput] = useState();

    const {
        onSendMessage,
        chatId,
    } = props;

    useEffect(() => {
        register('messageText');
    }, []);

    const handleSubmit = onSend(async (data) => {
        if (data.messageText && data.messageText.trim()) {
            onSendMessage({
                message: data.messageText,
                chatId,
            });
        }
        setValue('messageText', '');
        setMessageInput('');
    });

    const handleChange = ({ name, value }) => {
        setValue(name, value);
        setMessageInput(value);
    };
    return (
        <form
            className={styles.content}
            onSubmit={handleSubmit}
        >
            <div className={styles.inputCont}>
                <FilledInput
                    className={styles.inputWr}
                    placeholder="Message"
                    autoComplete="false"
                    onChange={(e) => handleChange({ value: e.target.value, name: e.target.name })}
                    autoFocus
                    variant="outlined"
                    name="messageText"
                    value={messageInput}
                    disableUnderline
                    inputProps={{
                        className: styles.input,
                    }}
                />
            </div>
            <IconButton
                className={styles.sendIcon}
                type="submit"
            >
                <SendIcon />
            </IconButton>

        </form>
    );
};

InputBlock.propTypes = {
    onSendMessage: PropTypes.func,
    chatId: PropTypes.string,
};

InputBlock.defaultProps = {
    onSendMessage: (f) => f,
    chatId: '',
};

export default React.memo(InputBlock);
