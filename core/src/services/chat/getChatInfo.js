const { Chat } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');
async function getChatInfo({ chatId }, { session } = {}) {

    const result = await Chat.findOne({
        _id: chatId,
    }).populate('participants').session(session);
    return {
        chatInfo: result.toDto(),
    }
}

exports.getChatInfo = getChatInfo;
exports.getChatInfoWT = withTransaction(getChatInfo);
