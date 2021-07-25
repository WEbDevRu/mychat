import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    Button,
    Card,
    Typography,
} from '@material-ui/core';

import { useForm } from 'react-hook-form';
import styles from './Registration.module.scss';
import { useAuth } from '../../context/AuthContext';

const Registration = (props) => {
    const {
        setValue,
        register,
        setError,
        handleSubmit: onSend,
    } = useForm({
        resolver: undefined,
    });

    const {
        onPostMe,
        regError,
        setRegError,
    } = useAuth();

    useEffect(() => {
        register('usernameText');
    }, []);

    const handleSubmit = onSend(async (data) => {
        onPostMe({ username: data.usernameText });
    });

    const handleChange = ({ name, value }) => {
        setValue(name, value);
        setRegError('');
    };

    return (
        <div className={styles.pageCont}>
            <Card className={styles.content}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h1"
                    className={styles.heading}
                >
                    Registration
                </Typography>

                <form
                    onSubmit={handleSubmit}
                >
                    <Typography
                        gutterBottom
                        variant="p"
                        component="p"
                        className={styles.heading}
                    >
                        {regError}
                    </Typography>
                    <TextField
                        label="Enter your name"
                        variant="outlined"
                        className={styles.input}
                        onChange={(e) => handleChange({ value: e.target.value, name: e.target.name })}
                        name="usernameText"
                        required
                    />
                    <Button
                        className={styles.button}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>

            </Card>
        </div>
    );
};

Registration.propTypes = {

};

Registration.defaultProps = {

};

export default React.memo(Registration);
