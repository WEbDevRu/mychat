const { Chat, MESSAGE_TYPES } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');
async function joinUserToChat({ userId, chatId }, { session } = {}) {
    const result = await Chat.findOneAndUpdate({
        _id: chatId,
    },{
        $addToSet: {
            participants: userId,
            messages: {
                author: userId,
                createdAt: new Date(),
                text: '',
                type: MESSAGE_TYPES.JOIN_CHAT,
            }
        }
    },{
        new: true,
    })
        .populate('participants')
        .session(session);
    return {
        chatInfo: result.toDto(),
    }
}

exports.joinUserToChat = joinUserToChat;
exports.joinUserToChatWT = withTransaction(joinUserToChat);
