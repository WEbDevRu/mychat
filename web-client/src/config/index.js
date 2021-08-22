const configuration = process.env.BUILD_CONFIG || 'local';

console.log(configuration);
// eslint-disable-next-line import/no-dynamic-require
const config = require(`./config_${configuration}`);

module.exports = config;
