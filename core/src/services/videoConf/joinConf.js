const { withTransaction } = require('../../utils/withTransaction');
async function joinConf({ roomId }, { session } = {}) {

}

exports.getChats = joinConf;
exports.getChatsWT = withTransaction(joinConf);
