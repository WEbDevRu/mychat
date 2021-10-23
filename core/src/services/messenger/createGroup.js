const { Chat } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');

async function createGroup({ userId, }, { session } = {}) {

    return {
        items: result.docs,
        page: result.page,
        total: result.totalPages,
    }
}

exports.createGroup = createGroup;
exports.createGroup = withTransaction(createGroup);
