const { Chat } = require('../../models/chat');
const { ChatParticipant } = require('../../models/chatParticipant');
const { withTransaction } = require('../../utils/withTransaction');
async function getChatInfo({ chatId, userId }, { session } = {}) {

    const result = await Chat.findOne({
        _id: chatId,
    });

    const participant = await ChatParticipant.findOne({
        chat: chatId,
        user: userId
    });

    return {
        ...result.toDto(),
        isSubscribed: !!participant
    }
}

exports.getChatInfo = getChatInfo;
exports.getChatInfoWT = withTransaction(getChatInfo);
