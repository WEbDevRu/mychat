const { Chat } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');
async function getChats({ userId }, { session } = {}) {
    const result = await Chat.find({
        'participants.': userId,
    }).populate('messages.author').session(session);
    return {
        items: result.map((r) => r.toShortDto()),
    }
}

exports.getChats = getChats;
exports.getChatsWT = withTransaction(getChats);
