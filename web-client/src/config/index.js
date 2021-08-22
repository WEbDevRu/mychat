const configuration = process.env.REACT_APP_BUILD_CONFIG;

// eslint-disable-next-line import/no-dynamic-require
const config = require(`./config_${configuration}`);

module.exports = config;
