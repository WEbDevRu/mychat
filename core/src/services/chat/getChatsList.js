const { Chat } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');

async function getChatsList({ session } = {}) {
    const result = await Chat
        .find({})
        .populate('messages.author')
        .session(session)
    return {
        items: result.map((r) => r.toShortDto()),
    }
}

exports.getChatsList = getChatsList;
exports.getChatsListWT = withTransaction(getChatsList);
