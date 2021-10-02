const { Chat } = require('../../models/chat');
const { Message, MESSAGE_TYPES } = require('../../models/message');
const { withTransaction } = require('../../utils/withTransaction');
async function joinUserToChat({ userId, chatId }, { session } = {}) {
    const result = await Chat.findOneAndUpdate({
        _id: chatId,
    },{
        $addToSet: {
            participants: userId,
        }
    },{
        new: true,
    })
        .populate('participants')
        .session(session);

    await Message.create({
        chat: chatId,
        author: userId,
        createdAt: Date.now(),
        type: MESSAGE_TYPES.JOIN_CHAT,
    });

    return {
        chatInfo: result.toDto(),
    }
}

exports.joinUserToChat = joinUserToChat;
exports.joinUserToChatWT = withTransaction(joinUserToChat);
