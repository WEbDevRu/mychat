const { Chat } = require('../../models/chat');
const { ChatParticipant, PARTICIPANT_TYPES } = require('../../models/chatParticipant');
const { Message, MESSAGE_TYPES } = require('../../models/message');
const { withTransaction } = require('../../utils/withTransaction');
async function joinUserToChat({ userId, chatId }, { session } = {}) {
    const chatParticipant = new ChatParticipant({
        chat: chatId,
        user: userId,
        type: PARTICIPANT_TYPES.DEFAULT
    });
    await chatParticipant.save(session);

    const joinMessage = new Message({
        chat: chatId,
        author: userId,
        createdAt: Date.now(),
        type: MESSAGE_TYPES.JOIN_CHAT,
    });
    await joinMessage.save(session);

    return {
        chatId
    }
}

exports.joinUserToChat = joinUserToChat;
exports.joinUserToChatWT = withTransaction(joinUserToChat);
