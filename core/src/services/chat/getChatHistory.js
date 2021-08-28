const { Chat } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');
async function getChatHistory({ chatId }, { session } = {}) {

    const result = await Chat.findOne({
        _id: chatId,
    }).populate('messages.author').session(session);
    return {
        items: result.toMessagesDto().items,
    }
}

exports.getChatHistory = getChatHistory;
exports.getChatHistoryWT = withTransaction(getChatHistory);
