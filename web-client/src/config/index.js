const configuration = process.env.BUILD_CONFIG;

console.log(configuration, process.env.BUILD_CONFIG);
// eslint-disable-next-line import/no-dynamic-require
const config = require(`./config_${configuration}`);

module.exports = config;
