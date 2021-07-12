const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('../api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use('/', routes);

exports.app = app;
