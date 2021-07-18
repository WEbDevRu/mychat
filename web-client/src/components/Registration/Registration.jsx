import React from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    Button,
    Card,
    Typography,
} from '@material-ui/core';

import styles from './Registration.module.scss';

const Registration = (props) => (
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
            <TextField
                label="Enter your name"
                variant="outlined"
                className={styles.input}
            />
            <Button
                className={styles.button}
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </Card>
    </div>
);

Registration.propTypes = {

};

Registration.defaultProps = {

};

export default React.memo(Registration);
