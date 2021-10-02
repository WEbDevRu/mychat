const { Chat } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');
async function getChats({ userId }, { session } = {}) {
    const result = await Chat.find({
        'participants.': userId,
    }).session(session);
    return {
        items: result.map((r) => r.toShortDto()),
    }
}

exports.getChats = getChats;
exports.getChatsWT = withTransaction(getChats);
