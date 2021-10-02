const { Message } = require('../../models/message');
const { withTransaction } = require('../../utils/withTransaction');
async function getChatHistory({ chatId }, { session } = {}) {

    const result = await Message.find({
        chat: chatId
    }).populate('author').session(session);

    return {
        items: result.map((r) => r.toDto()),
    }
}

exports.getChatHistory = getChatHistory;
exports.getChatHistoryWT = withTransaction(getChatHistory);
